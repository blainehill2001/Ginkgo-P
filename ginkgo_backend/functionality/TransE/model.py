import torch
from torch.nn import Embedding, Module  

class TransEModel(Module):
    def __init__(self, num_entities, num_relations, embedding_dim):
        super().__init__()
        self.entity_embeddings = Embedding(num_entities, embedding_dim)
        self.relation_embeddings = Embedding(num_relations, embedding_dim)
        
    def forward(self, head, relation, tail):
        h = self.entity_embeddings(head)
        r = self.relation_embeddings(relation) 
        t = self.entity_embeddings(tail)
        
        score = (h + r) - t
        return torch.norm(score, p=2, dim=1)