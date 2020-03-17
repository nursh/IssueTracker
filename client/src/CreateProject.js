import React from 'react'


export default function CreateProject({ history }) {
  return (
    <div className="w-72 m-auto shadow px-8 py-10 border z-50 bg-white">
      <h2 className="text-center mb-10 font-semibold text-xl uppercase tracking-wide">
        Create Project
      </h2>
      <form className="flex flex-col">
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="ml-3 font-medium uppercase text-sm text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="mt-2 py-3 px-4 rounded bg-gray-200 border"
          />
        </div>

        <div className="flex flex-col mt-6">
          <label
            htmlFor="description"
            className="ml-3 font-medium uppercase text-sm text-gray-700"
          >
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            rows={4}
            className="mt-2 py-3 px-4 rounded bg-gray-200 border"
          />
        </div>


        <button type="submit" className="shadow rounded px-4 py-3 bg-indigo-600 text-white mt-10 hover:bg-indigo-700 uppercase text-sm">
          Create Project
        </button>

        <button type="button" onClick={() => history.goBack()} className="shadow rounded px-4 py-3 border mt-4 hover:bg-gray-200 uppercase text-sm">
          Cancel
        </button>
      </form>
    </div>
  );
}
