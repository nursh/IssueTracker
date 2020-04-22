import React from "react";
import { connect } from "react-redux";


function JoinProject({ history }) {
  return (
    <div className="w-72 shadow m-auto border-red-600 z-50 bg-white">
      <div className="bg-green-200 text-green-700 px-6 py-3 text-center">
        <h3 className="font-semibold text-lg">Join Project </h3>
      </div>

      <div className="px-6 py-8 flex items-start">

        <div className="ml-3">
          <p className="text-gray-600 mt-2">
            You've been successfully added to the project
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center bg-gray-100 py-3 px-6">
        <button
          className="font-medium text-gray-600 focus:outline-none"
          onClick={() => history.goBack()}
        >
          Close
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  project: state.project,
});
export default connect(mapStateToProps, null)(JoinProject);
