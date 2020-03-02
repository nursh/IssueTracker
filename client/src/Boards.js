import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import IssueBoard from './IssueBoard';
import data from './BoardData';


export default function Boards() {
  const [boardData, setBoardData] = useState(data);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = boardData.boards[source.droppableId];
    const finish = boardData.boards[destination.droppableId];

    if (start === finish) {
      const newIssues = Array.from(start.issues);
      newIssues.splice(source.index, 1);
      newIssues.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...start,
        issues: newIssues
      };

      const newBoardData = {
        ...boardData,
        boards: {
          ...boardData.boards,
          [newBoard.title]: newBoard
        }
      };
    
      setBoardData(newBoardData);
      return;
    }

    const startIssues = Array.from(start.issues);
    startIssues.splice(source.index, 1);
    const newStart = {
      ...start,
      issues: startIssues
    }

    const finishIssues = Array.from(finish.issues);
    finishIssues.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      issues: finishIssues
    };

    const newBoardData = {
      ...boardData,
      boards: {
        ...boardData.boards,
        [newStart.title]: newStart,
        [newFinish.title]: newFinish
      }
    };
    setBoardData(newBoardData);
  };

  return (
    <div className="flex-1 bg-white flex flex-col min-w-0">
      <h2 className="font-medium text-3xl pt-2 ml-10 text-gray-700">
        Pitalo Medical Board
      </h2>
      <div className="flex-1 overflow-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <main className="p-10 inline-flex h-full overflow-hidden">
            {
              boardData.boardOrder.map((boardId, idx) => {
                const board = boardData.boards[boardId];
                const issues = board.issues.map(
                  issueId => boardData.issues[issueId]
                )
                
                return <IssueBoard key={boardId} board={board} issues={issues} idx={idx} />
              })
            }
          </main>
        </DragDropContext>
      </div>
    </div>
  );
}
