import React from 'react';
import { NavLink } from 'react-router-dom';
import google from '../images/google.png';
import sprite from '../images/sprite.svg';


function SignIn() {
  return (
    <>
      <div className="mt-12 max-w-lg m-auto bg-white shadow-lg rounded px-8 py-10 border">
        <h2 className="text-center mb-6 font-semibold text-3xl">Sign in</h2>
        <div className="flex flex-col">
          <button className=" border rounded flex items-center shadow px-4 py-3 bg-white flex-grow justify-center focus:outline-none">
            <img src={google} alt="google" className="h-8 w-8" />
            <span className="ml-4 ">Sign in with Google</span>
          </button>
          <button className=" border rounded flex items-center shadow mt-6 px-4 py-3 bg-white justify-center focus:outline-none">
            <svg className="h-8 w-8">
              <use xlinkHref={`${sprite}#icon-github`} />
            </svg>
            <span className="ml-4">Sign in with GitHub</span>
          </button>
        </div>

        <p className="text-center my-8 text-lg font-semibold">
          Or Sign in with Email
        </p>

        <form className="flex flex-col">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
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
            Sign in
          </button>
        </form>
      </div>

      <div className="mt-10 max-w-lg m-auto bg-gray-300 rounded text-center py-4">
        Don't have an account?
        <NavLink to="/index/signup" className="ml-3 font-semibold hover:underline">
          Sign up
        </NavLink>
      </div>
    </>
  );
}

export default SignIn;
