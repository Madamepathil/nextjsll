import React from "react";
import { useSelector } from "react-redux";

const TotalCompleteItems = () => {
  const todos = useSelector((state) => state.todo.todos);

  const completedTodos = todos.filter((item) => item.completed === true);
  return <h4 className="mt-3">completed items: {completedTodos.length}</h4>;
};

export default TotalCompleteItems;
