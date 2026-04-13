import { useTodoViewModel } from "../viewmodel/useTodoViewModel";

export default function TodoView() {
    const { todos, text, setText, createTodo, deleteTodo } = useTodoViewModel();

    return (
        <div>
            <h1>Lista de Tareas</h1>
            <input value={text} onChange={(e) => setText(e.target.value)}/>
            <button onClick={createTodo}>Agregar</button>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}
                        <button onClick={() => deleteTodo(todo.id)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}