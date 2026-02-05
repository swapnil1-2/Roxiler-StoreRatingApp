import React, { useState } from "react";
import api from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loader , setLoader] = useState(false)

  const validateForm = () => {
    const { name, email, address, password } = form;

 
    if (name.length < 20 || name.length > 60) {
      return "Name must be between 20 and 60 characters.";
    }

 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }

    
    if (address.length > 400) {
      return "Address cannot exceed 400 characters.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      return "Password must be 8–16 chars, include uppercase & special character.";
    }

    return null; 
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();

   
    const validationError = validateForm();
    if (validationError) {
      setLoader(false)
      setError(validationError);
      return;
    }

    try {
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setLoader(false)
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <input
            name="name"
            placeholder="Full Name"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            className="border p-2 rounded"
            maxLength={400}
            onChange={handleChange}
            required
          ></textarea>

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            onChange={handleChange}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button className="bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700">
            {loader? "Signing up...": "Sign Up"}
          </button>

          <p className="text-sm mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
