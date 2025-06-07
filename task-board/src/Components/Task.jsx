import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Task({ task, index, updateTask, deleteTask }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-gray-200 rounded p-2 mb-2"
        >
          <div>{task.title}</div>
          <div className="space-x-2 mt-1">
            <button
              onClick={() => updateTask(task.id)}
              className="text-sm text-blue-600 hover:underline"
            >
              ✏ 
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-sm text-red-600 hover:underline"
            >
              🗑 
            </button>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Task;