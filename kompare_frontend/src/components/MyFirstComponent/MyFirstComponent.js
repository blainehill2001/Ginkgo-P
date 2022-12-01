import React from "react";
import Button from "react-bootstrap/Button";

const MyFirstComponent = () => {
  return (
    <>
      <button className="bg-blue-500 hover:bg-blue-700 text-orange font-bold py-2 px-4 rounded ml-4 mt-4">
        This is MyFirstComponent
      </button>
    </>
  );
};

export default MyFirstComponent;
