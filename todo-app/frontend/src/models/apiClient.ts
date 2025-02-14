import axios from "axios";
import settings from "../config";
import { Todo } from "../types/todo.interface";


const axiosInstance = axios.create({
  baseURL: settings.backendUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = (data: { name: string; email: string; password: string }) =>
  axiosInstance.post("/auth/register", data);

export const loginUser = (data: { email: string; password: string }) =>
  axiosInstance.post("/auth/login", data);

export const fetchTodos = async () => {
  const response = await axiosInstance.get<Todo[]>("/todos/");
  return response.data;
};

export const addTodo = async (title: string) => {
  const response = await axiosInstance.post<Todo>("/todos", { title });
  return response.data;
};

export const updateTodo = async ( data: Partial<Todo>) => {
  const response = await axiosInstance.patch<Todo>(`/todos`, data);
  return response.data;
};

export const deleteTodo = async (id: string) => {
  return axiosInstance.delete(`/todos/${id}`);
};