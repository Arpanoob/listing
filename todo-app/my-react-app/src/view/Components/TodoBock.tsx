import { useState } from "react";
import Done from "../../assets/Vector.svg";
import Delete from "../../assets/TrashSimple.svg";
import Edit from "../../assets/edit.svg";
import { Todo } from "../../types/todo.interface";
import { useTodo } from "../../hooks/useTodo";

function TodoBlock({ todo }: { todo: Todo }) {
  const { updateTodo, removeTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleSave = () => {
    if (newTitle.trim() && newTitle !== todo.title) {
      updateTodo(todo.id, { title: newTitle, completed: todo.completed });
    }
    setIsEditing(false);
  };

  const handleAction = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const action = target.dataset.action;

    if (action === "toggle") {
      updateTodo(todo.id, { title: todo.title, completed: !todo.completed });
    } else if (action === "edit") {
      setIsEditing(true);
    } else if (action === "delete") {
      removeTodo(todo.id);
    }
  };

  return (
    <div
      className="rounded-sm p-10 bg-[#15101C] text-white flex justify-between"
      onClick={handleAction}
    >
      {isEditing ? (
        <input
          className="bg-transparent border-b border-white focus:outline-none"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
        />
      ) : (
        <span
          className={todo.completed ? "line-through text-gray-400" : ""}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      <div className="flex gap-2">
        <img src={Done} width={30} data-action="toggle" />
        <img src={Edit} width={30} data-action="edit" />
        <img src={Delete} data-action="delete" />
      </div>
    </div>
  );
}

export default TodoBlock;
