import TodoBlock from "./TodoBock";
import { useTodo } from "../../hooks/useTodo";

function Todos() {
  const { todos } = useTodo();

  return (
    <div className="flex m-10 flex-col w-full h-full rounded-sm p-10 overflow-y-auto  no-scrollbar">
      {todos &&
        todos.length > 0 &&
        todos.map((todo) => (
          <TodoBlock key={todo.id + todo.completed} todo={todo} />
        ))}
    </div>
  );
}

export default Todos;
