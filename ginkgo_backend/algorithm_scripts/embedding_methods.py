import numpy as np
import torch
from torch.nn.init import xavier_normal_
import torch.nn as nn
import torch.nn.functional as F
import os

class TuckER(torch.nn.Module):
    def __init__(self, relation_dim, num_entities, pretrained_embeddings, pretrained_relation_embeddings, device, l3_reg, model, w_matrix, bn_list, freeze=True):
        super(TuckER, self).__init__()

        self.device = device
        self.bn_list = bn_list
        self.model = model
        self.freeze = freeze
        self.l3_reg = l3_reg
        if self.model == 'RESCAL':
            multiplier = 1
            self.getScores = self.RESCAL
        elif self.model == 'SimplE':
            multiplier = 2
            self.getScores = self.SimplE
        elif self.model == 'ComplEx':
            multiplier = 2
            self.getScores = self.ComplEx
        elif self.model == 'Rotat3':
            multiplier = 3
            self.getScores = self.Rotat3
        elif self.model == 'TuckER':
            W_torch = torch.from_numpy(np.load(w_matrix))
            self.W = nn.Parameter(
                torch.Tensor(W_torch), 
                requires_grad = True
            )
            # self.W = nn.Parameter(torch.tensor(np.random.uniform(-1, 1, (relation_dim, relation_dim, relation_dim)), 
            #                         dtype=torch.float, device="cuda", requires_grad=True))
            multiplier = 1
            self.getScores = self.TuckER
        elif self.model == 'RESCAL':
            self.getScores = self.RESCAL
            multiplier = 1
        else:
            print('Incorrect model specified:', self.model)
            exit(0)
        self.relation_dim = relation_dim * multiplier
        if self.model == 'RESCAL':
            self.relation_dim = relation_dim * relation_dim
        self.n_layers = 1
        self.bidirectional = True
        
        self.num_entities = num_entities
        self.loss = torch.nn.BCELoss(reduction='sum')

        # The LSTM takes word embeddings as inputs, and outputs hidden states
        # with dimensionality hidden_dim.
        self.pretrained_embeddings = pretrained_embeddings
        self.embedding = nn.Embedding.from_pretrained(torch.FloatTensor(pretrained_embeddings), freeze=self.freeze)
        
        self.relation_embedding = nn.Embedding.from_pretrained(torch.FloatTensor(pretrained_relation_embeddings), freeze=self.freeze)
        # xavier_normal_(self.embedding.weight.data)

        self.mid1 = 256
        self.mid2 = 256

        if self.model in ['RESCAL', 'TuckER', 'RESCAL', 'SimplE']:
            self.bn0 = torch.nn.BatchNorm1d(self.embedding.weight.size(1))
            self.bn2 = torch.nn.BatchNorm1d(self.embedding.weight.size(1))
        else:
            self.bn0 = torch.nn.BatchNorm1d(multiplier)
            self.bn2 = torch.nn.BatchNorm1d(multiplier)

        for i in range(3):
            for key, value in self.bn_list[i].items():
                self.bn_list[i][key] = torch.Tensor(value).to(device)

        self.bn0.weight.data = self.bn_list[0]['weight']
        self.bn0.bias.data = self.bn_list[0]['bias']
        self.bn0.running_mean.data = self.bn_list[0]['running_mean']
        self.bn0.running_var.data = self.bn_list[0]['running_var']

        self.bn2.weight.data = self.bn_list[2]['weight']
        self.bn2.bias.data = self.bn_list[2]['bias']
        self.bn2.running_mean.data = self.bn_list[2]['running_mean']
        self.bn2.running_var.data = self.bn_list[2]['running_var']


        # best: all dropout 0
        self.rel_dropout = torch.nn.Dropout(0.0)
        self.ent_dropout = torch.nn.Dropout(0.0)
        self.score_dropout = torch.nn.Dropout(0.0)

        
    def freeze_entity_embeddings(self):
        self.E.weight.requires_grad = False
        print('Entity embeddings are frozen')

    def ce_loss(self, pred, true):
        pred = F.log_softmax(pred, dim=-1)
        true = true/true.size(-1)
        loss = -torch.sum(pred * true)
        return loss

    def bce_loss(self, pred, true):
        loss = self.bce_loss_loss(pred, true)
        #l3 regularization
        if self.l3_reg:
            norm = torch.norm(self.E.weight.data, p=3, dim=-1)
            loss += self.l3_reg * torch.sum(norm)
        return loss

    def init(self):
        xavier_normal_(self.E.weight.data)            
        if self.model == 'Rotat3':
            nn.init.uniform_(self.R.weight.data, a=-1.0, b=1.0)
        else:
            xavier_normal_(self.R.weight.data)

    def TuckER(self, head, relation):
        head = self.bn0(head)
        head = self.ent_dropout(head)
        x = head.view(-1, 1, head.size(1))

        W_mat = torch.mm(relation, self.W.view(relation.size(1), -1))
        W_mat = W_mat.view(-1, head.size(1), head.size(1))
        W_mat = self.rel_dropout(W_mat)
        x = torch.bmm(x, W_mat) 
        x = x.view(-1, head.size(1)) 
        x = self.bn2(x)
        x = self.score_dropout(x)

        x = torch.mm(x, self.embedding.weight.transpose(1,0))
        pred = torch.sigmoid(x)
        return pred

    def RESCAL(self, head, relation):
        head = self.bn0(head)
        head = self.ent_dropout(head)
        ent_dim = head.size(1)
        head = head.view(-1, 1, ent_dim)
        relation = relation.view(-1, ent_dim, ent_dim)
        relation = self.rel_dropout(relation)
        x = torch.bmm(head, relation) 
        x = x.view(-1, ent_dim)  
        x = self.bn2(x)
        x = self.score_dropout(x)
        x = torch.mm(x, self.embedding.weight.transpose(1,0))
        pred = torch.sigmoid(x)
        return pred

    def DistMult(self, head, relation):
        head = self.bn0(head)
        head = self.ent_dropout(head)
        relation = self.rel_dropout(relation)
        s = head * relation
        s = self.bn2(s)
        s = self.score_dropout(s)
        ans = torch.mm(s, self.embedding.weight.transpose(1,0))
        pred = torch.sigmoid(ans)
        return pred
    
    def SimplE(self, head, relation):
        head = self.bn0(head)
        head = self.ent_dropout(head)
        relation = self.rel_dropout(relation)
        s = head * relation
        s_head, s_tail = torch.chunk(s, 2, dim=1)
        s = torch.cat([s_tail, s_head], dim=1)
        s = self.bn2(s)
        s = self.score_dropout(s)
        s = torch.mm(s, self.embedding.weight.transpose(1,0))
        s = 0.5 * s
        pred = torch.sigmoid(s)
        return pred

    def ComplEx(self, head, relation):
        head = torch.stack(list(torch.chunk(head, 2, dim=1)), dim=1)
        head = self.bn0(head)
        head = self.ent_dropout(head)
        relation = self.rel_dropout(relation)
        head = head.permute(1, 0, 2)
        re_head = head[0]
        im_head = head[1]

        re_relation, im_relation = torch.chunk(relation, 2, dim=1)
        re_tail, im_tail = torch.chunk(self.embedding.weight, 2, dim =1)

        re_score = re_head * re_relation - im_head * im_relation
        im_score = re_head * im_relation + im_head * re_relation

        score = torch.stack([re_score, im_score], dim=1)
        score = self.bn2(score)
        score = self.score_dropout(score)
        score = score.permute(1, 0, 2)

        re_score = score[0]
        im_score = score[1]
        score = torch.mm(re_score, re_tail.transpose(1,0)) + torch.mm(im_score, im_tail.transpose(1,0))
        pred = torch.sigmoid(score)
        return pred

    def Rotat3(self, head, relation):
        pi = 3.14159265358979323846
        relation = F.hardtanh(relation) * pi
        r = torch.stack(list(torch.chunk(relation, 3, dim=1)), dim=1)
        h = torch.stack(list(torch.chunk(head, 3, dim=1)), dim=1)
        h = self.bn0(h)
        h = self.ent_dropout(h)
        r = self.rel_dropout(r)
        
        r = r.permute(1, 0, 2)
        h = h.permute(1, 0, 2)

        x = h[0]
        y = h[1]
        z = h[2]

        # need to rotate h by r
        # r contains values in radians

        for i in range(len(r)):
            sin_r = torch.sin(r[i])
            cos_r = torch.cos(r[i])
            if i == 0:
                x_n = x.clone()
                y_n = y * cos_r - z * sin_r
                z_n = y * sin_r + z * cos_r
            elif i == 1:
                x_n = x * cos_r - y * sin_r
                y_n = x * sin_r + y * cos_r
                z_n = z.clone()
            elif i == 2:
                x_n = z * sin_r + x * cos_r
                y_n = y.clone()
                z_n = z * cos_r - x * sin_r

            x = x_n
            y = y_n
            z = z_n

        s = torch.stack([x, y, z], dim=1)        
        s = self.bn2(s)
        s = self.score_dropout(s)
        s = s.permute(1, 0, 2)
        s = torch.cat([s[0], s[1], s[2]], dim = 1)
        ans = torch.mm(s, self.embedding.weight.transpose(1,0))
        pred = torch.sigmoid(ans)
        return pred


    def forward(self, e1_idx, r_idx):
        e1 = self.embedding(e1_idx)
        h = e1
        r = self.relation_embedding(r_idx)
        ans = self.getScores(h, r)
        pred = torch.sigmoid(ans)
        return pred


