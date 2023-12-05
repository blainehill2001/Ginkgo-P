//imports
import React, { useState } from "react";
import KGCompletionHome from "./KGCompletionHome";
import TransE from "./TransE";
import ComplEx from "./ComplEx";
import RotatE from "./RotatE";
import DistMult from "./DistMult";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

const KGCompletionCategory = () => {
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <>
      <div className="justify-center px-2">
        <div className="group relative mx-auto w-6/12 overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] text-purple-500 flex-auto p-5"
            data-theme="mytheme"
          >
            <h5>KG Completion</h5>

            <Tabs value={activeTab} onChange={handleTabChange}>
              <TabsHeader>
                <Tab value="home">Home</Tab>
                <Tab value="transe">TransE</Tab>
                <Tab value="complex">ComplEx</Tab>
                <Tab value="rotate">RotatE</Tab>
                <Tab value="distmult">DistMult</Tab>
              </TabsHeader>

              <TabsBody>
                <TabPanel value="home" activeTab={activeTab}>
                  <KGCompletionHome />
                </TabPanel>

                <TabPanel value="transe" activeTab={activeTab}>
                  <TransE />
                </TabPanel>

                <TabPanel value="complex" activeTab={activeTab}>
                  <ComplEx />
                </TabPanel>

                <TabPanel value="rotate" activeTab={activeTab}>
                  <RotatE />
                </TabPanel>

                <TabPanel value="distmult" activeTab={activeTab}>
                  <DistMult />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default KGCompletionCategory;
