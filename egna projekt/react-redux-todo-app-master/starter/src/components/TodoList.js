import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/todoSlice";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useSelector((state) => state.todo.todos);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </ul>
  );
};

export default TodoList;
