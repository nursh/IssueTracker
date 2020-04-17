import React from 'react';
import sprite from "../../images/sprite.svg";
import { connect } from 'react-redux';


import { handleDeleteIssue } from '../../actions/issues';


function DeleteIssue({ history, issue, handleDeleteIssue, token, project }) {
  return (
    <div className="w-72 shadow m-auto border-red-600 z-50 bg-white">
      <div className="bg-red-200 text-red-700 px-6 py-3 text-center">
        <h3 className="font-semibold text-lg">Delete Issue: {issue.title} </h3>
      </div>

      <div className="px-6 py-8 flex items-start">
        <div className="text-red-600">
          <svg className="fill-current h-10 w-10">
            <use xlinkHref={`${sprite}#icon-notice`} />
          </svg>
        </div>

        <div className="ml-3">
          <p className="text-gray-600 mt-2">
            This action will permanently delete this issue. Press delete if you wish to continue with this action.
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center bg-gray-100 py-3 px-6">
        <button
          className="font-medium text-gray-600 focus:outline-none"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button className="ml-6 text-red-700 font-medium bg-red-200 py-1 px-6 rounded focus:outline-none" onClick={() => handleDeleteIssue(issue._id, project, token, history)}>
          Delete
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({ token: state.auth.token, project: state.project });
export default connect(
  mapStateToProps,
  { handleDeleteIssue }
)(DeleteIssue);
