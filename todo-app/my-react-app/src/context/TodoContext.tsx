import { createContext, useReducer, ReactNode, useEffect } from "react";
import { fetchTodos } from "../models/apiClient";
import { Todo } from "../types/todo.interface";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

type Action =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: Todo };

const todoReducer = (state: TodoState, action: Action): TodoState => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_TODO": {
      console.log("qqqqqqqqqqqqqqqqq : ", action.payload.title);
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                completed: action.payload.completed,
                title: action.payload.title,
              }
            : todo
        ),
      };
    }
    default:
      return state;
  }
};

export const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    console.log("logging");
    fetchTodos().then((data) => dispatch({ type: "SET_TODOS", payload: data }));
  }, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
