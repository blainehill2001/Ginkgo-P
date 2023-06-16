import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../../Loading";
import Error from "../../../Error";
import Result from "../../../Result";
import { fetchWithTimeout } from "../../../../ops/fetchWithTimeout";
import { getBackend } from "../../../../ops/getBackend.js";

var BACKEND = getBackend();

const ExampleTab1 = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onSubmit = async (data) => {
    const params = {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(data)
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
          console.log(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setData(data);
      })
      .catch((err) => {
        setHasError(true);
        setIsLoading(false);
        console.log(err);
      });
  };

  const onErrors = (data) => {
    console.log(data);
  };

  const schema = yup.object().shape({
    language: yup.string().required(),
    script: yup.string().required(),
    query: yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  return (
    <div className="justify-center">
      <div className="group relative mx-auto overflow-hidden bg-gray-300 rounded-[16px] p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div
          className="relative rounded-[15px] p-6 text-purple-500"
          data-theme="mytheme"
        >
          <div className="flex flex-col space-y-4">
            <div className="flex-auto">
              <h5>ExampleTab1 Component</h5>
              <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                <div className="mb-8">
                  <label
                    htmlFor="language"
                    className={`block font-bold text-sm mb-2 ${
                      errors.language ? "text-red-400" : "text-purple-500"
                    }`}
                  >
                    Language
                  </label>
                  <input
                    {...register("language")}
                    type="text"
                    id="language"
                    placeholder="e.g., python"
                    autoComplete="off"
                    className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-300 focus:bg-purple-100 ${
                      errors.language
                        ? "text-red-300 border-red-400"
                        : "text-purple-500 border-purple-400"
                    }`}
                  />
                  {errors.language && (
                    <p className="text-red-500 text-sm mt-2">
                      A valid language is required.
                    </p>
                  )}
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="script"
                    className={`block font-bold text-sm mb-2 ${
                      errors.script ? "text-red-400" : "text-purple-500"
                    }`}
                  >
                    Script Name
                  </label>
                  <input
                    {...register("script")}
                    type="script"
                    id="script"
                    placeholder="e.g., script1.py"
                    autoComplete="off"
                    className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-purple-500 focus:bg-purple-100 placeholder-purple-300 ${
                      errors.script ? "border-red-400" : "border-purple-400"
                    }`}
                  />
                  {errors.script && (
                    <p className="text-red-500 text-sm mt-2">
                      Your Script Name is required.
                    </p>
                  )}
                </div>

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
                !hasError && <Result data={data.algocall_result.result} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleTab1;
