import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import google from "../images/google.png";
import sprite from "../images/sprite.svg";
import { handleLocalSignup } from '../actions/auth';

function SignUp(props) {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    onSubmit: values => {
      const signUpArgs = Object.assign({}, values, { history });
      props.handleLocalSignup(signUpArgs);
    },
    validationSchema: signupSchema
  });

  return (
    <>
      <div className="mt-10 max-w-lg m-auto bg-white shadow-lg rounded px-8 py-10 border">
        <h2 className="text-center mb-6 font-semibold text-3xl">Sign up</h2>
        <div className="flex flex-col">
          <button className=" border rounded flex items-center shadow px-4 py-3 bg-white flex-grow justify-center focus:outline-none">
            <img src={google} alt="google" className="h-8 w-8" />
            <span className="ml-4">Sign up with Google</span>
          </button>
          <button className=" border rounded flex items-center shadow mt-6 px-4 py-3 bg-white justify-center focus:outline-none">
            <svg className="h-8 w-8">
              <use xlinkHref={`${sprite}#icon-github`} />
            </svg>
            <span className="ml-4 ">Sign up with GitHub</span>
          </button>
        </div>

        <p className="text-center my-8 text-lg font-semibold">
          Or Sign up with Email
        </p>

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          {props.error && (
            <div className="text-red-500 text-center font-semibold">
              {props.error}
            </div>
          )}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-2 py-3 px-4 rounded bg-gray-200 border"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name ? (
              <div className="text-red-500 text-sm px-4">
                {formik.errors.name}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col mt-6">
            <label
              htmlFor="email"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-2 py-3 px-4 rounded bg-gray-200 border"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500 text-sm px-4">
                {formik.errors.email}
              </div>
            ) : null}
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
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="text-red-500 text-sm px-4">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <button
            className="shadow rounded px-4 py-3 bg-indigo-600 text-white mt-10 uppercase text-sm"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>

      <div className="mt-10 max-w-lg m-auto bg-gray-300 rounded text-center py-4">
        Already have an account?
        <NavLink
          to="/index/signin"
          className="ml-3 font-semibold hover:underline"
        >
          Sign in
        </NavLink>
      </div>
    </>
  );
}

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      `Password must contain at least 8 characters,
       one digit,
       uppercase and lowercase letters.`
    )
    .required("Password is required"),
});


const mapStateToProps = state => ({ error: state.error })
export default connect(
  mapStateToProps,
  { handleLocalSignup }
)(SignUp);
