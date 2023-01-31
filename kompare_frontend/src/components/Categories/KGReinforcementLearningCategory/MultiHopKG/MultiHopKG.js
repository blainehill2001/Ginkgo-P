import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../../Loading";
import Error from "../../../Error";

let BACKEND;
process.env.REACT_APP_NODE_ENV == "prod"
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
    query: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  return (
    <div className="justify-center ">
      <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div
          className="relative rounded-[15px] p-6 text-purple-500"
          data-theme="mytheme"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex-auto">
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
                      ? "inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm opacity-50 cursor-not-allowed"
                      : "inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm"
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
                !hasError && (
                  <p>this is data: {String(data.algocall_result.result)}</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiHopKG;