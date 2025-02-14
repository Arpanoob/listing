import CoustomEditBox from "./CoustomEditBox";
import LogoutButton from "./LogoutButton";
import Todos from "./Todos";

function TodoCard() {
  return (
    <div className="flex flex-col items-center w-[583px] h-[758px] bg-[#1D1825] p-4 no-scrollbar">
      <CoustomEditBox />
      <Todos />
      <LogoutButton/>
    </div>
  );
}

export default TodoCard;
