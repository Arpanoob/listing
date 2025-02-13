import TodoBlock from "./TodoBock";
import { useTodo } from "../../hooks/useTodo";

function Todos() {
  const { todos } = useTodo();

  return (
    <div className="flex flex-col w-full h-full rounded-sm p-10">
      {todos.map((todo) => (
        <TodoBlock key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default Todos;
