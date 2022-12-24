import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk the new action that will be dispatched from our component.  
// The Thunk will dispatch its own action when the response completes
// with the data from the API Call as the payload
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync',
async () => {
  const response = await fetch('http://localhost:7000/todos');
  if (response.ok) {
    const todos = await response.json();
    return {todos}
  }
});

// create a new createAsyncThunk to create a new todo on the API
export const addTodoAsync = createAsyncThunk('todos/addTodoAsyn', async(payload) => {
  const response = await fetch('http://localhost:7000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({title: payload.title})
  })

  // if response is ok return the new list of responses
  if(response.ok) {
    const todo = await response.json();
    return {todo };
  }
});

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
    },
  },
  // Specify additional reducers that our todoSlice can use.  
  extraReducers: {
    // Console when the getTodosAsync is pending and not yet fulfilled
    [getTodosAsync.pending]: (state, action) => {
      console.log('fetching data...');
    },
    // The getTodosAsync Thunk will be fullfilled when the API call has completed and dispatched the action successfully
    [getTodosAsync.fulfilled]: (state, action) => {
      // react will return our new state
      console.log('fetched data successfully');
      return action.payload.todos;
    },
    // When the action is triggered, the reducer will take the todo from the payload and push it to the current state.  
    // Redux will update the store and notify our components that something has changed
    [addTodoAsync.fulfilled]: (state, action) => {
      state.push(action.payload.todo);
    }
  }
});

// Note: todSlice.actions automatic creates actions based on our reducer names
export const { 
    addTodo,
    toggleComplete,
    deleteTodo,
 } = todoSlice.actions;

// export  reducer from todoSlice
export default todoSlice.reducer;
