import numpy as np
from ampligraph.latent_features import TransE  
from ampligraph.evaluation import evaluate_performance
from ampligraph.utils import save_model
import utils

# Create mapper 
mapper = utils.EntityRelationMapper('../../../ginkgo_backend/data/umls/entity2id.txt', '../../../ginkgo_backend/data/umls/relation2id.txt')

# Load train data
train_data = []

with open("../../../ginkgo_backend/data/umls/train.triples") as f:
    for line in f:
        e1, r, e2 = line.strip().split('\t')
        train_data.append((e1, r, e2))
        
# Convert to IDs 
train_data_ids = [
    (mapper.get_entity_id(e1), mapper.get_relation_id(r), mapper.get_entity_id(e2))
    for e1, r, e2 in train_data
]

# Define TransE model
model = TransE(batches_count=100, seed=0, epochs=300, k=150, eta=20, optimizer='adam', optimizer_params={'lr': 0.001}, loss='multiclass_nll', verbose=True)

# Train the model
model.fit(np.array(train_data_ids))

save_model(model, "model/transE_model_UMLS.pkl")