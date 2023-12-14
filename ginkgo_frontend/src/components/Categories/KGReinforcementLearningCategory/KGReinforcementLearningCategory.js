//imports
import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

import KGReinforcementLearningHome from "./KGReinforcementLearningHome";
import MultiHopKG from "./MultiHopKG";

const KGReinforcementLearningCategory = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <>
      <div className="justify-center px-2">
        <div className="group relative mx-auto w-6/12 overflow-hidden bg-gray-300 rounded-[16px] p-[1px] py-0.5 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] text-purple-500 flex-auto p-5"
            data-theme="mytheme"
          >
            <h5>KG Reinforcement Learning</h5>

            <Tabs value={activeTab} onChange={handleTabChange}>
              <TabsHeader>
                <Tab value="home">Home</Tab>
                <Tab value="multihopkg">MultiHopKG</Tab>
              </TabsHeader>

              <TabsBody>
                <TabPanel value="home" activeTab={activeTab}>
                  <KGReinforcementLearningHome />
                </TabPanel>

                <TabPanel value="multihopkg" activeTab={activeTab}>
                  <MultiHopKG />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default KGReinforcementLearningCategory;
