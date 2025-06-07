import React from 'react';
import Board from './components/Board';

function App() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6"> Task Board</h1>
      <Board />
    </div>
  );
}

export default App;
