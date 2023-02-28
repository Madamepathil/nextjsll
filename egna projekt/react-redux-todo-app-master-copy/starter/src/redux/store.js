import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

//kmr innehålla alla våra olika reducers som vi skapar
export default configureStore({
  reducer: { todos: todoSlice },
});
