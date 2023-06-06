import sys
import os
import networkx as nx
import numpy as np
import torch
import torch.nn as nn
from torch.nn import functional as F
from transformers import *

######################################################################################################

class RelationExtractor(nn.Module):

    def __init__(self, embedding_dim, relation_dim, num_entities, pretrained_embeddings, device, 
    entdrop=0.0, reldrop=0.0, scoredrop=0.0, l3_reg=0.0, model='ComplEx', ls=0.0, do_batch_norm=True, freeze=True):
        super(RelationExtractor, self).__init__()
        self.device = device
        self.model = model
        self.freeze = freeze
        self.label_smoothing = ls
        self.l3_reg = l3_reg
        self.do_batch_norm = do_batch_norm
        if not self.do_batch_norm:
            print('Not doing batch norm')
        self.roberta_pretrained_weights = 'roberta-base'
        self.roberta_model = RobertaModel.from_pretrained(self.roberta_pretrained_weights)
        for param in self.roberta_model.parameters():
            param.requires_grad = True
        if self.model == 'DistMult':
            multiplier = 1
            self.getScores = self.DistMult
        elif self.model == 'SimplE':
            multiplier = 2
            self.getScores = self.SimplE
        elif self.model == 'ComplEx':
            multiplier = 2
            self.getScores = self.ComplEx
        elif self.model == 'TuckER':
            self.W = nn.Parameter(torch.tensor(np.random.uniform(-1, 1, (relation_dim, relation_dim, relation_dim)), 
                                    dtype=torch.float, device="cuda", requires_grad=True))
            multiplier = 1
            self.getScores = self.TuckER
        elif self.model == 'RESCAL':
            self.getScores = self.RESCAL
            multiplier = 1
        else:
            print('Incorrect model specified:', self.model)
            exit(0)
        self.hidden_dim = 768
        self.relation_dim = relation_dim * multiplier
        if self.model == 'RESCAL':
            self.relation_dim = relation_dim * relation_dim
        
        self.num_entities = num_entities
        self.loss = self.kge_loss

        # best: all dropout 0
        self.rel_dropout = torch.nn.Dropout(reldrop)
        self.ent_dropout = torch.nn.Dropout(entdrop)
        self.score_dropout = torch.nn.Dropout(scoredrop)
        self.fcnn_dropout = torch.nn.Dropout(0.1)

        # This is entity embedding
        self.embedding = nn.Embedding.from_pretrained(torch.stack(pretrained_embeddings, dim=0), freeze=self.freeze)

        self.mid1 = 512
        self.mid2 = 512
        self.mid3 = 512
        self.mid4 = 512

        self.hidden2rel = nn.Linear(self.hidden_dim, self.relation_dim)
        self.hidden2rel_base = nn.Linear(self.mid2, self.relation_dim)

        if self.model in ['DistMult', 'TuckER', 'RESCAL', 'SimplE']:
            self.bn0 = torch.nn.BatchNorm1d(self.embedding.weight.size(1))
            self.bn2 = torch.nn.BatchNorm1d(self.embedding.weight.size(1))
        else:
            self.bn0 = torch.nn.BatchNorm1d(multiplier)
            self.bn2 = torch.nn.BatchNorm1d(multiplier)

        self.logsoftmax = torch.nn.LogSoftmax(dim=-1)        
        self._klloss = torch.nn.KLDivLoss(reduction='sum')

    def set_bn_eval(self):
        self.bn0.eval()
        self.bn2.eval()

    def kge_loss(self, scores, targets):
        # loss = torch.mean(scores*targets)
        return self._klloss(
            F.log_softmax(scores, dim=1), F.normalize(targets.float(), p=1, dim=1)
        )

    def applyNonLinear(self, outputs):
        outputs = self.hidden2rel(outputs)
        return outputs

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
        if self.do_batch_norm:
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
        if self.do_batch_norm:
            score = self.bn2(score)

        score = self.score_dropout(score)
        score = score.permute(1, 0, 2)

        re_score = score[0]
        im_score = score[1]
        score = torch.mm(re_score, re_tail.transpose(1,0)) + torch.mm(im_score, im_tail.transpose(1,0))
        # pred = torch.sigmoid(score)
        pred = score
        return pred

    def getQuestionEmbedding(self, question_tokenized, attention_mask):
        roberta_last_hidden_states = self.roberta_model(question_tokenized, attention_mask=attention_mask)[0]
        states = roberta_last_hidden_states.transpose(1,0)
        cls_embedding = states[0]
        question_embedding = cls_embedding
        # question_embedding = torch.mean(roberta_last_hidden_states, dim=1)
        return question_embedding

    def forward(self, question_tokenized, attention_mask, p_head, p_tail):    
        question_embedding = self.getQuestionEmbedding(question_tokenized, attention_mask)
        rel_embedding = self.applyNonLinear(question_embedding)
        p_head = self.embedding(p_head)
        pred = self.getScores(p_head, rel_embedding)
        actual = p_tail
        if self.label_smoothing:
            actual = ((1.0-self.label_smoothing)*actual) + (1.0/actual.size(1)) 
        loss = self.loss(pred, actual)
        if not self.freeze:
            if self.l3_reg:
                norm = torch.norm(self.embedding.weight, p=3, dim=-1)
                loss = loss + self.l3_reg * torch.sum(norm)
        return loss
        
    def get_score_ranked(self, head, question_tokenized, attention_mask):
        question_embedding = self.getQuestionEmbedding(question_tokenized.unsqueeze(0), attention_mask.unsqueeze(0))
        rel_embedding = self.applyNonLinear(question_embedding)
        head = self.embedding(head).unsqueeze(0)
        scores = self.getScores(head, rel_embedding)
        # top2 = torch.topk(scores, k=2, largest=True, sorted=True)
        # return top2
        return scores

