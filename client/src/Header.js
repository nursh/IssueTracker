import React from 'react'

export default function Header() {
  return (
    <div className="bg-white h-16 py-2 px-20 flex items-center justify-between border shadow">
      <h1 className="text-lg font-semibold">Issue Tracker</h1>
      <div className="text-gray-700">
        <button className="border-gray-700 border rounded px-6 py-1 focus:outline-none hover:text-white hover:bg-indigo-700">
          Sign up
        </button>
        <button className="ml-8 focus:outline-none hover:underline">
          Sign in
        </button>
      </div>
    </div>
  );
}
