import React from "react";

const KGReinforcementLearningHome = () => {
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
                Knowledge Graph Reinforcement Learning
              </h2>{" "}
              <p class="mb-4">
                Knowledge Graph Reinforcement Learning (KGRL) involves
                sequential decision making to traverse a knowledge graph and
                reason over multiple hops. It is designed to solve more complex
                than single step KG tasks.
              </p>{" "}
              <p class="mb-4">
                In Ginkgo-P, KGRL models treat the KG as the environment and
                relations between entities as the action space. It is framed as
                a Markov Decision Process (MDP).
              </p>{" "}
              <h3 class="text-xl font-bold mb-2">MultiHopKG</h3>{" "}
              <p class="mb-4">
                Algorithms like{" "}
                <a
                  href="https://arxiv.org/pdf/1808.10568.pdf"
                  className="text-indigo-400 hover:text-blue-500 hover:underline"
                >
                  MultiHopKG
                </a>{" "}
                are used to answer queries by traversing the KG. At each
                timestep, it takes relation actions to move between entities and
                gather information. At the end of the episode, the state in the
                MDP that the agent is at is returned as the predicted answer. Of
                course, if an agent reaches the answer node prior to the end, it
                ought to form a self-loop.
              </p>{" "}
              <p class="mb-4">
                Over the episode, MultiHopKG learns to follow promising paths in
                the KG to predict the final answer entity. This requires long
                distance reasoning over the state space. Additionally,
                MultiHopKG makes use of reward shaping to guide the agent if it
                achieved a close but incorrect answer, learning the
                relationships in the KG must faster.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KGReinforcementLearningHome;
