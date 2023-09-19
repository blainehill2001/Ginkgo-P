import torch
from pykeen.datasets import UMLS
from pykeen.predict import predict_target
import json
import os
import re

def run_inference(entity1, relation, k1=1, k2=9, js_text_file_name='data/umls/train_triples_UMLS.js'):

    """
    Run inference on a given entity and relation. Return a JSON string containing the predicted subgraph and neighboring subgraph.

    Args:
        entity1: Center entity name
        relation: Relation name
        k1: Number of predictions to return (default: 1)
        k2: Number of neighboring nodes to return (default: 9)

    Returns:
        json_data: JSON string containing the predicted subgraph and neighboring subgraph

    """
    
    with open(os.path.join(os.path.dirname(os.path.dirname(__file__)), "log.txt"), "a") as log_file:
        message = f"Entity: {entity1}, Relation: {relation}"
        log_file.write(message + "\n")
    dataset = UMLS() #load dataset
    # Load pretrained model
    model = torch.load(os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src/model/trained_model.pkl'))

    # Lookup entity and relation IDs

    pred = predict_target(
        model=model,
        head=entity1,
        relation=relation,
        triples_factory=dataset.training
    ).filter_triples(dataset.training).filter_triples((entity1, relation, entity1)).df[:k1]
    pred_subgraph = []
    for index, row in pred.iterrows():
        pred_subgraph.append((entity1, relation, row["tail_label"]))
    current_directory = os.path.dirname(__file__)
    for _ in range(3):
        current_directory = os.path.dirname(current_directory)
    path_to_js_text_file = os.path.join(current_directory, f'{js_text_file_name}')
    def parse_triples(filepath):
        pattern = r'(\w+)\t(\w+)\t(\w+)'
        
        with open(filepath) as f:
            text = f.read()
        
        for match in re.finditer(pattern, text):
            yield match.groups()

    nbr_subgraph = get_random_neighbors(entity1, k2, parse_triples(path_to_js_text_file))

    return subgraph_to_json(pred_subgraph, nbr_subgraph)

def get_random_neighbors(entity, num_neighbors, triples_generator):
    """
    Get random neighboring nodes for a given entity.

    Args:
        entity: Center entity name
        num_neighbors: Number of neighbors to return
        triples_generator: A generator of (head, rel, tail) triples

    Returns:
        neighbors: List of (head, rel, tail) triples
    """
    entity_triples = []
    # Collect triples with the given entity as head until we have enough neighbors
    for triple in triples_generator:
        if triple[0] == entity:
            entity_triples.append((triple[0], triple[2], triple[1]))
            if len(entity_triples) >= num_neighbors:
                break

    # Return the shuffled triples as a list
    return entity_triples





def subgraph_to_json(predicted_subgraph, neighboring_subgraph):
    """
    Convert a predicted subgraph and neighboring subgraph to a JSON string.

    Args:
        predicted_subgraph: List of (head, rel, tail) triples for the predicted subgraph
        neighboring_subgraph: List of (head, rel, tail) triples for the neighboring subgraph

    Returns:
        json_data: JSON string containing the predicted subgraph and neighboring subgraph
    """
    # Initialize the JSON data structure
    data = {
        "status": "Consistent",
        "highlighted_path": [],
        "highlighted_nodes": [],
        "graph": {
            "nodes": [],
            "links": []
        }
    }

    # Mapping of node IDs to integers
    node_mapping = {}

    # Helper function to assign integer IDs to nodes and store them in the JSON data
    def assign_node_id(node):
        if node not in node_mapping:
            node_id = len(node_mapping) + 1
            node_mapping[node] = node_id
            data["graph"]["nodes"].append({"id": node_id, "name": node, "label": ""})

    # Helper function to add an edge to the JSON data
    def add_edge(source, target, label):
        data["graph"]["links"].append({"source": node_mapping[source], "type": label.strip().rstrip("_inv"), "target": node_mapping[target]})

    for link in predicted_subgraph:
        node1, relation, node2 = link

        # Assign node IDs and store nodes in the JSON data for the highlighted (predicted) subgraph
        assign_node_id(node1)
        data["highlighted_nodes"].append({"id": node_mapping[node1], "name": node1, "label": ""})
        assign_node_id(node2)
        data["highlighted_nodes"].append({"id": node_mapping[node2], "name": node2, "label": ""})

        # Store the highlighted path in the JSON data
        data["highlighted_path"].append({"source": node_mapping[node1], "type": relation.strip().rstrip("_inv"), "target": node_mapping[node2]})

    for link in neighboring_subgraph:
        node1, relation, node2 = link
        # Assign node IDs and store nodes in the JSON data for the neighboring subgraph
        assign_node_id(node1)
        assign_node_id(node2)
        # Store the edges in the JSON data for the neighboring subgraph
        add_edge(node1, node2, relation)
                                        
    # Convert the JSON data to a JSON string
    json_data = json.dumps(data, indent=4)

    # Print or return the JSON string
    return(json_data)

"""
# If we were to use Ampligraph (which requires tensorflow 1.x), we would use the following code:

import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
import numpy as np
from ampligraph.utils import restore_model
from ampligraph.discovery import query_topn
import src.utils as utils
import os
import json

def subgraph_to_json(predicted_subgraph, neighboring_subgraph):
    # Initialize the JSON data structure
    data = {
        "status": "Consistent",
        "highlighted_path": [],
        "highlighted_nodes": [],
        "graph": {
            "nodes": [],
            "links": []
        }
    }

    # Mapping of node IDs to integers
    node_mapping = {}

    # Helper function to assign integer IDs to nodes and store them in the JSON data
    def assign_node_id(node):
        if node not in node_mapping:
            node_id = len(node_mapping) + 1
            node_mapping[node] = node_id
            data["graph"]["nodes"].append({"id": node_id, "name": node, "label": ""})

    # Helper function to add an edge to the JSON data
    def add_edge(source, target, label):
        data["graph"]["links"].append({"source": node_mapping[source], "type": label.strip().rstrip("_inv"), "target": node_mapping[target]})

    for link in predicted_subgraph:
        node1, relation, node2 = link

        # Assign node IDs and store nodes in the JSON data for the highlighted (predicted) subgraph
        assign_node_id(node1)
        data["highlighted_nodes"].append({"id": node_mapping[node1], "name": node1, "label": ""})
        assign_node_id(node2)
        data["highlighted_nodes"].append({"id": node_mapping[node2], "name": node2, "label": ""})

        # Store the highlighted path in the JSON data
        data["highlighted_path"].append({"source": node_mapping[node1], "type": relation.strip().rstrip("_inv"), "target": node_mapping[node2]})

    for link in neighboring_subgraph:
        node1, relation, node2 = link

        # Assign node IDs and store nodes in the JSON data for the neighboring subgraph
        assign_node_id(node1)
        assign_node_id(node2)
        # Store the edges in the JSON data for the neighboring subgraph
        add_edge(node1, node2, relation)
                                        
    # Convert the JSON data to a JSON string
    json_data = json.dumps(data, indent=4)

    # Print or return the JSON string
    return(json_data)


def run_inference(entity1, relation):
    file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model/transE_model_UMLS.pkl')

    model = restore_model(model_name_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), 'model/transE_model_UMLS.pkl'))
    mapper = utils.EntityRelationMapper(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../../ginkgo_backend/data/umls/entity2id.txt'), os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../../../ginkgo_backend/data/umls/relation2id.txt'))

    entity1_id = mapper.get_entity_id(entity1)
    relation_id = mapper.get_relation_id(relation)


    x, scores = query_topn(model, top_n=1, head=entity1_id, relation=relation_id, tail=None) #generate top 5 predictions
    if len(x.shape) > 1:
        #2d array
        predicted_subgraph = [(mapper.get_entity_name(line[0]).strip(), mapper.get_relation_name(line[1]).strip().rstrip("_inv"), mapper.get_entity_name(line[2]).strip()) for line in x]
    else:
        #1d array
        predicted_subgraph = [(
            mapper.get_entity_name(x[0]).strip(),
            mapper.get_relation_name(x[1]).strip().rstrip("_inv"),
            mapper.get_entity_name(x[2]).strip()
        )]

    
    neighboring_subgraph = mapper.get_random_links_with_head(entity1_id)


    return subgraph_to_json(predicted_subgraph, neighboring_subgraph)
    
    """