from pykeen.pipeline import pipeline
from pykeen.datasets import UMLS
from pykeen.evaluation import RankBasedEvaluator
import torch

# Load trained model
model = torch.load('./model/trained_model.pkl')


# Load UMLS test set
dataset = UMLS()

# Evaluate pipeline on test set
evaluator = RankBasedEvaluator()
results = evaluator.evaluate(
    mapped_triples=dataset.testing.mapped_triples,
    model=model,
    additional_filter_triples=[
        dataset.training.mapped_triples,
        dataset.validation.mapped_triples,
    ]
)

# Print evaluation results
mean_rank = results.get_metric('mean_rank')
mean_reciprocal_rank = results.get_metric('mean_reciprocal_rank')
hits_at_10 = results.get_metric('hits@10')

print(f"Mean Rank: {mean_rank}")
print(f"Mean Reciprocal Rank: {mean_reciprocal_rank}")
print(f"Hits@10: {hits_at_10}")




"""
# If we were to use Ampligraph (which requires tensorflow 1.x), we would use the following code:


import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import numpy as np
from ampligraph.latent_features import TransE  
from ampligraph.evaluation import evaluate_performance, mrr_score, hits_at_n_score
from ampligraph.utils import restore_model
import src.utils as utils

model = restore_model(model_name_path = '../model/transE_model_UMLS.pkl')
mapper = utils.EntityRelationMapper('../../../../ginkgo_backend/data/umls/entity2id.txt', '../../../../ginkgo_backend/data/umls/relation2id.txt')

# Load test data
test_data = []

with open("../../../../ginkgo_backend/data/umls/test.triples") as f:
    for line in f:
        e1, e2, r = line.strip().split("\t")
        test_data.append((e1, e2, r))

# Convert test data to IDs  
test_data_ids = [
    (mapper.get_entity_id(e1), mapper.get_relation_id(r), mapper.get_entity_id(e2))
    for e1, e2, r in test_data
]

# Evaluate the model on test data
ranks = evaluate_performance(np.array(test_data_ids), model)
print("Mean rank:", np.mean(ranks))
print("MRR Score:", mrr_score(ranks))
print("Hits at N=10:", hits_at_n_score(ranks, n=10))

"""

