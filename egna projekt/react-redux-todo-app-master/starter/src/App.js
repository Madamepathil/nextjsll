import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import TotalCompleteItems from "./components/TotalCompleteItems";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "./redux/todoSlice";

const App = () => {
  const isLoading = useSelector((state) => state.todo.isLoading);
  const hasError = useSelector((state) => state.todo.hasError);

  return (
    <div className="container bg-white p-4 mt-5">
      <div>{isLoading && <p>fetching data...</p>}</div>
      {!isLoading && hasError && <p>problem fetching data....</p>}

      <h1>My Todo List</h1>
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default App;
