import numpy as np
from ampligraph.latent_features import TransE  
from ampligraph.evaluation import evaluate_performance
from ampligraph.utils import restore_model
import utils

model = restore_model(model_name_path = 'model/transE_model_UMLS.pkl')
mapper = utils.EntityRelationMapper('../../../ginkgo_backend/data/umls/entity2id.txt', '../../../ginkgo_backend/data/umls/relation2id.txt')

# Load test data
test_data = []

with open("../../../ginkgo_backend/data/umls/test.triples") as f:
    for line in f:
        e1, r, e2 = line.strip().split("\t")
        test_data.append((e1, r, e2))

# Convert test data to IDs  
test_data_ids = [
    (mapper.get_entity_id(e1), mapper.get_relation_id(r), mapper.get_entity_id(e2))
    for e1, r, e2 in test_data
]

# Evaluate the model on test data
ranks = evaluate_performance(np.array(test_data_ids), model=model, filter_triples=test_data_ids, use_default_protocol=True, verbose=True)
print("Mean rank:", np.mean(ranks))