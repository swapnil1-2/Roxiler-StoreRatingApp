import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import UpdatePasswordModal from "../components/UpdatePasswordModal";

const StoreDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  /** Fetch ratings for this store owner */
  const fetchRatings = async () => {
    try {
      setLoading(true);

      const res = await api.get("/store/ratings");

      console.log("respond", res)
      setRatings(res.data.ratings || []);
      setAvgRating(res.data.avgRating || null);

      setLoading(false);
    } catch (err) {
      console.error("Rating Fetch Error:", err.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-blue-600">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="storeOwner" />

      {/* Update Password Button */}
      <div className="p-4 max-w-5xl mx-auto flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
        >
          Update Password
        </button>
      </div>

      {/* Update Password Modal */}
      <UpdatePasswordModal open={openModal} onClose={() => setOpenModal(false)} />

      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Store Dashboard</h1>

        {/* Average Rating */}
        <div className="bg-white p-4 rounded shadow border mb-5">
          <h2 className="text-xl font-semibold text-blue-700">Average Rating</h2>
          <p className="mt-2 text-lg">
            {avgRating ? Number(avgRating).toFixed(1) : "No ratings yet"}
          </p>
        </div>

        {/* Ratings Table */}
        <div className="bg-white p-4 rounded shadow border">
          <h2 className="text-xl font-semibold text-blue-700 mb-3">
            User Ratings
          </h2>

          {ratings.length === 0 ? (
            <p className="text-gray-500">No users have rated your store yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3 border">User Name</th>
                    <th className="p-3 border">User Email</th>
                    <th className="p-3 border">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{r.username}</td>
                      <td className="p-3 border">{r.email}</td>
                      <td className="p-3 border text-blue-700 font-semibold">
                        {r.rating} 
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDashboard;
