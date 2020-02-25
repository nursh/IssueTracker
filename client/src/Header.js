import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({ url }) {
  return (
    <div className="bg-white shadow px-10">
      <div className="max-w-screen-xl h-16 flex items-center justify-between m-auto py-2">
        <h1 className="text-lg font-semibold uppercase">Issue Tracker</h1>
        <div>
          <NavLink to={`${url}/signup`} className="text-indigo-600 border-indigo-600 border rounded px-6 py-2 focus:outline-none hover:text-white hover:bg-indigo-600">
            Sign up
          </NavLink>
          <NavLink to={`${url}/signin`} className="ml-8 focus:outline-none hover:underline">
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
}
