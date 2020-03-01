import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import IssueBoard from './IssueBoard';

const boards = [
  { title: 'backlog' },
  { title: 'in progress' },
  { title: 'done' }
]
export default function Boards() {
  return (
    <div className="flex-1 bg-white flex flex-col min-w-0">
      <h2 className="font-medium text-3xl pt-2 ml-10 text-gray-700">
        Pitalo Medical Board
      </h2>
      <div className="flex-1 overflow-auto">
        <DragDropContext>
          <main className="p-10 inline-flex h-full overflow-hidden">
            {boards.map(({ title }, idx) => (
              <IssueBoard title={title} key={title} idx={idx} />
            ))}
          </main>
        </DragDropContext>
      </div>
    </div>
  );
}
