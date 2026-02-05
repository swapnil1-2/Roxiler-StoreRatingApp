import React, { useState } from "react";
import api from "../../api/axiosInstance";
import Modal from "../Modal";

export default function AddUserModal({ show, onClose, refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  
  const validate = () => {
    const newErrors = {};

    if (!form.name || form.name.length < 3 || form.name.length > 40) {
      newErrors.name = "Name must be between 3–40 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    const passRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
    if (!passRegex.test(form.password)) {
      newErrors.password =
        "Password must be 8–16 chars, include one uppercase & one special character.";
    }

    if (!form.address || form.address.length > 400) {
      newErrors.address = "Address must be less than 400 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return; 

    try {
      await api.post("/admin/add-user", form);
      refresh();
      onClose();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-sky-600">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

      
        <div>
          <label className="font-medium text-gray-700">Full Name</label>
          <input
            name="name"
            placeholder="Enter full name"
            className="input border rounded-lg p-2 w-full mt-1"
            onChange={handleChange}
            value={form.name}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

  
        <div>
          <label className="font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email address"
            className="input border rounded-lg p-2 w-full mt-1"
            onChange={handleChange}
            value={form.email}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input border rounded-lg p-2 w-full mt-1"
            onChange={handleChange}
            value={form.password}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

      
        <div>
          <label className="font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            placeholder="User address"
            className="input border rounded-lg p-2 w-full mt-1"
            maxLength={400}
            onChange={handleChange}
            value={form.address}
            required
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>

        {/* ROLE DROPDOWN */}
        <div>
          <label className="font-medium text-gray-700">Select Role</label>
          <select
            name="role"
            className="input border rounded-lg p-2 w-full mt-1 bg-white"
            onChange={handleChange}
            value={form.role}
          >
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
            <option value="storeOwner">Store Owner</option>
          </select>
        </div>

        <button className="bg-sky-600 text-white py-2 rounded-lg w-full hover:bg-sky-700 transition">
          Add User
        </button>
      </form>
    </Modal>
  );
}
