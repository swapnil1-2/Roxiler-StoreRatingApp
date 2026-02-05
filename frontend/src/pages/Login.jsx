import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [lodder, setLodder] = useState(false)

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateLogin = () => {
    if (!email.trim()) return "Email is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format.";

    if (password.length < 8) return "Password must be at least 8 characters.";

    return null;
  };

  const handleSubmit = async (e) => {
    setLodder(true)
    
    e.preventDefault();

    const validationError = validateLogin();
    if (validationError) {
      setLodder(false)
      setError(validationError);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      login({
        ...res.data.user,
        token: res.data.token,
      });

      const role = res.data.user.role;
      if (role === "admin") navigate("/admin");
      else if (role === "storeOwner") navigate("/owner/dashboard");
      else navigate("/user/dashboard");

    } catch (err) {
      setLodder(false)
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">
            {lodder? "Logging...": "Login"}
          </button>

          <p className="text-sm mt-2 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium">
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;
