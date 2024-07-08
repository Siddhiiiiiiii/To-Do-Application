import React from 'react';
import './styles/App.css';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <main>
       <TodoList/>
      </main>
    </div>
  );
}

export default App;
