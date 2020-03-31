import React from 'react';
import { NavLink } from 'react-router-dom';


export default function ProjectTable() {
  return (
    <div className="m-auto w-72">
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
          {[
            {
              title: "Mongo DB",
              owner: "Michael Forage",
              date: "September 2, 2020"
            },
            {
              title: "JavaScript",
              owner: "John Boscoe",
              date: "January 3, 2019"
            }
          ].map((project, idx) => (
            <TableRow key={idx} project={project} />
          ))}
        </tbody>
      </table>
    </div>
  );
}


function TableRow({ project }) {

  const { title, owner, date } = project;
  return (
    <tr className="hover:shadow-md hover:bg-gray-100 border-b">
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4">{owner}</td>
      <td className="px-2 py-4">{date}</td>
      <td className="px-2 py-4 uppercase text-sm font-medium text-gray-600 hover:underline">
        {/* If searching for other projects, the text should be Join Project */}
        <NavLink to="/project">View Project</NavLink>
      </td>
    </tr>
  );
}