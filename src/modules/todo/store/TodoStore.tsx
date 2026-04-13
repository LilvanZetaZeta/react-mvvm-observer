import { createContext, useContext, useState } from "react";

interface Todo{
    id: number;
    text: string;
}

interface TodoContextType{
    todos: Todo[];
    addTodo: (todo: Todo) => void;
    removeTodo:(id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps{
    children: React.ReactNode;
}

export const TodoProvider = ({ children }: TodoProviderProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = (todo: Todo) => {
        setTodos((prev) => [...prev, todo]);
    };

    const removeTodo = (id: number) => {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <TodoContext.Provider value = {{ todos, addTodo, removeTodo}}>
            {children}
        </TodoContext.Provider>

    );

};

export const useTodos = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error("useTodos must be used withing a TodoProvider");
    }
    return context;
};


