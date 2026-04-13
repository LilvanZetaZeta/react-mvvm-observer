import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "../todoSlice";
import {todoService} from "../service/todoService";

interface Todo {
    id: string;
    text: string;
}

interface TodoState {
    todos: Todo[];
}

interface RootState {
    todo: TodoState;
}

export const useTodoViewModel = () => {
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todo.todos);

    const [text, setText] = useState("");

    const createTodo = () => {
        if (!text) return;

        const newTodoRaw = todoService.create(text);
        const newTodo = { ...newTodoRaw, id: String(newTodoRaw.id) };
        dispatch(addTodo(newTodo));
        setText("");
    };

    const deleteTodo = (id: string) => {
        dispatch(removeTodo(id));
    };

    return {
        todos,
        text,
        setText,
        createTodo,
        deleteTodo,
    };
};