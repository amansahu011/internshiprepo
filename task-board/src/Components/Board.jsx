import React, { useEffect, useState } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { db } from "../firebase"; 
import { ref, set, onValue, onDisconnect } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

function Board() {
  const [columns, setColumns] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userId = uuidv4(); // its  generate unique user ID

  
  useEffect(() => {
    const columnsRef = ref(db, 'columns');
    onValue(columnsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setColumns(data);
      }
    });
  }, []);

  //  Realtime User Presence Logic
  useEffect(() => {
    const userRef = ref(db, `presence/${userId}`); 
    set(userRef, true); // mark user as online
    onDisconnect(userRef).remove(); // remove user on disconnect

    const presenceRef = ref(db, 'presence');
    onValue(presenceRef, (snapshot) => {
      const data = snapshot.val();
      const users = data ? Object.keys(data) : [];
      setOnlineUsers(users); // live count
    });
  }, []);

  // Save updated board to Firebase
  const updateFirebase = (newColumns) => {
    set(ref(db, 'columns'), newColumns);
  };

  const addColumn = () => {
    const title = prompt("Enter column title:");
    if (title) {
      const newColumn = {
        id: Date.now().toString(),
        title,
        tasks: []
      };
      const newState = [...columns, newColumn];
      setColumns(newState);
      updateFirebase(newState);
    }
  };

  const updateColumn = (id, newTitle) => {
    const updated = columns.map(col =>
      col.id === id ? { ...col, title: newTitle } : col
    );
    setColumns(updated);
    updateFirebase(updated);
  };

  const deleteColumn = (id) => {
    const updated = columns.filter(col => col.id !== id);
    setColumns(updated);
    updateFirebase(updated);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = columns.find(col => col.id === source.droppableId);
    const destCol = columns.find(col => col.id === destination.droppableId);
    const sourceTasks = [...sourceCol.tasks];
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const updated = columns.map(col =>
        col.id === sourceCol.id ? { ...col, tasks: sourceTasks } : col
      );
      setColumns(updated);
      updateFirebase(updated);
    } else {
      const destTasks = destCol.tasks ? [...destCol.tasks] : []; // ✅ FIX for undefined error
      destTasks.splice(destination.index, 0, movedTask);
      const updated = columns.map(col => {
        if (col.id === sourceCol.id) return { ...col, tasks: sourceTasks };
        if (col.id === destCol.id) return { ...col, tasks: destTasks };
        return col;
      });
      setColumns(updated);
      updateFirebase(updated);
    }
  };

  return (
    <div>
      {/* Show real-time online user count on screen */}
      <div className="mb-4 text-sm text-green-700 font-semibold">
        🟢 Online Users: {onlineUsers.length}
      </div>

      <button
        onClick={addColumn}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        ➕ Create Column
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap gap-4">
          {columns.map(col => (
            <Column
              key={col.id}
              column={col}
              columns={columns}
              setColumns={setColumns}
              updateColumn={updateColumn}
              deleteColumn={deleteColumn}
              updateFirebase={updateFirebase}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
