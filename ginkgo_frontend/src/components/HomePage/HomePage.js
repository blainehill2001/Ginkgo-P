//imports
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="justify-center py-5 px-96">
        <div className="group relative overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] text-purple-500 "
            data-theme="mytheme"
          >
            <div className="bg-purple-500 bg-opacity-10 p-6">
              <div class=" p-8 rounded-lg">
                <h1 class="text-3xl font-bold mb-4">Welcome to Ginkgo-P!</h1>{" "}
                <p class="mb-4">
                  Ginkgo-P is an open platform for illustrating knowledge graph
                  algorithms, authored by{" "}
                  <a
                    href="https://blainehill2001.github.io/"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    Blaine Hill
                  </a>
                  ,{" "}
                  <a
                    href="https://lihuiliullh.github.io/"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    Lihui Liu
                  </a>
                  , and{" "}
                  <a
                    href="http://tonghanghang.org/"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    Hanghang Tong
                  </a>{" "}
                  and is under review at the 17th ACM International Conference
                  on Web Search and Data Mining conference (
                  <a
                    href="https://www.nlm.nih.gov/research/umls/index.html"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    WSDM '24
                  </a>
                  ). It supports four key Knowledge Graph Reasoning tasks on the{" "}
                  <a
                    href="https://www.wsdm-conference.org/2024/"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    Unified Medical Language System
                  </a>{" "}
                  (UMLS) knowledge graph:
                </p>{" "}
                <ul class="list-disc ml-8 mb-4">
                  {" "}
                  <li>
                    <Link
                      to="kgnoderecommendation"
                      className="text-indigo-400 hover:text-blue-500 hover:underline"
                    >
                      Knowledge Graph Node Recommendation
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      to="kgcompletion"
                      className="text-indigo-400 hover:text-blue-500 hover:underline"
                    >
                      Knowledge Graph Completion
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      to="kgquestionanswering"
                      className="text-indigo-400 hover:text-blue-500 hover:underline"
                    >
                      Knowledge Graph Question Answering
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      to="kgreinforcementlearning"
                      className="text-indigo-400 hover:text-blue-500 hover:underline"
                    >
                      Knowledge Graph Reinforcement Learning
                    </Link>
                  </li>{" "}
                </ul>{" "}
                <p class="mb-4">
                  As seen in the architecture diagram below, Ginkgo-P allows
                  users to run interactive demonstrations of pre-implemented
                  algorithms like{" "}
                  <a
                    href="https://mathweb.ucsd.edu/~fan/wp/localpartition.pdf"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    PageRank
                  </a>
                  ,{" "}
                  <a
                    href="https://proceedings.neurips.cc/paper_files/paper/2013/file/1cecc7a77928ca8133fa24680a88d2f9-Paper.pdf"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    TransE
                  </a>
                  , and{" "}
                  <a
                    href="https://arxiv.org/pdf/1808.10568.pdf"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    MultiHopKG
                  </a>{" "}
                  on the UMLS medical knowledge graph.
                </p>{" "}
                <div className="px-56 py-5">
                  <img
                    src={require("../../assets/Figure1.png")}
                    alt="Ginkgo-P Architecture"
                    className="mx-auto mb-4 object-scale-down rounded-lg "
                  />
                </div>{" "}
                <p class="mb-4">
                  Users can also integrate and visualize their own custom
                  knowledge graph algorithms by following the documentation.
                  When running demonstrations or custom algorithms, please be
                  patient as processing may take some time.
                </p>{" "}
                <p class="mb-4">
                  To quickly visualize your own knowledge graph data, visit the{" "}
                  <Link
                    to="quickstart"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    Quick Start
                  </Link>{" "}
                  page and paste in JSON matching our format.
                </p>{" "}
                <p class="mb-4">
                  To run your own knowledge graph algorithm scripts on our
                  system, head to the{" "}
                  <Link
                    to="custom"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    Run Custom KG Algorithm
                  </Link>{" "}
                  page and upload your Python code and data files.
                </p>{" "}
                <p class="mb-4">
                  For the best experience, we recommend running custom
                  algorithms on your own machine and making use of Quick Start
                  to visualize your results. Beyond showcasing some algorithms
                  algorithms, our free online compute resources are limited.
                </p>{" "}
                <p class="mb-4">
                  Ginkgo-P is fully open source to make knowledge graph research
                  more accessible. For any questions or documentation, refer to
                  our code at{" "}
                  <a
                    href="https://github.com/blainehill2001/Ginkgo-P"
                    className="text-indigo-400 hover:text-blue-500 hover:underline"
                  >
                    GitHub
                  </a>{" "}
                  . Please refer to our paper for full details on the system
                  architecture and algorithms.
                </p>{" "}
                <p>
                  We hope you find Ginkgo-P useful for your knowledge graph
                  projects!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
