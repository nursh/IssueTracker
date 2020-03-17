import React from "react";
import { NavLink } from "react-router-dom";
import google from "../images/google.png";
import sprite from "../images/sprite.svg";

function SignUp() {
  return (
    <>
      <div className="mt-10 max-w-lg m-auto bg-white shadow-lg rounded px-8 py-10 border">
        <h2 className="text-center mb-6 font-semibold text-3xl">Sign up</h2>
        <div className="flex flex-col">
          <button className=" border rounded flex items-center shadow px-4 py-3 bg-white flex-grow justify-center focus:outline-none">
            <img src={google} alt="google" className="h-8 w-8" />
            <span className="ml-4">Sign up with Google</span>
          </button>
          <button className=" border rounded flex items-center shadow mt-6 px-4 py-3 bg-white justify-center focus:outline-none">
            <svg className="h-8 w-8">
              <use xlinkHref={`${sprite}#icon-github`} />
            </svg>
            <span className="ml-4 ">Sign up with GitHub</span>
          </button>
        </div>

        <p className="text-center my-8 text-lg font-semibold">
          Or Sign up with Email
        </p>

        <form className="flex flex-col">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 py-3 px-4 rounded bg-gray-200 border"
            />
          </div>

          <div className="flex flex-col mt-6">
            <label
              htmlFor="email"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-2 py-3 px-4 rounded bg-gray-200 border"
            />
          </div>

          <div className="flex flex-col mt-6">
            <label
              htmlFor="password"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 py-3 px-4 rounded bg-gray-200 border"
            />
          </div>

          <button className="shadow rounded px-4 py-3 bg-indigo-600 text-white mt-10 uppercase text-sm">
            Sign up
          </button>
        </form>
      </div>

      <div className="mt-10 max-w-lg m-auto bg-gray-300 rounded text-center py-4">
        Already have an account?
        <NavLink to="/index/signin" className="ml-3 font-semibold hover:underline">
          Sign in
        </NavLink>
      </div>
    </>
  );
}

export default SignUp;
