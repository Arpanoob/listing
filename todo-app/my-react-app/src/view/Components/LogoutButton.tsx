import { useAuth } from "../../context/AuthContext";

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button className="text-white cursor-pointer" onClick={logout}>
      logout
    </button>
  );
}

export default LogoutButton;
