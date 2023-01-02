import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const MyFirstComponent = () => {
  const onSubmit = async (data) => {
    const fields = { fields: data };
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  return (
    <div className="justify-center py-20">
      <div className="group relative mx-auto w-96 overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500">
        <div className="group-hover:animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent group-hover:visible"></div>
        <div className="relative rounded-[15px] bg-white p-6">
          <h5>React Hook Form - MyFirstComponent Example</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <label
                htmlFor="email"
                className={`block font-bold text-sm mb-2 ${
                  errors.email ? "text-red-400" : "text-purple-400"
                }`}
              >
                Email
              </label>
              <input
                {...register("email")}
                type="text"
                id="email"
                placeholder="hey@chrisoncode.io"
                autoComplete="off"
                className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4  placeholder-purple-500 focus:bg-purple-600 ${
                  errors.email
                    ? "text-red-300 border-red-400"
                    : "text-purple-200 border-purple-400"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  A valid email is required.
                </p>
              )}
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className={`block font-bold text-sm mb-2 ${
                  errors.password ? "text-red-400" : "text-purple-400"
                }`}
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="superduperpassword"
                autoComplete="off"
                className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 text-purple-200 focus:bg-purple-600 placeholder-purple-500 ${
                  errors.password ? "border-red-400" : "border-purple-400"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  Your password is required.
                </p>
              )}
            </div>

            <button className="inline-block bg-yellow-500 text-yellow-800 rounded shadow py-2 px-5 text-sm">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyFirstComponent;
