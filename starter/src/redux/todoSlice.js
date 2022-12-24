import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  // initial state in store
  initialState: [
    { id: 1, title: "todo1", completed: false },
    { id: 2, title: "todo2", completed: false },
    { id: 3, title: "todo3", completed: true },
  ],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        // All data on action is placed on the payload
        title: action.payload.title,
        completed: false,
      };

      // add a new Todo
      state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      //find the index in the array based on the id
      const index = state.findIndex((todo) => todo.id === action.payload.id);

      // update the completed property of the given todo:
      state[index].completed = action.payload.completed;
    },
    // Filter out the todo with matchin id
    deleteTodo: (state, action) => {
        // compare the tod id with the id of the action payload
        return state.filter((todo) => todo.id !== action.payload.id);
    }
  },
});

// Note: todSlice.actions automatic creates actions based on our reducer names
export const { 
    addTodo,
    toggleComplete,
    deleteTodo,
 } = todoSlice.actions;

// export  reducer from todoSlice
export default todoSlice.reducer;
