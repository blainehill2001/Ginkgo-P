//imports
import React from "react";

const HomePage = () => {
  return (
    <>
      <div className="justify-center py-20">
        <div className="group relative mx-auto w-96 overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
          <div
            className="relative rounded-[15px] p-6 text-purple-500"
            data-theme="mytheme"
          >
            <h5>Home Component</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
