import React, { useMemo } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import IssueCard from './IssueCard'


const IssueList = ({ issues }) => {
  if (!issues && issues.length) return [];
  return (  
    issues.map((issue, idx) => <IssueCard key={issue.title} issue={issue} index={idx} />)
  )
}

export default function IssueBoard({ board, issues, idx }) {
  const { title } = board;
  const issuesList = useMemo(() => <IssueList issues={issues} />, [issues]);

  return (
    <div
      className={`py-3 flex-shrink-0 w-70 bg-gray-100 rounded-md flex flex-col ${
        idx > 0 ? "ml-5" : ""
      }`}
    >
      <h3 className="text-sm flex-shrink-0 pb-1 pt-3 px-3 font-medium text-gray-700 uppercase">
        {title}
      </h3>
      <Droppable droppableId={title}>
        {(provided, snapshot) => (
          <div className="flex-1 min-h-0 overflow-y-auto" ref={provided.innerRef} {...provided.droppableProps}>
            <div className="pt-1 pb-3 px-3">
              { issuesList }
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
