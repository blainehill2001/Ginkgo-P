import numpy as np
from ampligraph.latent_features import TransE
from ampligraph.evaluation import evaluate_performance

# Load train data
train_file_path = "../../../ginkgo_backend/data/umls/train.triples"
train_data = []

with open(train_file_path, "r") as train_file:
    for line in train_file:
        e1, r, e2 = line.strip().split("\t")
        train_data.append((e1, r, e2))

# Create entity and relation mappings
entities = set()
relations = set()

for e1, r, e2 in train_data:
    entities.add(e1)
    entities.add(e2)
    relations.add(r)

entity_to_id = {entity: idx for idx, entity in enumerate(entities)}
relation_to_id = {relation: idx for idx, relation in enumerate(relations)}

# Convert train triples to IDs
train_data_ids = [
    [entity_to_id[e1], relation_to_id[r], entity_to_id[e2]]
    for e1, r, e2 in train_data
]

# Convert to ndarray
train_data_ids = np.array(train_data_ids)

# Define TransE model
model = TransE(batches_count=100, seed=0, epochs=300, k=150, eta=20, optimizer='adam', optimizer_params={'lr': 0.001}, loss='multiclass_nll', verbose=True)

# Train the model
model.fit(train_data_ids)

# Load test data
test_file_path = "../../../ginkgo_backend/data/umls/test.triples"
test_data = []

with open(test_file_path, "r") as test_file:
    for line in test_file:
        e1, r, e2 = line.strip().split("\t")
        test_data.append((e1, r, e2))

# Convert test triples to IDs
test_data_ids = [
    [entity_to_id.get(e1, -1), relation_to_id.get(r, -1), entity_to_id.get(e2, -1)]
    for e1, r, e2 in test_data
]

# Convert to ndarray
test_data_ids = np.array(test_data_ids)

# Evaluate the model on test data
ranks = evaluate_performance(test_data_ids, model=model, filter_triples=train_data_ids, use_default_protocol=True, verbose=True)
print("Mean rank:", np.mean(ranks))
