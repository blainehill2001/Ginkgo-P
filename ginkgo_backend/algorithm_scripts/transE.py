import os
import sys
import json
from scipy.spatial.distance import cdist

import numpy as np


def read_dict(file_name):
    entity2id = {}
    id2entity = {}
    with open(file_name, 'r', encoding='utf-8') as f:
        for line in f.readlines():
            ws = line.strip().split("\t")
            if len(ws) < 2:
                continue
            entity2id[ws[1]] = int(ws[0])
            id2entity[int(ws[0])] = ws[1]
    return entity2id, id2entity

root_dir = os.getcwd()
root_dir = os.path.join(root_dir, ".")
data_dir = os.path.join(root_dir, "datasets")
KG_dir = os.path.join(data_dir, "KG")

dict_dir = os.path.join(KG_dir, "wikidata_convex_embedding")
emb_dir = os.path.join(KG_dir, "wikidata_convex_embedding")




entity_dict_path = os.path.join(dict_dir, "entities.dict")

entity2id, id2entity = read_dict(entity_dict_path.strip())

entity_emb_path = os.path.join(emb_dir, "E.npy")
entity_emb = np.load(entity_emb_path)

query_entity = str(sys.argv[1])
# # Lihui: should change here
# #Kvalue = int(sys.argv[2])
Kvalue = 5

if query_entity not in entity2id:
    # return error info
    print("-1")
else:
    id = entity2id[query_entity]
    # find the most similar k according to the embedding
    query_emb = entity_emb[id]
    query_emb = np.array([query_emb])
    dists = (cdist(query_emb, entity_emb))
    k_nearest = np.argpartition(dists, Kvalue)
    res = []
    for e in k_nearest[0][0:5]:
        res.append(id2entity[e])
    
    print(json.dumps(res))

# print("run")
