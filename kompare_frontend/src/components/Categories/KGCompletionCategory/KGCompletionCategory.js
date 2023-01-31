//imports
import React from "react";
import KGCompletionHome from "./KGCompletionHome";
import TransE from "./TransE";
import ComplEx from "./ComplEx";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel
} from "@material-tailwind/react";

const KGCompletionCategory = () => {
  const tabs = [
    {
      label: "Home",
      value: "home",
      desc: <KGCompletionHome />
    },
    {
      label: "TransE",
      value: "transe",
      desc: <TransE />
    },

    {
      label: "ComplEx",
      value: "complex",
      desc: <ComplEx />
    },

    {
      label: "RotatE",
      value: "rotate",
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
            <h5>KGCompletionCategory Component</h5>

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

export default KGCompletionCategory;
