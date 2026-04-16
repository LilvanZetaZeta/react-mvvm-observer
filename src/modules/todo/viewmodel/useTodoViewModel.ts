import { useState } from "react";
import {
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useGetTodosQuery,
    useUpdateTodoMutation,
} from "../service/todoService";
import type { Todo } from "../model/Todo";

export const useTodoViewModel = () => {
  const {
    data: todos = [],
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetTodosQuery();

  const [createTodoMutation, { isLoading: isCreating }] =
    useCreateTodoMutation();

  const [updateTodoMutation, { isLoading: isUpdating }] =
    useUpdateTodoMutation();

  const [deleteTodoMutation, { isLoading: isDeleting }] =
    useDeleteTodoMutation();

  const [text, setText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);

  const openCreateModal = () => {
    setEditingTodoId(null);
    setText("");
    setIsModalOpen(true);
  };

  const openEditModal = (todo: Todo) => {
    setEditingTodoId(todo.id);
    setText(todo.text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTodoId(null);
    setText("");
  };

  const saveTodo = async () => {
    if (!text.trim()) return;

    if (editingTodoId === null) {
      await createTodoMutation({ text: text.trim() }).unwrap();
    } else {
      await updateTodoMutation({
        id: editingTodoId,
        payload: { text: text.trim() },
      }).unwrap();
    }
    closeModal();
  };

  const deleteTodo = async (id: number) => {
    try {
      setDeletingTodoId(id);
      await deleteTodoMutation(id).unwrap();
    } finally {
      setDeletingTodoId(null);
    }
  };

  const isSaving = isCreating || isUpdating;
  const isEditMode = editingTodoId != null;

  return {
    todos,
    isLoading,
    isFetching,
    isError,
    error,
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
    isDeleting,
    deletingTodoId,
  };
};