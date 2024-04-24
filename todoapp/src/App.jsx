import React from 'react';
import './App.css';
import Home from './Home';
import Create from './Create';

function App() {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <Create />
      <Home />
    </div>
  );
}

export default App;
