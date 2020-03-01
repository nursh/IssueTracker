import React from 'react'
import IssueCard from './IssueCard'


export default function IssueBoard({ title, idx }) {
  return (
    <div className={`py-3 flex-shrink-0 w-70 bg-gray-100 rounded-md flex flex-col ${idx > 0 ? 'ml-5' : ''}`}>
      <h3 className="text-sm flex-shrink-0 pb-1 pt-3 px-3 font-medium text-gray-700 uppercase">{title}</h3>
      <div className="flex-1 min-h-0 overflow-y-auto">
        <ul className="pt-1 pb-3 px-3">
          <IssueCard />
        </ul>
      </div>
    </div>
  )
}
