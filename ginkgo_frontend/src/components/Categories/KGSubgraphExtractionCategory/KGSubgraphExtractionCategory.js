//imports
import React from "react";
import KGPointWiseReasoningHome from "./KGSubgraphExtractionHome";
import PageRank from "./PageRank";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

const KGSubgraphExtractionCategory = () => {
  const tabs = [
    {
      label: "Home",
      value: "home",
      desc: <KGPointWiseReasoningHome />
    },

    {
      label: "PageRank",
      value: "pagerank",
      desc: <PageRank />
    }
  ];

  return (
    <>
      <div className="justify-center px-2">
        <div className="group relative mx-auto w-6/12 overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] text-purple-500 flex-auto p-5"
            data-theme="mytheme"
          >
            <h5>KG Subgraph Extraction</h5>

            <Tabs value="home">
              <TabsHeader>
                {tabs.map(({ label, value }) => (
                  <Tab key={value} value={value}>
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody
                animate={{
                  mount: { y: 0 },
                  unmount: { y: 250 }
                }}
              >
                {tabs.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default KGSubgraphExtractionCategory;