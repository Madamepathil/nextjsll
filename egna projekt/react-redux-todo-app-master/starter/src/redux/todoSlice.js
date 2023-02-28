import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (payload, thunkApi) => {
    const response = await fetch("http://localhost:7000/todos");

    try {
      const todos = await response.json();
      return { todos };
    } catch (error) {
      return thunkApi.rejectWithValue("problem fetching data");
    }
  }
);

export const addTodo = createAsyncThunk("todos/addTodo", async (payload) => {
  const response = await fetch("http://localhost:7000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: payload.title }),
  });

  if (response.ok) {
    const todo = await response.json();
    console.log(todo);
    return { todo };
  }
});

export const toggleCompleteAsync = createAsyncThunk(
  "todos/toggleComplete",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: payload.completed }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, completed: todo.completed };
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (payload) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const todo = await response.json();
      return todo;
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  /* : [
      { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true }, 
  ], */
  initialState: {
    todos: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleComplete(state, action) {
      const todoItem = state.todos.find(
        (item) => item.id === action.payload.id
      );
      todoItem.completed = !todoItem.completed;
    },

    deleteTodo(state, action) {
      return state.todos.filter((item) => item.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodos.pending]: (state, action) => {
      state.isLoading = true;
      console.log("fetching data");
    },
    [getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      //return action.payload.todos;
      state.todos = action.payload.todos;
    },
    [getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
      console.log(action.payload);
    },
    [addTodo.fulfilled]: (state, action) => {
      state.todos.push(action.payload.todo);
    },
    [toggleCompleteAsync.fulfilled]: (state, action) => {
      const todoItem = state.todos.find(
        (item) => item.id === action.payload.id
      );
      todoItem.completed = action.payload.completed;
    },
    [deleteTodo.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;
