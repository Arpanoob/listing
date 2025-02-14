import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";
import TodoList from "./view/Pages/TodoList";
import Login from "./view/Pages/Login";
import Register from "./view/Pages/Register";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;
