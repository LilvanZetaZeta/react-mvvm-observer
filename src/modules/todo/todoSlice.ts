import { createSlice } from "@reduxjs/toolkit";

interface Todo {
    id: string;
    text: string;
}

interface TodoState{
    todos: Todo[];
}

const initialState: TodoState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: { payload: Todo}) => {
            state.todos.push(action.payload);
        },
        removeTodo: (state, action: { payload: string}) =>{
            state.todos = state.todos.filter((t) => t.id !== action.payload);
        },
    },
});

export const {addTodo, removeTodo } = todoSlice.actions;
export default todoSlice.reducer;