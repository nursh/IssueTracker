import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';


import google from '../../images/google.png';
import sprite from '../../images/sprite.svg';
import { handleLocalSignin } from '../../actions/auth'; 

function SignIn(props) {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      const authArgs = Object.assign({}, values, { history });
      props.handleLocalSignin(authArgs)
    },
    validationSchema: signinSchema
  });

  return (
    <>
      <div className="mt-12 max-w-lg m-auto bg-white shadow-lg rounded px-8 py-10 border">
        <h2 className="text-center mb-6 font-semibold text-3xl">Sign in</h2>
        <div className="flex flex-col">
          <a
            className=" border rounded flex items-center shadow px-4 py-3 bg-white flex-grow justify-center focus:outline-none"
            href="/auth/google"
          >
            <img src={google} alt="google" className="h-8 w-8" />
            <span className="ml-4 ">Sign in with Google</span>
          </a>
          <a
            className=" border rounded flex items-center shadow mt-6 px-4 py-3 bg-white justify-center focus:outline-none"
            href="/auth/github"
          >
            <svg className="h-8 w-8">
              <use xlinkHref={`${sprite}#icon-github`} />
            </svg>
            <span className="ml-4">Sign in with GitHub</span>
          </a>
        </div>

        <p className="text-center my-8 text-lg font-semibold">
          Or Sign in with Email
        </p>

        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          {
            props.error && (
              <div className="text-red-500 text-center font-semibold">
                {props.error}
              </div>
            )
          }
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="ml-3 font-medium uppercase text-sm text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
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
            Sign in
          </button>
        </form>
      </div>

      <div className="mt-10 max-w-lg m-auto bg-gray-300 rounded text-center py-4">
        Don't have an account?
        <NavLink
          to="/index/signup"
          className="ml-3 font-semibold hover:underline"
        >
          Sign up
        </NavLink>
      </div>
    </>
  );
}

const signinSchema = Yup.object().shape({
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

const mapStateToProps = state => ({ error: state.error });
export default connect(
  mapStateToProps,
  { handleLocalSignin }
)(SignIn);
