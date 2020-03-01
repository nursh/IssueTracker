import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';


export default function IssueCard() {
  return (
    <li>
      <NavLink to="/project" className="block p-5 bg-white shadow rounded-md">
        <CardTop />
        <CardBottom />
      </NavLink>
    </li>
  )
}

const CardTop = () => (
  <div className="flex">
    <Avatar name="John Guarnane" round={true} size={35} className="mr-3" />
    <p className="text-sm font-medium text-gray-900 leading-snug">
      Some issue title that has to be displayed...
    </p>
  </div>
);

const CardBottom = () => (
  <div className="flex justify-between items-baseline">
    <div className="text-sm text-gray-600">
      <time dateTime="2019-09-20">Sept. 20, 2019</time>
    </div>
    <div className="mt-4">
      <span className={`inline-flex px-2 py-1 leading-tight items-center bg-red-200 rounded`}>
        <svg viewBox="0 0 8 8" fill="currentColor" className={`h-2 w-2 text-red-700`}>
          <circle  cx="4" cy="4" r="3" />
        </svg>
        <span className={`ml-2 text-sm font-medium text-red-900`}>High</span>
      </span>
    </div>
  </div>
)