##########################################################################################################

def prepare_embeddings(embedding_dict):
    entity2idx = {}
    idx2entity = {}
    i = 0
    embedding_matrix = []
    for key, entity in embedding_dict.items():
        entity2idx[key] = i
        idx2entity[i] = key
        i += 1
        embedding_matrix.append(entity)
    return entity2idx, idx2entity, embedding_matrix


def preprocess_entities_relations(entity_dict, relation_dict, entities, relations):
    e = {}
    r = {}
    f = open(entity_dict, 'r')
    for line in f:
        line = line[:-1].split('\t')
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

# replace entity with NE
def process_question(sentence, entity2idx):
    question = sentence.split('[')
    question_1 = question[0]
    question_2 = question[1].split(']')
    head = question_2[0].strip()
    question_2 = question_2[1]
    question = question_1+'NE'+question_2
    question_tokenized, attention_mask = tokenize_question(question)
    head_id = entity2idx[head.strip()]
    return [torch.tensor(head_id), question_tokenized, attention_mask]

def find_answer(question, device, model, entity2idx, idx2entity=None):
    model.eval()
    d = process_question(question, entity2idx)
   
    answers = []
    head = d[0].to(device)
    question_tokenized = d[1].to(device)
    attention_mask = d[2].to(device)
    scores = model.get_score_ranked(head=head, question_tokenized=question_tokenized, attention_mask=attention_mask)[0]
    mask = torch.zeros(len(entity2idx)).to(device)
    mask[head] = 1
    #reduce scores of all non-candidates
    new_scores = scores - (mask*99999)
    pred_ans = torch.argmax(new_scores).item()
    return pred_ans, idx2entity[pred_ans]

