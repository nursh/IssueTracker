import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function EditIssue({ history, issue }) {
  const formik = useFormik({
    initialValues: {
      title: issue.title,
      description: issue.description || '',
      priority: issue.priority,
      status: issue.status
    },
    onSubmit: values => {
      console.log(Object.assign({}, values))
    },
    validationSchema: editIssueSchema
  });
  return (
    <div className="w-72 m-auto shadow px-8 py-10 border z-50 bg-white">
      <h2 className="text-center mb-10 font-semibold text-xl uppercase tracking-wide">
        Edit Issue
      </h2>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
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
            onChange={formik.handleChange}
            value={formik.values.title}
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
            className="form-textarea mt-2 py-3 px-4 rounded bg-gray-200 border"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>

        <div className="flex flex-col mt-6">
          <label
            htmlFor="priority"
            className="ml-3 font-medium uppercase text-sm text-gray-700"
          >
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            className="form-select mt-2 px-4 rounded bg-gray-200 border"
            onChange={formik.handleChange}
            value={formik.values.priority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="flex flex-col mt-6">
          <label
            htmlFor="status"
            className="ml-3 font-medium uppercase text-sm text-gray-700"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            className="form-select mt-2 px-4 rounded bg-gray-200 border"
            onChange={formik.handleChange}
            value={formik.values.status}
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          className="shadow rounded px-4 py-3 bg-indigo-600 text-white mt-10 hover:bg-indigo-700 uppercase text-sm"
        >
          Edit Issue
        </button>

        <button
          type="button"
          onClick={() => history.goBack()}
          className="shadow rounded px-4 py-3 border mt-4 hover:bg-gray-200 uppercase text-sm"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

const editIssueSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().notRequired(),
  priority: Yup.string().required(),
  status: Yup.string().required()
});