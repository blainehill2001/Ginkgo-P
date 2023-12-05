import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@material-tailwind/react";
import Loading from "../Loading";
import Error from "../Error";
import Result from "../Result";
import Ajv from "ajv";
const QuickStart = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const ajv = new Ajv(); // Create an Ajv instance
  const jsonSchema = {
    type: "object",
    properties: {
      highlighted_path: { type: "array" },
      highlighted_nodes: { type: "array" },
      graph: {
        type: "object",
        properties: {
          nodes: { type: "array" },
          links: { type: "array" }
        },
        required: ["nodes", "links"] // Make sure "nodes" and "links" are present in "graph"
      }
    },
    required: ["highlighted_path", "highlighted_nodes", "graph"] // Make sure these properties are present at the top level
  };

  const addStatus = (inputValue) => {
    const jsonData = JSON.parse(inputValue);

    if (jsonData.status === undefined) {
      jsonData.status = "Consistent";
    }

    return JSON.stringify(jsonData);
  };

  const validateJSON = (inputValue) => {
    try {
      const jsonData = JSON.parse(inputValue);
      const valid = ajv.validate(jsonSchema, jsonData);

      if (valid) {
        setHasError(false);
        return true;
      } else {
        setHasError(true);
        return false;
      }
    } catch (error) {
      setHasError(true);
      return false;
    }
  };

  //when user submits the form
  const onSubmit = (data) => {
    setIsLoading(true);
    setData({});
    setHasError(false);
    setIsLoading(false);
    data = addStatus(data.query);
    setData(data);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({});
  const queryValue = watch("query");
  return (
    <div className="justify-center py-20 px-80">
      <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div
          className="relative rounded-[15px] p-6 text-purple-500"
          data-theme="mytheme"
        >
          <Card color="transparent" shadow={false}>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                  <label
                    htmlFor="query"
                    className={`block font-bold text-sm mb-2 ${
                      errors.query ? "text-red-400" : "text-purple-500"
                    }`}
                  >
                    Copy and paste your JSON here!
                  </label>
                  <div className="relative flex items-center">
                    <textarea
                      {...register("query", { validate: validateJSON })} // Register the input with validation
                      id="query"
                      const
                      placeholder={`e.g.
{
    "highlighted_path": [],
    "highlighted_nodes": [],
    "graph": {
        "nodes": [],
        "links": []
    }
}`} //add the full json structure here later
                      autoComplete="off"
                      value={queryValue}
                      rows={10} // Set the number of rows
                      cols={40} // Set the number of columns
                      className={`flex-grow bg-transparent outline-none border-b-2 py-2 px-4 placeholder-purple-300 focus:bg-purple-100 ${
                        errors.query
                          ? "text-red-300 border-red-400"
                          : "text-purple-500 border-purple-400"
                      }`}
                    />
                  </div>
                  {errors.query && (
                    <div className="text-red-500 text-sm mt-2">
                      {<p>Query must be valid JSON and satisfy the schema!</p>}
                    </div>
                  )}
                </div>
                <button
                  className={
                    isLoading === true
                      ? "inline-block bg-[#fbe5a9] text-[#8f69a2] rounded shadow py-2 px-5 text-sm opacity-50 cursor-not-allowed outline outline-1 outline-[#8f69a2]"
                      : "inline-block bg-[#fbe5a9] text-[#8f69a2] rounded shadow py-2 px-5 text-sm outline outline-1 outline-[#8f69a2]"
                  }
                  type="submit"
                >
                  Submit
                </button>
              </form>

              <div className="flex flex-col items-center py-3">
                {isLoading && <Loading />}
                {!isLoading && hasError && (
                  <Error
                    errorMessage="Error! The poor API didn't like that. Try again in a little bit or
            with different inputs"
                  />
                )}
                {Object.keys(data).length > 0 && !isLoading && !hasError && (
                  <Result data={data} />
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuickStart;
