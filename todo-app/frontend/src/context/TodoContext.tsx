import {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { fetchTodos } from "../models/apiClient";
import { Todo } from "../types/todo.interface";
import { useAuth } from "./AuthContext"; // Import AuthContext

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = { todos: [] };

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
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload.completed }
            : todo
        ),
      };
    default:
      return state;
  }
};

interface TodoContextType {
  state: TodoState;
  dispatch: React.Dispatch<Action>;
  triggerRefresh: () => void;
}

export const TodoContext = createContext<TodoContextType>({
  state: initialState,
  dispatch: () => {},
  triggerRefresh: () => {},
});

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [trigger, setTrigger] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTodos().then((data) =>
        dispatch({ type: "SET_TODOS", payload: data })
      );
    }
  }, [user, trigger, token]);

  const triggerRefresh = () => setTrigger((prev) => !prev);

  return (
    <TodoContext.Provider value={{ state, dispatch, triggerRefresh }}>
      {children}
    </TodoContext.Provider>
  );
};
