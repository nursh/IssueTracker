import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';


import { format } from '../../utils';
import sprite from "../../images/sprite.svg";


function ManageIssues({ url, issues }) {

  const location = useLocation();
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 border-b shadow">
        <form className="flex">
          <div>
            <label
              htmlFor="status"
              className="font-medium uppercase text-sm text-gray-700"
            >
              Status:
            </label>
            <select
              name="status"
              id="status"
              className="form-select bg-gray-200 ml-2"
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="ml-12">
            <label
              htmlFor="priority"
              className="font-medium uppercase text-sm text-gray-700"
            >
              Priority:
            </label>
            <select
              name="priority"
              id="priority"
              className="form-select bg-gray-200 ml-2"
            >
              <option value="All">All</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="ml-12">
            <label htmlFor="createdBy" className="font-medium uppercase text-sm text-gray-700">Created by:</label>
            <select name="createdBy" id="createdBy" className="form-select bg-gray-200 ml-2">
              <option value="All">All</option>
              <option value="Red Bell">Red Bell</option>
              <option value="Green Bell">Green Bell</option>
              <option value="Yellow Bell">Yellow Bell</option>
            </select>
          </div>

          <button className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded px-4 py-2 ml-12">
            <svg className="h-5 w-5 fill-current">
              <use xlinkHref={`${sprite}#icon-filter_list`} />
            </svg>
            <span className="ml-2">Apply filter</span>
          </button>

          <button className="ml-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-400" type="reset">
            Reset
          </button>
        </form>
      </div>

      <div className="mx-auto mt-10 w-2/5 md:w-4/5">
        <h2 className="font-medium uppercase text-center text-2xl">Issues</h2>
        <table className="table-auto w-full mt-6">
          <thead>
            <tr className="uppercase text-gray-600 text-sm text-left">
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Priority</th>
              <th className="px-2 py-2">Status</th>
              <th className="px-2 py-2">Created By</th>
              <th className="px-2 py-2">Created On</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, idx) => (
              <IssueRow key={idx} issue={issue} url={url} location={location} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IssueRow({ issue, url, location }) {
  const {
    title,
    priority,
    status,
    createdBy: { name },
    createdOn
  } = issue;
  return (
    <tr className="border-b hover:shadow-md hover:bg-gray-100">
      <td className="px-2 py-4">{title}</td>
      <td className="uppercase px-2 py-4">{priority}</td>
      <td className="uppercase px-2 py-4">{status}</td>
      <td className="px-2 py-4">{name}</td>
      <td className="px-2 py-4">{format(createdOn)}</td>
      <td className="px-2 py-4">
        <NavLink to={{
          pathname: `${url}/edit-issue`,
          state: { modal: location, issue }
        }}
        >
          <svg className="h-6 w-6">
            <use xlinkHref={`${sprite}#icon-edit`} />
          </svg>
        </NavLink>
      </td>
      <td className="px-2 py-4">
        <NavLink to={{
          pathname: `${url}/delete-issue`,
          state: { modal: location, issue }
        }}
        >
          <svg className="h-6 w-6">
            <use xlinkHref={`${sprite}#icon-trashcan`} />
          </svg>
        </NavLink>
      </td>
    </tr>
  );
}

const mapStateToProps = (state) => ({ issues: state.issues });
export default connect(
  mapStateToProps,
  null
)(ManageIssues);
