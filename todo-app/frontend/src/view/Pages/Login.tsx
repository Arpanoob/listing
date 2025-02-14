// Login.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { email: string; password: string }) => {
    setError(null); // Reset any previous errors
    try {
      const isSuccess = await login(values.email, values.password);
      if (isSuccess) {
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition duration-300"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
