//imports
import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

import KGQuestionAnsweringHome from "./KGQuestionAnsweringHome";
import EmbedKGQA from "./EmbedKGQA";

const KGQuestionAnsweringCategory = () => {
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
            <h5>KG Question Answering</h5>

            <Tabs value={activeTab} onChange={handleTabChange}>
              <TabsHeader>
                <Tab value="home">Home</Tab>
                <Tab value="embedkgqa">EmbedKGQA</Tab>
              </TabsHeader>

              <TabsBody>
                <TabPanel value="home" activeTab={activeTab}>
                  <KGQuestionAnsweringHome />
                </TabPanel>

                <TabPanel value="embedkgqa" activeTab={activeTab}>
                  <EmbedKGQA />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default KGQuestionAnsweringCategory;
