import networkx as nx
import pickle
import heapq
import json
import matplotlib.pyplot as plt

# Function to retrieve PageRank scores from the file
def retrieve_scores(file_path):
    pr_scores = {}

    with open(file_path, 'r') as file:
        for line in file:
            node, score = line.strip().split('\t')
            pr_scores[node] = float(score)

    return pr_scores


# Function to perform subgraph extraction within c hops of the query node
def extract_top_k_subgraph(graph, pr_scores, query_node, k, c, z):
    # Create the top subgraph
    top_subgraph = nx.DiGraph()
    top_subgraph.add_node(query_node)

    # Create the bottom subgraph
    bottom_subgraph = nx.DiGraph()
    bottom_subgraph.add_node(query_node)

    # Helper function to add a node and its corresponding path to the subgraph
    def add_node_and_path(node, path, subgraph):
        subgraph.add_node(node)

        # Add the edges along the path to the subgraph
        for i in range(len(path) - 1):
            source = path[i]
            target = path[i + 1]
            label = graph[source][target]['label']
            subgraph.add_edge(source, target, label=label)

    # Perform breadth-first search to collect nodes within c hops of the query node
    queue = [(query_node, 0)]
    visited = {query_node}
    nodes_within_c_hops = set()

    while queue:
        current_node, depth = queue.pop(0)
        if depth <= c:
            nodes_within_c_hops.add(current_node)

        if depth < c:
            neighbors = graph[current_node]
            for neighbor in neighbors:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, depth + 1))

    # Create a list of (node, pagerank_score) tuples for nodes within c hops
    nodes_scores = [(node, pr_scores[node]) for node in nodes_within_c_hops]

    # Sort the nodes based on their pagerank scores in descending order
    sorted_nodes = sorted(nodes_scores, key=lambda x: x[1], reverse=True)

    # Get the top k nodes and bottom (z - k) nodes
    top_k_nodes = sorted_nodes[:min(k, len(sorted_nodes))]
    bottom_nodes = sorted_nodes[k:z]

    # Add top k nodes and their paths to the top subgraph
    for node, _ in top_k_nodes:
        path = nx.shortest_path(graph, source=node, target=query_node)
        add_node_and_path(node, path, top_subgraph)

    # Add bottom (z - k) nodes and their paths to the bottom subgraph
    for node, _ in bottom_nodes:
        path = nx.shortest_path(graph, source=node, target=query_node)
        add_node_and_path(node, path, bottom_subgraph)

    return top_subgraph, bottom_subgraph


def extract_top_k_subgraph(graph, pr_scores, query_node, k, c, z):
    # Create the top subgraph
    top_subgraph = nx.DiGraph()
    top_subgraph.add_node(query_node)

    # Create the bottom subgraph
    bottom_subgraph = nx.DiGraph()
    bottom_subgraph.add_node(query_node)

    # Helper function to add a node and its corresponding path to the subgraph
    def add_node_and_path(node, path, subgraph):
        subgraph.add_node(node)

        # Add the edges along the path to the subgraph
        for i in range(len(path) - 1):
            source = path[i]
            target = path[i + 1]
            label = graph[source][target]['label']
            subgraph.add_edge(source, target, label=label)

    # Perform breadth-first search to collect nodes within c hops of the query node
    queue = [(query_node, 0)]
    visited = {query_node}
    nodes_within_c_hops = set()

    while queue:
        current_node, depth = queue.pop(0)
        if depth <= c:
            nodes_within_c_hops.add(current_node)

        if depth < c:
            neighbors = graph[current_node]
            for neighbor in neighbors:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append((neighbor, depth + 1))

    # Create a list of (node, pagerank_score) tuples for nodes within c hops
    nodes_scores = [(node, pr_scores[node]) for node in nodes_within_c_hops]

    # Sort the nodes based on their pagerank scores in descending order
    sorted_nodes = sorted(nodes_scores, key=lambda x: x[1], reverse=True)

    # Get the top k nodes and bottom (z - k) nodes
    top_k_nodes = sorted_nodes[:min(k, len(sorted_nodes))]
    bottom_nodes = sorted_nodes[k:z]

    # Add top k nodes and their paths to the top subgraph
    for node, _ in top_k_nodes:
        path = nx.shortest_path(graph, source=node, target=query_node)
        add_node_and_path(node, path, top_subgraph)

    # Add bottom (z - k) nodes and their paths to the bottom subgraph
    for node, _ in bottom_nodes:
        path = nx.shortest_path(graph, source=node, target=query_node)
        add_node_and_path(node, path, bottom_subgraph)

    return top_subgraph, bottom_subgraph


def subgraph_to_json(top_subgraph, bottom_subgraph):
    # Initialize the JSON data structure
    data = {
        "status": "Consistent",
        "tag": 5,
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
        data["graph"]["links"].append({"source": node_mapping[source], "type": label, "target": node_mapping[target]})

    # Assign node IDs and store nodes in the JSON data for the top subgraph
    for node in top_subgraph.nodes:
        assign_node_id(node)
        data["highlighted_nodes"].append({"id": node_mapping[node], "name": node, "label": ""})

    # Store the highlighted path in the JSON data
    for edge in top_subgraph.edges:
        source, target = edge
        label = top_subgraph.edges[source, target]['label']
        data["highlighted_path"].append({"source": node_mapping[source], "type": label, "target": node_mapping[target]})

    # Assign node IDs and store nodes in the JSON data for the bottom subgraph
    for node in bottom_subgraph.nodes:
        assign_node_id(node)

    # Store the edges in the JSON data for the bottom subgraph
    for edge in bottom_subgraph.edges:
        source, target = edge
        label = bottom_subgraph.edges[source, target]['label']
        add_edge(source, target, label)

    # Convert the JSON data to a JSON string
    json_data = json.dumps(data, indent=4)

    # Print or return the JSON string
    print(json_data)


# Main execution
if __name__ == '__main__':
    scores_file_path = './pagerank_movielens_full_scores.txt'
    query_node = 'Evelyn Keyes'
    k, c, z = 5, 2, 9
    graph_pickle_file_path = './movielens_graph.pkl'

    # Load the graph from the pickle file
    with open(graph_pickle_file_path, 'rb') as f:
        graph = pickle.load(f)

    # Retrieve the PageRank scores
    pr_scores = retrieve_scores(scores_file_path)

    # Extract the top-K subgraph and top-z subgraph
    k_subgraph, z_subgraph = extract_top_k_subgraph(graph, pr_scores, query_node, k, c, z)
    print(k_subgraph, z_subgraph)


    # # Create the grid layout
    # fig, axs = plt.subplots(1, 2, figsize=(10, 4))

    # # Visualize the first graph
    # axs[0].set_title('k_subgraph')
    # nx.draw(k_subgraph, with_labels=True, ax=axs[0], node_color='lightblue', edge_color='gray')

    # # Visualize the second graph
    # axs[1].set_title('z_subgraph')
    # nx.draw(z_subgraph, with_labels=True, ax=axs[1], node_color='lightblue', edge_color='gray')

    # # Adjust the layout and display the plots
    # plt.tight_layout()
    # plt.show()
    
    
    subgraph_to_json(k_subgraph, z_subgraph)