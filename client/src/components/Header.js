import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import { useFormik } from 'formik';


import { handleLogout } from '../actions/auth';
import { handleSearchProjects, handleFetchProjects } from '../actions/projects';
import sprite from "../images/sprite.svg";

function Header(props) {
  const { url, name } = props;

  return (
    <div className="bg-white shadow px-10">
      <div className="max-w-screen-xl h-16 flex items-center justify-between m-auto py-2">
        <h1 className="text-lg font-semibold uppercase tracking-wider">Issue Tracker</h1>
        <RightHeader
          url={url}
          handleLogout={props.handleLogout}
          name={name}
          auth={props.auth}
          handleSearchProjects={props.handleSearchProjects}
          handleFetchProjects={props.handleFetchProjects}
        />
      </div>
    </div>
  );
}


function RightHeader({ url, handleLogout, name, handleSearchProjects, auth, handleFetchProjects }) {
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (value) => {
      handleSearchProjects(value.search, auth.token);
    },
  });
  if (url === '/index') {
    return (
      <div>
        <NavLink
          to={`${url}/signup`}
          className="text-indigo-600 border-indigo-600 border rounded px-6 py-2 focus:outline-none hover:text-white hover:bg-indigo-600"
        >
          Sign up
        </NavLink>
        <NavLink
          to={`${url}/signin`}
          className="ml-8 focus:outline-none hover:underline"
        >
          Sign in
        </NavLink>
      </div>
    );
  }


  return (
    <>
      <div className="flex items-center">
        <div className="relative ml-3 w-70">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-600">
            <svg className="fill-current h-5 w-5">
              <use xlinkHref={`${sprite}#icon-search`} />
            </svg>
          </span>
          <form onSubmit={formik.handleSubmit}>
            <input
              id="search"
              name="search"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.search}
              placeholder="Search for projects by author or title..."
              className="block w-full outline-none rounded-l-md border border-gray-400 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-600"
            />
          </form>
        </div>
      </div>
      <div className="flex items-center ">
        <NavLink
          to="/projects"
          className="hover:underline font-medium uppercase text-sm"
          onClick={() => handleFetchProjects(auth.token)}
        >
          My Projects
        </NavLink>
        <div className="ml-10 flex items-baseline">
          <Avatar name={name} round={true} size={35} color="#8175D8" />
          <span
            className="ml-2 font-medium uppercase text-sm"
          >
            {name}
          </span>
        </div>
        <NavLink
          to="/index"
          className="hover:underline ml-10 flex items-center text-gray-700"
          onClick={handleLogout}
        >
          <svg className="fill-current h-5 w-5">
            <use xlinkHref={`${sprite}#icon-log-out`} />
          </svg>
          <span className="ml-1 font-medium uppercase text-sm">Log out</span>
        </NavLink>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({ auth: state.auth })
export default connect(
  mapStateToProps,
  { handleLogout, handleSearchProjects, handleFetchProjects }
)(Header);