def evaluate(model, entity_idx, relation_idx, cuda):
    model.eval()
    e1_idx = torch.tensor([entity_idx])
    r_idx = torch.tensor([relation_idx])

    if cuda:
        e1_idx = e1_idx.cuda()
        r_idx = r_idx.cuda()
    predictions = model.forward(e1_idx, r_idx)
    sort_values, sort_idxs = torch.sort(predictions, dim=1, descending=True)
    sort_idxs = sort_idxs.cpu().numpy()
    ans_idx = sort_idxs[0,0]
    return ans_idx


class Data:

    def __init__(self, embedding_folder):
        entity_dict = embedding_folder + '/entities.dict'
        relation_dict = embedding_folder + '/relations.dict'

        self.entity2idx, self.relation2idx = self.get_relations(entity_dict, relation_dict)

    def get_relations(self, entity_dict, relation_dict):
        e = {}
        r = {}
        f = open(entity_dict, 'r')
        for line in f:
            line = line[:-1].split('\t')
            ent_id = int(line[0])
            ent_name = line[1]
            e[ent_name] = ent_id
        f.close()
        f = open(relation_dict,'r')
        for line in f:
            line = line.strip().split('\t')
            rel_id = int(line[0])
            rel_name = line[1]
            r[rel_name] = rel_id
        f.close()
        return e,r

