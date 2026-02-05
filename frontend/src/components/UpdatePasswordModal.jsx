import React, { useState } from "react";
import api from "../api/axiosInstance";

const UpdatePasswordModal = ({ open, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newPassword.length < 8 || newPassword.length > 16) {
      alert("Password must be 8–16 characters.");
      return;
    }

    try {
      setLoading(true);
      await api.put("/user/update-password", {
        oldPassword,
        newPassword,
      });

      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      onClose(); // Close modal
    } catch (err) {
      alert(err.response?.data?.message || "Password update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          Update Password
        </h2>

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="font-semibold">Old Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="font-semibold">New Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <p className="text-sm text-gray-600 mt-1">
              Must be 8–16 characters, include uppercase & special character.
            </p>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
