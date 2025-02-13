import CoustomEditBox from "./CoustomEditBox";
import Todos from "./Todos";

function TodoCard() {
  return (
    <div className="flex flex-col items-center w-[583px] h-[758px] bg-[#1D1825] p-4">
      <CoustomEditBox />
      <Todos />
    </div>
  );
}

export default TodoCard;
