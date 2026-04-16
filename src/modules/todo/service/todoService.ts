import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { CreateTodoDto, Todo } from "../model/Todo";

const API_URL = "https://spring-boot-design-patterns.onrender.com";

export const todoApi = createApi({
    reducerPath: "todoApi",
    baseQuery: fetchBaseQuery ({ baseUrl: API_URL }),
    tagTypes: ["Todo"],
    endpoints: (builder) => ({
        getTodos: builder.query<Todo[], void>({
            query: () => "/todos",
            providesTags: (result) =>
                result
            ? [
                ...result.map((todo) => ({ type: "Todo" as const, id: todo.id})),
                { type: "Todo" as const, id: "LIST" },
            ]
        :   [{ type: "Todo" as const, id: "LIST"}],
        }),
        createTodo: builder.mutation<Todo, CreateTodoDto>({
            query: (newTodo) => ({
                url: "/todos",
                method: "POST",
                body: newTodo,
            }),
            invalidatesTags: [{ type: "Todo", id: "LIST"}],
        }),
        updateTodo: builder.mutation<Todo, { id: number; payload: CreateTodoDto } > ({
            query: ({ id, payload }) => ({
                url: "/todos/${id}",
                method: "PUT",
                body: payload,
            }),
            invalidatesTags: (_result, _error, arg) => [
                { type: "Todo", id: arg.id },
                { type: "Todo", id: "LIST" },
            ],
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: "/todos/${id}",
                method: "DELETE",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Todo", id},
                { type: "Todo", id: "LIST"},
            ],
        }),
    }),
});

export const{
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todoApi;