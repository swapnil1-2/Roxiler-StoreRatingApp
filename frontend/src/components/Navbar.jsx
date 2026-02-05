// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ role }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick= ()=>{
      logout;
      navigate('/login')
      
  }


  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-sky-600">Roxiler</Link>
        {user?.role === "admin" && <Link to="/admin" className="text-sm text-slate-600">Admin</Link>}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-slate-700">{user.name} ({user.role})</span>
            <button onClick={handleClick} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-slate-600">Login</Link>
            <Link to="/signup" className="text-sm text-slate-600">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
