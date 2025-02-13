import { TodoProvider } from "./context/TodoContext";
import TodoList from "./view/Pages/TodoList";

function App() {
  return (
    <>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </>
  );
}

export default App;
