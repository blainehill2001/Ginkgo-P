import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import Embedding, Lambda
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.losses import MarginTripletLoss

# Define the model architecture
class TransEModel(Model):
    def __init__(self, num_entities, num_relations, embedding_dim):
        super(TransEModel, self).__init__()
        self.entity_embeddings = Embedding(num_entities, embedding_dim)
        self.relation_embeddings = Embedding(num_relations, embedding_dim)
    
    def call(self, inputs):
        e1_embedded = self.entity_embeddings(inputs[:, 0])
        r_embedded = self.relation_embeddings(inputs[:, 1])
        e2_embedded = self.entity_embeddings(inputs[:, 2])
        
        e1_embedded = tf.nn.l2_normalize(e1_embedded, axis=1)
        r_embedded = tf.nn.l2_normalize(r_embedded, axis=1)
        e2_embedded = tf.nn.l2_normalize(e2_embedded, axis=1)
        
        return e1_embedded, r_embedded, e2_embedded

# Function to read and preprocess triples from a file
def read_triples(file_path):
    triples = []
    with open(file_path, 'r') as file:
        for line in file:
            e1, r, e2 = line.strip().split('\t')
            triples.append((e1, r, e2))
    return triples

# Load and preprocess train and test triples
train_triples = read_triples("../../../ginkgo_backend/data/umls/train.triples")
test_triples = read_triples("../../../ginkgo_backend/data/umls/test.triples")

# Create a set of unique entities and relations
entities = set()
relations = set()
for e1, r, e2 in train_triples + test_triples:
    entities.add(e1)
    entities.add(e2)
    relations.add(r)
num_entities = len(entities)
num_relations = len(relations)
embedding_dim = 50

# Create and compile the model
model = TransEModel(num_entities, num_relations, embedding_dim)
optimizer = Adam(learning_rate=0.001)
model.compile(optimizer=optimizer, loss=MarginTripletLoss(margin=1.0))

# Prepare data for training
train_data = np.array([(e1, r, e2) for e1, r, e2 in train_triples])
train_labels = np.zeros(len(train_triples))  # Dummies for triplet loss

# Train the model
model.fit(train_data, train_labels, batch_size=64, epochs=10)

# Function to perform inference using the trained model
def infer_triples(model, triples):
    embeddings = model.predict(np.array([(e1, r, e2) for e1, r, e2 in triples]))
    return embeddings

# Prepare data for inference
test_data = np.array([(e1, r) for e1, r, _ in test_triples])

# Perform inference on test triples
test_embeddings = infer_triples(model, test_data)

# Function to find the nearest entity to a given embedding
def find_nearest_entity(embedding, embeddings):
    distances = np.linalg.norm(embeddings - embedding, axis=1)
    nearest_idx = np.argmin(distances)
    return nearest_idx

# Evaluate the model by checking predicted entities against ground truth
correct_predictions = 0
for i, (_, r, e2) in enumerate(test_triples):
    predicted_idx = find_nearest_entity(test_embeddings[i][0], test_embeddings[:, 2])
    predicted_entity = entities[predicted_idx]
    if predicted_entity == e2:
        correct_predictions += 1

accuracy = correct_predictions / len(test_triples)
print("Accuracy:", accuracy)
