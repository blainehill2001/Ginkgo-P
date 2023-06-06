import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../../Loading";
import Error from "../../../Error";
import Result from "../../../Result";
import text from "../../../../assets/train_triples.js";

const rows = text.split("\n").map((row) => row.split("\t"));

const getRandomRow = () => {
  const randomIndex = Math.floor(Math.random() * rows.length);
  return rows[randomIndex];
};

let BACKEND;
process.env.REACT_APP_NODE_ENV === "prod"
  ? (BACKEND = process.env.REACT_APP_BACKEND + "/api/algorithms")
  : (BACKEND = process.env.REACT_APP_DEFAULT_BACKEND + "/api/algorithms");

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 30000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}

const MultiHopKG = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleButtonClick = () => {
    const [entity1, , relation] = getRandomRow();
    setValue("query", `${entity1}, ${relation}`);
  };

  const onSubmit = async (data_sent) => {
    const params = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "language": "python",
        "script": "multihopkg.py",
        ...data_sent
      })
    };

    console.log(params);

    setIsLoading(true);
    setData({});
    setHasError(false);
    fetchWithTimeout(BACKEND, params)
      .then((res) => {
        if (!res.ok) {
          setHasError(true);
          setIsLoading(false);
        }
        return res.json();
      })
      .then((data_received) => {
        setIsLoading(false);
        setData(data_received);
        console.log(data_received);
      })
      .catch((err) => {
        setHasError(true);
        setIsLoading(false);
        console.log(err);
      });
  };

  const onErrors = (data_received) => {
    console.log(data_received);
  };

  const schema = yup.object().shape({
    // language: yup.string().required(),
    // script: yup.string().required(),
    query: yup
      .string()
      .required()
      .matches(/^\w+,\s*\w+$/, 'Query must be in the format "xxxx, yyyy"')
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  const queryValue = watch("query");

  return (
    <div className="justify-center ">
      {/* <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500"> */}
      <div
        className="relative rounded-[15px] p-6 text-purple-500"
        data-theme="mytheme"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex-auto">
            <button
              onClick={handleButtonClick}
              className={
                "inline-block bg-[#fbe5a9] text-[#8f69a2] rounded shadow py-2 px-5 text-sm outline outline-1 outline-[#8f69a2]"
              }
            >
              Get Random Row
            </button>
            <h5>MultiHopKG Component</h5>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              <div className="mb-8">
                <label
                  htmlFor="query"
                  className={`block font-bold text-sm mb-2 ${
                    errors.query ? "text-red-400" : "text-purple-500"
                  }`}
                >
                  Query
                </label>
                <input
                  {...register("query")}
                  type="text"
                  id="query"
                  placeholder="test query!"
                  autoComplete="off"
                  value={queryValue}
                  className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-300 focus:bg-purple-100 ${
                    errors.query
                      ? "text-red-300 border-red-400"
                      : "text-purple-500 border-purple-400"
                  }`}
                />
                {errors.query && (
                  <p className="text-red-500 text-sm mt-2">
                    A valid query is required.
                  </p>
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
          </div>
          <div className="flex flex-col items-center">
            {isLoading && <Loading />}
            {!isLoading && hasError && <Error />}
            {data &&
              data.algocall_result &&
              data.algocall_result.result &&
              !isLoading &&
              !hasError && <Result data={data.algocall_result.result} />}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default MultiHopKG;