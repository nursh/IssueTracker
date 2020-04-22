import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import { format, userInProject } from '../../utils';


export default function ProjectTable({ projects, auth, handleJoinProject, handleSelectProject, location, path }) {
  return (
    <div className="m-auto w-5/12">
      <h2 className="font-medium uppercase text-center text-2xl mt-10">Projects</h2>
      <table className="table-auto w-full mt-6">
        <thead>
          <tr className="uppercase text-gray-600 text-left text-sm">
            <th className="px-2 py-2">title</th>
            <th className="px-2 py-2">created by</th>
            <th className="px-2 py-2">created date</th>
            <th className="px-2 py-2">...</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <TableRow
              key={idx}
              project={project}
              currentUser={auth}
              handleJoinProject={handleJoinProject}
              handleSelectProject={handleSelectProject}
              location={location}
              path={path}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}


function TableRow({ project, currentUser, handleJoinProject, handleSelectProject, location, path }) {
  const { title, createdBy: { name }, createdOn } = project;
  const inProject = userInProject(currentUser.name, project);
  return (
    <tr className="hover:shadow-md hover:bg-gray-100 border-b">
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4">{_.startCase(name)}</td>
      <td className="px-2 py-4">{format(createdOn)}</td>
      <td className="px-2 py-4 uppercase text-sm font-medium text-gray-600 hover:underline">
        <NavLink
          to={{
            pathname: inProject ? "/project" : `${path}/join-project`,
            state: inProject ? null : { modal: location }
          }}
          onClick={
            inProject
              ? () => handleSelectProject(project, currentUser.token)
              : () => handleJoinProject(currentUser.token, project._id)
          }
        >
          {inProject ? `View Project` : `Join Project`}
        </NavLink>
      </td>
    </tr>
  );
}
