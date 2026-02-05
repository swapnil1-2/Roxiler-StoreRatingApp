import React from "react";
import Modal from "../Modal";

export default function UserDetailsModal({ show, onClose, user }) {
  if (!user) return null;

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-xl font-bold">User Details</h2>

      <div className="mt-3 space-y-2">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Role:</strong> {user.role}</p>

        {user.role === "store" && (
          <p><strong>Store Rating:</strong> {user.avgRating || "N/A"}</p>
        )}
      </div>
    </Modal>
  );
}
