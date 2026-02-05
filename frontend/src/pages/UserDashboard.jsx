import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import UpdatePasswordModal from "../components/UpdatePasswordModal";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [submitRating, setSubmitRating] = useState({});
  const [openModal, setOpenModal] = useState(false);


  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await api.get("/user/stores");
      const data = res.data.stores || [];

      setStores(data);

    
      const ratingMap = {};
      data.forEach((s) => {
        ratingMap[s.id] = s.userRating || "";
      });
      setSubmitRating(ratingMap);

      setLoading(false);
    } catch (error) {
      console.error("Store Fetch Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);


  const handleRatingSubmit = async (storeId) => {
    try {
      const ratingValue = submitRating[storeId];

      if (!ratingValue) {
        alert("Please select a rating between 1 and 5");
        return;
      }

      await api.post("/user/rate", {
        storeId,
        rating: Number(ratingValue),
      });

      alert("Rating submitted successfully!");
      fetchStores();
    } catch (err) {
      console.error("Rating Submit Error:", err.response?.data);
      alert("Failed to submit rating");
    }
  };


  const filteredStores = stores.filter((s) =>
    [s.name, s.address].join(" ").toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-blue-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="user" />

   
      <div className="p-4 max-w-5xl mx-auto flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Update Password
        </button>
      </div>

   
      <UpdatePasswordModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Store Listings</h1>

       
        <input
          type="text"
          placeholder="Search by store name or address..."
          className="w-full p-3 border rounded-lg shadow-sm mb-5"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

   
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white p-4 shadow rounded-lg border"
            >
              <h2 className="text-lg font-bold text-blue-700">{store.name}</h2>

              <p className="text-gray-700 mt-1">
                <span className="font-semibold">Address:</span> {store.address}
              </p>

              <p className="mt-2">
                <span className="font-semibold">Overall Rating:</span>{" "}
                {store.avgRating ? Number(store.avgRating).toFixed(1) : "N/A"}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Your Rating:</span>{" "}
                {store.userRating || "Not rated yet"}
              </p>

           
              <div className="mt-3 flex items-center">
                <select
                  value={submitRating[store.id] || ""}
                  onChange={(e) =>
                    setSubmitRating({
                      ...submitRating,
                      [store.id]: e.target.value,
                    })
                  }
                  className="border p-2 rounded w-28 mr-3"
                >
                  <option value="">Select Rating</option>
                  <option value="1">1 </option>
                  <option value="2">2 </option>
                  <option value="3">3 </option>
                  <option value="4">4 </option>
                  <option value="5">5 </option>
                </select>

                <button
                  onClick={() => handleRatingSubmit(store.id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                  {store.userRating ? "Update Rating" : "Submit Rating"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No stores found matching your search.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
