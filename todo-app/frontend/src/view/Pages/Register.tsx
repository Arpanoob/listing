// Register.tsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError(null);
    try {
      const flag = await register(values.name, values.email, values.password);
      if (flag) navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      const errorMessage = "Registration failed. Please try again later.";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        {error && (
          <div className="mb-4 p-4 text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold transition duration-300"
              >
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