def main(gpu, use_cuda, question, embedding_folder, model_path):
    ################## This need to change
    entity_embedding_path = embedding_folder + '/E.npy'
    relation_embedding_path = embedding_folder + '/R.npy'
    entity_dict = embedding_folder + '/entities.dict'
    relation_dict = embedding_folder + '/relations.dict'
    w_matrix =  embedding_folder + '/W.npy'
    
    entities = np.load(entity_embedding_path)
    relations = np.load(relation_embedding_path)
    entities = torch.tensor(entities)
    relations = torch.tensor(relations)
    e,r = preprocess_entities_relations(entity_dict, relation_dict, entities, relations)

    entity2idx, idx2entity, embedding_matrix = prepare_embeddings(e)
    relation2idx, idx2relation, rel_embedding_matrix = prepare_embeddings(r)

    device = torch.device(gpu if use_cuda else "cpu")
    model = RelationExtractor(embedding_dim=200, num_entities = len(idx2entity), relation_dim=200, pretrained_embeddings=embedding_matrix, freeze=True, device=device)
    # model.load_state_dict(torch.load("checkpoints/roberta_finetune/" + load_from + ".pt"))
    
    # fname = "/scratche/home/apoorv/tut_pytorch/kg-qa/checkpoints/roberta_finetune/" + load_from + ".pt"
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.to(device)

    # find_answer(question, device, model, entity2idx, idx2entity=None)
    answers_id, answer_txt = find_answer(question, device, model=model, entity2idx=entity2idx, idx2entity=idx2entity)
    print(answer_txt)
    a = 0

##############################################################

def pad_sequence(arr, max_len=128):
    num_to_add = max_len - len(arr)
    for _ in range(num_to_add):
        arr.append('<pad>')
    return arr

def tokenize_question(question):
    question = "<s> " + question + " </s>"
    # tokenizer.tokenize("I have a new GPU!")
    # ["i", "have", "a", "new", "gp", "##u", "!"]
    # the tokenizer splits "gpu" into known subwords: ["gp" and "##u"]. 
    # "##" means that the rest of the token should be attached to the previous one
    question_tokenized = tokenizer.tokenize(question)
    # pad input sentence to fixed length
    question_tokenized = pad_sequence(question_tokenized, 64)
    # first tokenize sentence, then encode sentence
    question_tokenized = torch.tensor(tokenizer.encode(question_tokenized, add_special_tokens=False))
    attention_mask = []
    for q in question_tokenized:
        # 1 means padding token
        # why 1 means padding token??
        if q == 1:
            attention_mask.append(0)
        else:
            attention_mask.append(1)
    return question_tokenized, torch.tensor(attention_mask, dtype=torch.long)
#############################################################################
####################### main 

# //"args": ["--mode", "train", "--load_from", "full_metaqa", "--relation_dim", "200", "--do_batch_norm", "1", "--gpu", "2", "--freeze", "1", "--batch_size", "128", "--validate_every", "10", "--lr", "0.00002", "--entdrop", "0.0", "--reldrop", "0.0", "--scoredrop", "0.0", "--decay", "1.0", "--model", "ComplEx", "--patience", "20", "--ls", "0.05", "--l3_reg", "0.001", "--nb_epochs", "200", "--outfile", "full_simpleqa"],
root_dir = os.getcwd()
root_dir = os.path.join(root_dir, ".")
data_dir = os.path.join(root_dir, "datasets")
KG_dir = os.path.join(data_dir, "MetaQA")
model_dir = os.path.join(KG_dir, "embedKGQA")

tokenizer_class = RobertaTokenizer
pretrained_weights = 'roberta-base'
tokenizer = tokenizer_class.from_pretrained(pretrained_weights)

model_path = os.path.join(model_dir, "embedKGQA.pt") #"checkpoints/roberta_finetune/embedKGQA.pt"
embedding_folder = model_dir
question = "what does [Robert Stack] appear in" # this question should be the input from users

#check whether the entity in the question is in the knowledge graph
# replace entity with NE
components = question.split('[')
components = components[1].split(']')
head = components[0].strip()

entity_dict = embedding_folder + '/entities.dict'
kg_entity_map = {}
f = open(entity_dict, 'r')
for line in f:
    line = line[:-1].split('\t')
    ent_id = int(line[0])
    ent_name = line[1]
    kg_entity_map[ent_name] = ent_id
f.close()

if head not in kg_entity_map:
    return "entity doesn't exist in knowledge grpah"


main(gpu="0", use_cuda=False, question=question, embedding_folder=embedding_folder, model_path=model_path)