//imports
import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

import ExampleHome from "./ExampleHome";
import ExampleTab1 from "./ExampleTab1";
import ExampleTab2 from "./ExampleTab2";

const ExampleCategory = () => {
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
            <h5>ExampleCategory</h5>

            <Tabs value={activeTab} onChange={handleTabChange}>
              <TabsHeader>
                <Tab value="home">Home</Tab>
                <Tab value="tab1">Tab 1</Tab>
                <Tab value="tab2">Tab 2</Tab>
              </TabsHeader>

              <TabsBody>
                <TabPanel value="home" activeTab={activeTab}>
                  <ExampleHome />
                </TabPanel>

                <TabPanel value="tab1" activeTab={activeTab}>
                  <ExampleTab1 />
                </TabPanel>

                <TabPanel value="tab2" activeTab={activeTab}>
                  <ExampleTab2 />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExampleCategory;
