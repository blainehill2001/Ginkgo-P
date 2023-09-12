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
        "result1": {
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
            data["result1"]["nodes"].append({"id": node_id, "name": node, "label": ""})

    # Helper function to add an edge to the JSON data
    def add_edge(source, target, label):
        data["result1"]["links"].append({"source": node_mapping[source], "type": label.strip().rstrip("_inv"), "target": node_mapping[target]})

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


# """
# To be completed using MovieLens with Lihui's help
# """
# import numpy as np
# from ampligraph.utils import restore_model
# import utils

# model = restore_model(model_name_path='model/transE_model_UMLS.pkl')

# entity1 = "Stealing Beauty (1996)"
# relation = "affects"

# x = model.predict(np.array([entity1_id, relation_id, -1]))

# predicted_entity2_id = x[0]
# print(x)
# predicted_entity2 = mapper.get_entity_name(predicted_entity2_id)

# print("Predicted entity: ", predicted_entity2)