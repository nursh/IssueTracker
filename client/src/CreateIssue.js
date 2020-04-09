import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';


export default function CreateIssue({ history }) {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      priority: 'Low'
    },
    onSubmit: values => {
      console.log(values)
    },
    validationSchema: createIssueSchema
  });
  return (
    <div className="w-72 m-auto shadow px-8 py-10 border z-50 bg-white">
      <h2 className="text-center mb-10 font-semibold text-xl uppercase tracking-wide">
        Create Issue
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
          {formik.errors.title && formik.touched.title ? (
            <div className="text-red-500 text-sm px-4">
              {formik.errors.title}
            </div>
          ) : null}
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
            onChange={formik.handleChange}
            value={formik.values.priority}
            className="form-select mt-2 px-4 rounded bg-gray-200 border"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="shadow rounded px-4 py-3 bg-indigo-600 text-white mt-10 hover:bg-indigo-700 uppercase text-sm"
        >
          Create Issue
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

const createIssueSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().notRequired(),
  priority: Yup.string().required("Priority is required")
})
