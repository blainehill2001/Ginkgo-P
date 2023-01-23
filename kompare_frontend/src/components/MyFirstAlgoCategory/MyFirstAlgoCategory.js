//imports
import React from "react";
import MyFirstAlgoHome from "./MyFirstAlgoHome";
import MyFirstAlgoTab1 from "./MyFirstAlgoTab1";
import MyFirstAlgoTab2 from "./MyFirstAlgoTab2";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

const MyFirstAlgoCategory = () => {
  const tabs = [
    {
      label: "Home",
      value: "home",
      desc: <MyFirstAlgoHome />
    },
    {
      label: "Tab 1",
      value: "tab1",
      desc: <MyFirstAlgoTab1 />
    },

    {
      label: "Tab 2",
      value: "tab2",
      desc: <MyFirstAlgoTab2 />
    },

    {
      label: "Tab 3",
      value: "tab3",
      desc: `Eventually insert tab 3 component here`
    }
  ];

  return (
    <>
      <div className="justify-center py-20">
        <div className="group relative mx-auto w-6/12 overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] p-6 text-purple-500 flex-auto"
            data-theme="mytheme"
          >
            <h5>MyFirstAlgoCategory Component</h5>

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

export default MyFirstAlgoCategory;
