import React from 'react';
import sprite from '../images/sprite.svg';

export default function DeleteProject() {
  return (
    <div className="w-5/12 shadow m-auto border-red-600">
      <div className="bg-red-200 text-red-700 px-6 py-3">
        <h3 className="font-semibold text-lg">Delete Project</h3>
      </div>

      <div className="px-6 py-8 flex items-start">
        <div className="text-red-600">
          <svg className="fill-current h-10 w-10">
            <use xlinkHref={`${sprite}#icon-notice`} />
          </svg>
        </div>

        <div className="ml-3">
          <p className="text-gray-600 mt-2">
            This action will permanently delete this project and all issues
            linked with it. Press delete if you wish to continue with this
            action.
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center bg-gray-100 py-3 px-6">
        <button className="font-medium text-gray-600">Cancel</button>
        <button className="ml-6 text-red-700 font-medium bg-red-200 py-1 px-6 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
