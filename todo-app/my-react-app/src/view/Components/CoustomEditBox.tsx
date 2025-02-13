import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

function CustomEditBox() {
  const [title, setTitle] = useState("");
  const { createTodo } = useTodo();

  const handleAdd = () => {
    if (title.trim()) {
      createTodo(title);
      setTitle("");
    }
  };

  return (
    <div className="flex flex-row items-center">
      <input
        className="w-[381px] h-[40px] border border-[#9E78CF] rounded-sm placeholder-[#777777] p-5 text-white"
        placeholder="Add New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div
        className="ml-[10px] flex items-center justify-center rounded-sm text-white text-[50px] bg-[#9E78CF] w-[40px] h-[40px] cursor-pointer"
        onClick={handleAdd}
      >
        <span className="mb-1">+</span>
      </div>
    </div>
  );
}

export default CustomEditBox;
