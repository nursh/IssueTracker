import React from 'react';
import Avatar from 'react-avatar';
import { NavLink, useLocation } from 'react-router-dom';

import sprite from "../images/sprite.svg";

export default function Sidebar({ url }) {

  const location = useLocation();

  return (
    <div className="block w-64 px-8 py-4 bg-indigo-700 border-r overflow-auto text-white">
      <div className="mb-2">
        <h2 className="uppercase font-semibold text-lg tracking-wider">
          Issue Tracker
        </h2>
        <div className="mt-4 flex items-center">
          <Avatar name="John Guarnane" size={40} />
          <p className="ml-3">John Guarnane</p>
        </div>
      </div>

      <div className="my-10 -mx-3">
        <NavLink
          to="/projects"
          className="block font-medium text-sm hover:bg-indigo-500 px-3 py-2 rounded"
        >
          Back to Projects
        </NavLink>
      </div>

      <hr />

      <div className="my-10">
        <h3 className="uppercase text-sm font-semibold tracking-wide">
          Project
        </h3>
        <div className="mt-2 -mx-3">
          <NavLink
            to={`${url}`}
            className="block font-medium text-sm hover:bg-indigo-500 px-3 py-2 rounded"
          >
            Project Board
          </NavLink>
          <NavLink
            to={`${url}/manage-issues`}
            className="block font-medium text-sm hover:bg-indigo-500 px-3 py-2 rounded"
          >
            Manage Issues
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/create-issue`,
              state: { modal: location }
            }}
            className="block font-medium text-sm hover:bg-indigo-500 px-3 py-2 rounded"
          >
            Create Issue
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/delete-project`,
              state: { modal: location }
            }}
            className="block font-medium text-sm hover:bg-indigo-500 px-3 py-2 rounded"
          >
            Delete Project
          </NavLink>
        </div>
      </div>

      <hr />

      <div className="mt-10 -mx-3">
        <NavLink
          to="/index"
          className="flex items-center font-medium text-sm hover:bg-indigo-500 px-3 py-2 rounded"
        >
          <svg className="fill-current h-5 w-5">
            <use xlinkHref={`${sprite}#icon-log-out`} />
          </svg>
          <span className="ml-3">Logout</span>
        </NavLink>
      </div>
    </div>
  );
}
