import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import _ from 'lodash';


import { format } from '../../utils';
import sprite from "../../images/sprite.svg";
import { handleFilterIssues, handleResetIssues } from '../../actions/issues';


function ManageIssues({ url, issues, project, handleFilterIssues, filtered, filteredIssues, handleResetIssues }) {

  const location = useLocation();
  const formik = useFormik({
    initialValues: {
      status: '',
      priority: '',
      createdBy: ''
    },
    onSubmit: (values, { resetForm }) => {
      handleFilterIssues(values);
      resetForm();
    }
  });
  const issuesToDisplay = filtered ? filteredIssues : issues;
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 border-b shadow">
        <form className="flex" onSubmit={formik.handleSubmit}>
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
              onChange={formik.handleChange}
              value={formik.values.status}
            >
              <option value="All">All</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
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
              onChange={formik.handleChange}
              value={formik.values.priority}
            >
              <option value="All">All</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div className="ml-12">
            <label
              htmlFor="createdBy"
              className="font-medium uppercase text-sm text-gray-700"
            >
              Created by:
            </label>
            <select
              name="createdBy"
              id="createdBy"
              className="form-select bg-gray-200 ml-2"
              onChange={formik.handleChange}
              value={formik.values.createdBy}
            >
              <option value="All">All</option>
              <option value={project.createdBy.id}>
                {_.startCase(project.createdBy.name)}
              </option>
              {project.team.map((member) => (
                <option value={member.id} key={member.id}>
                  {_.startCase(member.name)}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center bg-indigo-500 hover:bg-indigo-600 text-white rounded px-4 py-2 ml-12"
          >
            <svg className="h-5 w-5 fill-current">
              <use xlinkHref={`${sprite}#icon-filter_list`} />
            </svg>
            <span className="ml-2">Apply filter</span>
          </button>

          <button
            className="ml-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-400"
            type="reset"
            onClick={handleResetIssues}
          >
            Reset
          </button>
        </form>
      </div>

      <div className="mx-auto mt-10 lg:w-2/5 w-3/5">
        <h2 className="font-medium uppercase text-center text-2xl">{`${project.title} - Issues`}</h2>
        {!issuesToDisplay ? (
          <>
            <h2 className="text-lg uppercase text-center mt-10">
              {filtered
                ? "No issues match the filter criteria"
                : "There are currently no issues in the project."}
            </h2>
            {!filtered && (
              <NavLink
                to={{
                  pathname: `${url}/create-issue`,
                  state: { modal: location },
                }}
                className="m-auto w-2/5  mt-10 rounded px-1 py-4 bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700"
              >
                <svg className="fill-current h-3 w-3">
                  <use xlinkHref={`${sprite}#icon-plus`} />
                </svg>
                <span className="uppercase tracking-wide ml-3 font-medium text-sm">
                  Create Issue
                </span>
              </NavLink>
            )}
          </>
        ) : (
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
              {issuesToDisplay.map((issue, idx) => (
                <IssueRow
                  key={idx}
                  issue={issue}
                  url={url}
                  location={location}
                />
              ))}
            </tbody>
          </table>
        )}
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
      <td className="px-2 py-4">{_.startCase(name)}</td>
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

const mapStateToProps = (state) => {
  const issueState = state.issues ? {
    ...state.issues
  } : {
    issues: null,
    filtered: null,
    filteredIssues: null
  };
  return {
    ...issueState,
    project: state.project
  }
}
export default connect(
  mapStateToProps,
  { handleFilterIssues, handleResetIssues }
)(ManageIssues);
