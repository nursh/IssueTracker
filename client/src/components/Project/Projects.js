import React, { useEffect } from 'react'
import Header from '../Header'
import { NavLink, useLocation, Route, useRouteMatch } from "react-router-dom";
import { connect } from 'react-redux';
import * as _ from 'lodash';

import { ReactComponent as KBoard } from '../../images/board.svg';
import sprite from '../../images/sprite.svg';
import CreateProject from './CreateProject';
import Modal from '../../Modals/useModal';
import ProjectTable from './ProjectTable';
import { handleFetchProjects } from '../../actions/projects';
import { handleJoinProject, handleSelectProject } from '../../actions/project';


function Projects({ auth, projects, handleFetchProjects, handleJoinProject, handleSelectProject, search }) {
  const { path } = useRouteMatch();
  const location = useLocation();

  const modal = location.state && location.state.modal;

  useEffect(() => {
    handleFetchProjects(auth.token)
  }, [handleFetchProjects, auth]);

  return (
    <>
      {modal && (
        <Route to={`${path}/create-project`}>
          <Modal UI={CreateProject} />
        </Route>
      )}

      <Header name={auth.name} />
      <Sub
        projects={projects}
        path={path}
        location={location}
        auth={auth}
        handleJoinProject={handleJoinProject}
        handleSelectProject={handleSelectProject}
        search={search}  
      />
    </>
  );
}

function EmptyProjects({ path, location }) {
   return (
     <>
       <div className="m-auto max-w-6xl">
         <div className="m-auto w-2/4">
           <KBoard className="h-72 w-72" />
         </div>

         <h2 className="text-4xl font-medium text-gray-700 text-center">
           Create a new project
         </h2>
         <NavLink
           to={{
             pathname: `${path}/create-project`,
             state: { modal: location }
           }}
           className="m-auto w-1/6  mt-4 rounded px-1 py-4 bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700"
         >
           <svg className="fill-current h-3 w-3">
             <use xlinkHref={`${sprite}#icon-plus`} />
           </svg>
           <span className="uppercase tracking-wide ml-3 font-medium text-sm">
             Create Project
           </span>
         </NavLink>
       </div>
     </>
   );
}

function Sub({ projects, path, location, auth, handleJoinProject, handleSelectProject, search }) {
  if (!_.isEmpty(projects)) {
    return (
      <>
        <ProjectTable projects={projects} auth={auth} handleJoinProject={handleJoinProject} handleSelectProject={handleSelectProject} />
        <NavLink
          to={{
            pathname: `${path}/create-project`,
            state: { modal: location }
          }}
          className="m-auto mt-10 w-48 rounded px-1 py-4 bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700"
        >
          <svg className="fill-current h-3 w-3">
            <use xlinkHref={`${sprite}#icon-plus`} />
          </svg>
          <span className="uppercase tracking-wide ml-3 font-medium text-sm">
            Create Project
          </span>
        </NavLink>
      </>
    );
  } else if  (search === false && _.isEmpty(projects)) {
    return (
      <div className="text-center mt-20"> 
        <h2 className="font-medium text-2xl text-gray-800">No Projects were found.</h2>
      </div>
    );
  }
  return <EmptyProjects path={path} location={location} />
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  projects: state.projects,
  search: state.search
});

export default connect(
  mapStateToProps,
  { handleFetchProjects, handleJoinProject, handleSelectProject }
)(Projects);
