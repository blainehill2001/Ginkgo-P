import React from "react";

const KGQuestionAnsweringHome = () => {
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
                Knowledge Graph Question Answering
              </h2>{" "}
              <p class="mb-4">
                Knowledge Graph Question Answering (KGQA) involves querying a
                knowledge graph to answer natural language questions. It locates
                relevant triplets in the KG to return the best answering entity.
                Additionally, nearby entities and relations are included to
                provide context for the answer.
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">EmbedKGQA</h3>{" "}
              <p class="mb-4">
                {" "}
                <a
                  href="https://aclanthology.org/2020.acl-main.412.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  EmbedKGQA
                </a>{" "}
                is a two-part model to tackle KGQA. First, it represents KG
                entities and relations as vector embeddings using ComplEx. It
                also encodes the question text using BERT to get contextualized
                embeddings.
              </p>{" "}
              <p class="mb-4">
                Second, EmbedKGQA defines a scoring function based on ComplEx to
                measure similarity between candidate answers and the question.
                It matches the question, topic entity, and answer embeddings.
              </p>{" "}
              <p class="mb-4">
                KGQA may require single hop or multi-hop reasoning to find the
                answers depending on the complexity of the question. EmbedKGQA
                can scale to handle complex questions.
              </p>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KGQuestionAnsweringHome;
