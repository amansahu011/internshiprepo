import React from 'react';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

function Column({ column, columns, setColumns, updateColumn, deleteColumn, updateFirebase }) {
  const addTask = () => {
    const title = prompt("Enter task title:");
    if (title) {
      const newTask = {
        id: Date.now().toString(),
        title
      };
      const updatedTasks = [...(column.tasks || []), newTask];
      updateTasksInBoard(updatedTasks);
    }
  };

  const updateTask = (taskId) => {
    const newTitle = prompt("Update task title:");
    if (newTitle) {
      const updatedTasks = (column.tasks || []).map(t =>
        t.id === taskId ? { ...t, title: newTitle } : t
      );
      updateTasksInBoard(updatedTasks);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = (column.tasks || []).filter(t => t.id !== taskId);
    updateTasksInBoard(updatedTasks);
  };

  const updateTasksInBoard = (updatedTasks) => {
    const updatedColumns = columns.map(col =>
      col.id === column.id ? { ...col, tasks: updatedTasks } : col
    );
    setColumns(updatedColumns);
    updateFirebase(updatedColumns);
  };

  return (
    <div className="bg-white p-4 rounded shadow w-64">
      <h3 className="text-xl font-semibold mb-2">{column.title}</h3>

      <div className="space-x-2 mb-4">
        <button
          onClick={() => {
            const newTitle = prompt("Update column title:");
            if (newTitle) updateColumn(column.id, newTitle);
          }}
          className="text-blue-500 hover:underline"
        >
          ✏ 
        </button>
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-500 hover:underline"
        >
          🗑 
        </button>
      </div>

      <button
        onClick={addTask}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mb-2"
      >
        ➕ Add Task
      </button>

      {
        
      }
      <Droppable 
        droppableId={column.id} 
        isDropDisabled={false} 
        isCombineEnabled={false} 
        ignoreContainerClipping={false} 
      >
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[50px]"
          >
            {(column?.tasks || []).map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}

export default Column;
