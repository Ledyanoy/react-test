import React from "react";
import ReactDOM from "react-dom";

import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";

import "./index.css";

const todoData = [
  { label: "Drink Cofee", important: false, id: 1 },
  { label: "Make Awesome App", important: true, id: 2 },
  { label: "Have a lunch", important: false, id: 3 }
];

const App = () => {
  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <SearchPanel />
      <TodoList todos={todoData} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
