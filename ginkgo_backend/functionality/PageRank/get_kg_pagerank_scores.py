import networkx as nx
import pickle

# Function to process the input file and create a NetworkX graph
def process_input_file(file_path):
    G = nx.DiGraph()

    with open(file_path, 'r') as file:
        for line in file:
            e1, e2, r = line.strip().split('\t')
            G.add_edge(e1, e2, label=r)
            G.add_edge(e2, e1, label=r)
    return G

# Function to run PageRank and store the scores in a file
def run_pagerank(graph, output_file):
    pr_scores = nx.pagerank(graph)

    with open(output_file, 'w') as file:
        for node, score in pr_scores.items():
            file.write(f"{node}\t{score}\n")

# Function to pickle the graph
def pickle_graph(graph, output_file):
    with open(output_file, 'wb') as file:
        pickle.dump(graph, file)

# Main execution
if __name__ == '__main__':
    path = '/Users/blaineh2/Documents/movielens_processed/full_dataset.triples'
    scores_output_file = './pagerank_movielens_full_scores.txt'
    graph_output_file = './movielens_graph.pkl'

    # Process input file and create the graph
    graph = process_input_file(path)

    # Run PageRank and store the scores
    run_pagerank(graph, scores_output_file)

    # Pickle the graph
    pickle_graph(graph, graph_output_file)