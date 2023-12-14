import React from "react";

const KGNodeRecommendationHome = () => {
  return (
    <div className="justify-center">
      <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] py-0.5 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div
          className="relative rounded-[15px] text-purple-500 "
          data-theme="mytheme"
        >
          <div className="bg-purple-500 bg-opacity-10 p-6">
            <div class=" p-8 rounded-lg">
              {" "}
              <h2 class="text-2xl font-bold mb-4">
                Knowledge Graph Node Recommendation
              </h2>{" "}
              <p class="mb-4">
                Node recommendation in knowledge graphs aims to predict the most
                relevant neighboring node for a given source node. This is based
                on minimizing the distance between the source node and candidate
                nodes in the graph embedding space.
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">PageRank</h3>{" "}
              <p class="mb-4">
                Calculating the distance between all node pairs can be
                computationally intensive for large graphs. An approximation
                algorithms like{" "}
                <a
                  href="https://mathweb.ucsd.edu/~fan/wp/localpartition.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  PageRank-Nibble
                </a>{" "}
                is used instead. PageRank-Nibble runs localized PageRank to find
                a dense cluster near the source node.
              </p>{" "}
              <p class="mb-4">
                For precomputed knowledge graphs like UMLS, the full PageRank
                scores can be leveraged to find the nearest neighbor nodes. But
                PageRank-Nibble is useful for node recommendation in large
                custom knowledge graphs.
              </p>{" "}
              <p class="mb-4">
                Other node recommendation algorithms include Random Walk with
                Restart and Spectral Clustering. These find localized regions in
                the graph near the source node to reduce the search space.
              </p>{" "}
              <p>
                Overall, node recommendation provides relevant and useful
                neighboring nodes in knowledge graphs. Approximation algorithms
                make this feasible for large graphs by concentrating the search
                to dense regions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KGNodeRecommendationHome;
