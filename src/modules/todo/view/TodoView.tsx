import { useTodoViewModel } from "../viewmodel/useTodoViewModel";

export default function TodoView() {
    const {
        todos,
        isLoading,
        isFetching,
        isError,
        refetch,
        isModalOpen,
        text,
        setText,
        openCreateModal,
        openEditModal,
        closeModal,
        saveTodo,
        isSaving,
        isEditMode,
        deleteTodo,
        deletingTodoId,
    } = useTodoViewModel();

    return (
        <div className="todo-page">
            <div className="todo-header">
                <h1>Lista de tareas</h1>
                <button type="button" onClick={openCreateModal}>
                    Nueva tarea
                </button>
            </div>

            {isLoading ? <p>Cargando tareas...</p>: null}

            {isError ? (
                <div>
                    <p>Error al cargar tareas.</p>
                    <button type="button" onClick={refetch}>
                        Reintentar
                    </button>
                </div>
            ) : null}

            {!isLoading && !isError ? (
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <span>{todo.text}</span>
                            <div className="todo-item-actions">
                                <button type="button" onClick={() => openEditModal(todo)}>
                                    Editar
                                </button>
                                <button type="button" onClick={() => deleteTodo(todo.id)} disabled={deletingTodoId === todo.id}>
                                    {deletingTodoId === todo.id ? "Eliminando..." : "Eliminar"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}

            {isFetching && !isLoading ? <p>Actualizando...</p> : null}

            {isModalOpen ? (
                <div className="todo-modal-backdrop" role="presentation">
                    <div className="todo-modal" role="dialog" aria-modal="true">
                        <h2>{isEditMode ? "Actualizar tarea" : "Crear tarea"}</h2>
                        <input placeholder="Escribe una tarea" value={text} onChange={(e) => setText(e.target.value)}
                        />

                        <div className="todo-modal-actions">
                            <button type="button" onClick={closeModal} disabled={isSaving}>
                                Cancelar
                            </button>
                            <button type="button" onClick={saveTodo} disabled={isSaving}>
                                {isSaving
                                ? "Guardando..."
                                : isEditMode
                                    ? "Actualizar"
                                    : "Guardar"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null }
        </div>
    );
}