import axios from "axios";
import settings from "../config";
import { Todo } from "../types/todo.interface";


const axiosInstance = axios.create({
  baseURL: settings.backendUrl ,//|| "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

export const fetchTodos = async () => {
  const response = await axiosInstance.get<Todo[]>("/todos");
  return response.data;
};

export const addTodo = async (title: string) => {
  const response = await axiosInstance.post<Todo>("/todos", { title });
  return response.data;
};

export const updateTodo = async (id: string, data: Partial<Todo>) => {
    const response = await axiosInstance.patch<Todo>(`/todos/${id}`, data);
    return response.data;
};


export const deleteTodo = async (id: string) => {
  await axiosInstance.delete(`/todos/${id}`);
};
