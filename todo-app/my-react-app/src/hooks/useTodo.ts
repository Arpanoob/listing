import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { addTodo, updateTodo as apiUpdateTodo, deleteTodo } from "../models/apiClient";
import { Todo } from "../types/todo.interface";

export function useTodo() {
    const { state, dispatch, triggerRefresh } = useContext(TodoContext);
    const createTodo = async (title: string) => {
        const newTodo = await addTodo( title);
        dispatch({ type: "ADD_TODO", payload: newTodo });
    };

    const updateTodo = async (id: string, updates: Partial<Todo>) => {
        const todo = state.todos.find(todo => todo.id === id);
        if (!todo) return;

        await apiUpdateTodo({
            id,
            title: updates.title,
            completed: updates.completed
        });

        dispatch({ type: "TOGGLE_TODO", payload: updates as Todo });
        triggerRefresh()
    };

    const removeTodo = async (id: string) => {
        await deleteTodo(id);
        dispatch({ type: "DELETE_TODO", payload: id });
    };

    return { todos: state.todos, createTodo, updateTodo, removeTodo };
}
