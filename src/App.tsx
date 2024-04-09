import React from 'react';
import './App.scss';
import TodoList from './TodoList';

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
};

export default App;
