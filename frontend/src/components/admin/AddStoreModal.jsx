import React, { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import Modal from "../Modal";

export default function AddStoreModal({ show, onClose, refresh }) {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

 
  useEffect(() => {
    if (show) {
      fetchOwners();
    }
  }, [show]);

  const fetchOwners = async () => {
    try {
      const res = await api.get("/admin/store-owners"); 
      setOwners(res.data);
    } catch (err) {
      console.log("Owner fetch error:", err);
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });


  const validateForm = () => {
    if (form.name.length < 3 || form.name.length > 60)
      return "Store name must be 3–60 characters.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email))
      return "Invalid email format.";

    if (form.address.length > 400)
      return "Address cannot exceed 400 characters.";

    if (!form.ownerId)
      return "Please select a store owner.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await api.post("/admin/add-store", form);
      refresh();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add store.");
    }
  };

  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Add New Store</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        
     
        <div>
          <label className="font-medium">Store Name</label>
          <input
            name="name"
            placeholder="Enter store name"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

      
        <div>
          <label className="font-medium">Store Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter store email"
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          />
        </div>

       
        <div>
          <label className="font-medium">Store Address</label>
          <textarea
            name="address"
            placeholder="Enter store address"
            maxLength={400}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          ></textarea>
        </div>

    
        <div>
          <label className="font-medium">Assign Store Owner</label>
          <select
            name="ownerId"
            className="w-full border p-2 rounded bg-white focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
            required
          >
            <option value="">-- Select Owner --</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>

      
        {error && <p className="text-red-500 text-sm">{error}</p>}

  
        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Add Store
        </button>
      </form>
    </Modal>
  );
}