def prepare_embeddings(embedding_dict):
    entity2idx = {}
    idx2entity = {}
    i = 0
    embedding_matrix = []
    for key, entity in embedding_dict.items():
        entity2idx[key.strip()] = i
        idx2entity[i] = key.strip()
        i += 1
        embedding_matrix.append(entity)
    return entity2idx, idx2entity, embedding_matrix


def preprocess_entities_relations(entity_dict, relation_dict, entities, relations):
    e = {}
    r = {}

    f = open(entity_dict, 'r')
    for line in f:
        line = line.strip().split('\t')
        ent_id = int(line[0])
        ent_name = line[1]
        e[ent_name] = entities[ent_id]
    f.close()

    f = open(relation_dict,'r')
    for line in f:
        line = line.strip().split('\t')
        rel_id = int(line[0])
        rel_name = line[1]
        r[rel_name] = relations[rel_id]
    f.close()
    return e,r

#############################################################################
####################### main 
root_dir = os.getcwd()
root_dir = os.path.join(root_dir, ".")
data_dir = os.path.join(root_dir, "datasets")
KG_dir = os.path.join(data_dir, "MetaQA")

# -----this one should change according to different models
#embedding_folder = "./kg_embeddings/MetaQA/"
embedding_folder = KG_dir

# load model
data = Data(embedding_folder)

# check whether head entity and relation is in the KG
head = "April Fool's Day"
predict = "has_genre"
entity_idx = data.entity2idx[head]
relation_idx = data.relation2idx[predict]

# def __init__(self, relation_dim, num_entities, pretrained_embeddings, device, l3_reg, model, w_matrix, bn_list, freeze=True):
relation_dim = 200

entity_embedding_path = embedding_folder + '/E.npy'
relation_embedding_path = embedding_folder + '/R.npy'
entity_dict = embedding_folder + '/entities.dict'
relation_dict = embedding_folder + '/relations.dict'
w_matrix =  embedding_folder + '/W.npy'
entities = np.load(entity_embedding_path)
relations = np.load(relation_embedding_path)
e,r = preprocess_entities_relations(entity_dict, relation_dict, entities, relations)
entity2idx, idx2entity, embedding_matrix = prepare_embeddings(e)
relation2idx, idx2relation, rel_embedding_matrix = prepare_embeddings(r)

bn_list = []
for i in range(3):
    bn = np.load(embedding_folder + '/bn' + str(i) + '.npy', allow_pickle=True)
    bn_list.append(bn.item())
# -----model="" should change according to different models
use_cuda = False
device = torch.device("0" if use_cuda else "cpu")
model = TuckER(relation_dim=relation_dim, num_entities = len(data.entity2idx), pretrained_embeddings=embedding_matrix, 
        pretrained_relation_embeddings=rel_embedding_matrix,
        freeze=True, device=device, l3_reg = 0.0, model = "RESCAL", w_matrix = w_matrix, bn_list=bn_list)
ans = evaluate(model, entity_idx, relation_idx, use_cuda)
print(idx2entity[ans])