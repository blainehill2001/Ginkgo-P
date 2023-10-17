import React from "react";

const KGCompletionHome = () => {
  return (
    <div className="justify-center">
      <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div
          className="relative rounded-[15px] text-purple-500 "
          data-theme="mytheme"
        >
          <div className="bg-purple-500 bg-opacity-10 p-6">
            <div class=" p-8 rounded-lg">
              {" "}
              <h2 class="text-2xl font-bold mb-4">
                Knowledge Graph Completion
              </h2>{" "}
              <p class="mb-4">
                Knowledge Graph Completion (KG Completion) is the process of
                predicting missing links in knowledge graphs. Knowledge graphs
                like UMLS represent medical facts as triplets of node,
                relationship, and node. For example: &lt;Aspirin, treats,
                Pain&gt;. KG Completion helps populate UMLS with new medical
                facts by analyzing existing links.
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">TransE</h3>{" "}
              <p class="mb-4 ">
                <a
                  href="https://proceedings.neurips.cc/paper_files/paper/2013/file/1cecc7a77928ca8133fa24680a88d2f9-Paper.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  TransE
                </a>{" "}
                represents entities as vectors and relationships as translations
                between them. For the valid UMLS triplet &lt;Aspirin, treats,
                Pain&gt;, TransE keeps the vectors for Aspirin and Pain close
                together plus a "treats" translation.
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">ComplEx</h3>{" "}
              <p class="mb-4">
                <a
                  href="https://arxiv.org/pdf/1606.06357.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  ComplEx
                </a>{" "}
                uses complex embeddings to better model asymmetric UMLS
                relations like "treats" versus "treatedBy". ComplEx
                differentiates them via complex conjugates.
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">RotatE</h3>{" "}
              <p class="mb-4">
                <a
                  href="https://arxiv.org/pdf/1902.10197.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  RotatE
                </a>{" "}
                models UMLS relations as rotations in complex space. This allows
                capturing symmetry/antisymmetry. Valid triplets have small
                rotation angles.
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">DistMult</h3>{" "}
              <p>
                <a
                  href="https://arxiv.org/pdf/1412.6575.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  DistMult
                </a>{" "}
                uses bilinear scoring to judge UMLS triplet validity. It
                represents entities/relations as matrices and models validity
                via matrix multiplication.
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KGCompletionHome;
