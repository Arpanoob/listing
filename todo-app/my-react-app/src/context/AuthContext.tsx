import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { loginUser, registerUser } from "../models/apiClient";

interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  const [token, setToken] = useState<string | null>(storedToken);
  const [user, setUser] = useState<AuthContextType["user"]>(
    storedUser ? JSON.parse(storedUser) : null
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser({ email, password });
      setToken(response.data.token);
      setUser(response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await registerUser({ name, email, password });
      setToken(response.data.token);
      setUser(response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      setToken(token);
      setUser(user ? JSON.parse(user) : null);
    };

    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
