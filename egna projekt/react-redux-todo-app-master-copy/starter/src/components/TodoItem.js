import React from "react";
import { useDispatch } from "react-redux";
import {
  toggleComplete,
  deleteTodo,
  toggleTodoAsync,
  deleteAsyncTodo,
} from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const toggleCompleteTodo = (id) => {
    dispatch(toggleTodoAsync({ id: id, completed: !completed }));
  };
  const deleteTodoItem = (id) => {
    dispatch(deleteAsyncTodo({ id: id }));
  };
  return (
    <li className={`list-group-item ${completed && "list-group-item-success"}`}>
      <div className="d-flex justify-content-between">
        <span className="d-flex align-items-center">
          <input
            onChange={() => toggleCompleteTodo(id)}
            type="checkbox"
            className="mr-3"
            checked={completed}
          ></input>
          {title}
        </span>
        <button onClick={() => deleteTodoItem(id)} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
