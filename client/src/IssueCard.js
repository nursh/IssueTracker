import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import { Draggable } from 'react-beautiful-dnd';


export default function IssueCard({ issue, index }) {
  const {
    id,
    title,
    priority,
    author
  } = issue;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div className={`${index > 0 ? "mt-3" : ""}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <NavLink
            to="/project"
            className="block p-5 bg-white shadow rounded-md"
          >
            <CardTop title={title} author={author} />
            <CardBottom priority={priority} />
          </NavLink>
        </div>
      )}
    </Draggable>
  );
}

const CardTop = ({ title, author }) => (
  <div className="flex">
    <Avatar name={author} round={true} size={35} className="mr-3" />
    <p className="text-sm font-medium text-gray-900 leading-snug">
      {title}
    </p>
  </div>
);

const colors = {
  'High': 'red',
  'Medium': 'yellow',
  'Low': 'green'
};

const CardBottom = ({ priority }) => {

  const color = colors[priority];
  return (
    <div className="flex justify-between items-baseline">
      <div className="text-sm text-gray-600">
        <time dateTime="2019-09-20">Sept. 20, 2019</time>
      </div>
      <div className="mt-4">
        <span
          className={`inline-flex px-2 py-1 leading-tight items-center bg-${color}-200 rounded`}
        >
          <svg
            viewBox="0 0 8 8"
            fill="currentColor"
            className={`h-2 w-2 text-${color}-700`}
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
          <span className={`ml-2 text-sm font-medium text-${color}-900`}>
            {priority}
          </span>
        </span>
      </div>
    </div>
  );

}
