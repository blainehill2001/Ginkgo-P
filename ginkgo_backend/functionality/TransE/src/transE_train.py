from pykeen.pipeline import pipeline, pipeline_from_path
from pykeen.datasets import UMLS
from pykeen.evaluation import RankBasedEvaluator
import torch

# Load your dataset
dataset = UMLS()

# Define and train your model using the pipeline
# training_pipeline = pipeline(
#     dataset=dataset,
#     model='TransE',
#     training_loop='slcwa',
#     optimizer='adam',
#     optimizer_kwargs={'lr': 0.001},
#     epochs=50,
#     loss='marginranking',
#     regularizer='LP',
#     regularizer_kwargs={'p': 2},
#     negative_sampler='basic',
#     negative_sampler_kwargs={'num_negs_per_pos': 1}
# )
training_pipeline = pipeline_from_path("./UMLS_pipeline.json")

#save model, pipeline
training_pipeline.save_to_directory('./model')


"""
# If we were to use Ampligraph (which requires tensorflow 1.x), we would use the following code:

from ampligraph.latent_features import TransE  
from ampligraph.utils import save_model
from ampligraph.datasets import load_from_csv
import src.utils as utils
import numpy as np

# Create mapper 
mapper = utils.EntityRelationMapper('../../../../ginkgo_backend/data/umls/entity2id.txt', '../../../../ginkgo_backend/data/umls/relation2id.txt')

# Load train data
train_data = []

with open("../../../../ginkgo_backend/data/umls/train.triples") as f:
    for line in f:
        e1, e2, r = line.strip().split('\t')
        train_data.append((e1, e2, r))
        
# Convert to IDs 
train_data_ids = [
    (mapper.get_entity_id(e1), mapper.get_relation_id(r), mapper.get_entity_id(e2))
    for e1, e2, r in train_data
]

# Define TransE model
model = TransE(batches_count=10, seed=0, epochs=10, k=150, eta=1, optimizer='adam', optimizer_params={'lr': 0.001}, loss='multiclass_nll', verbose=True)

# Train the model
model.fit(np.array(train_data_ids))

save_model(model, "../model/transE_model_UMLS.pkl")

"""
