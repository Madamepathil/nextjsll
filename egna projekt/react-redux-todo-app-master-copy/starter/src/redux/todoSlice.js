import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    /*   { id: 1, title: "hej", completed: false },
    { id: 2, title: "hej2", completed: false },
    { id: 3, title: "hej3", completed: true }, */
  ],
};
export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async (payload, thunkApi) => {
    try {
      const response = await fetch("http://localhost:7000/todos");
      if (response.ok) {
        const todos = await response.json();
        return todos;
      }
      throw new Error("problem fetching data");
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodo",
  async (payload, thunkApi) => {
    const response = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: payload.title }),
    });

    try {
      if (response.ok) {
        const todo = await response.json();
        return todo;
      }
    } catch (error) {}
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodo",
  async (payload, thunkApi) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: payload.completed }),
    });

    try {
      if (response.ok) {
        const todo = await response.json();

        return todo;
      }
    } catch (error) {}
  }
);

export const deleteAsyncTodo = createAsyncThunk(
  "todos/delete",
  async (payload, thunkApi) => {
    const response = await fetch(`http://localhost:7000/todos/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const todos = await response.json();
        return todos;
      }
    } catch (error) {}
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const id = action.payload.id;
      //hitta objektet

      const obj = state.todos.find((item) => item.id == id);
      obj.completed = !obj.completed;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload.id);
    },
  },

  extraReducers: {
    //GET TODOS
    [getTodosAsync.pending]: (state, action) => {
      console.log("fetching data");
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      console.log(action);
      state.todos = action.payload;
      //return action.payload.todos;
    },
    [getTodosAsync.rejected]: (state, action) => {
      /*       state.isLoading = false;
      state.hasError = true; */
      console.log(action.payload);
    },

    //ADD TODO
    [addTodoAsync.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },

    //TOGGLE
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload.id;
      const obj = state.todos.find((item) => item.id == id);
      obj.completed = !obj.completed;
    },

    //DELETE
    [deleteAsyncTodo.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
