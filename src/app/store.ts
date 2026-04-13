import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../modules/todo/todoSlice";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});