import React from "react";

import "./todo-list-item.css";

const TodoListItem = ({ label, important = false }) => {
  const spanStyle = {
    color: important ? "tomato" : "black"
  };
  return (
    <span className="todo-list-item" style={spanStyle}>
      {label}
    </span>
  );
};

export default TodoListItem;
