import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import Navbar from "../components/Navbar";
import AddUserModal from "../components/admin/AddUserModal";
import AddStoreModal from "../components/admin/AddStoreModal";
import UserDetailsModal from "../components/admin/UserDetailsModal";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState("");
  const [storeFilter, setStoreFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const fetchAll = async () => {
    try {
      setLoading(true);

      const [statsRes, storesRes, usersRes] = await Promise.all([
        api.get("/admin/stats"),
        api.get("/admin/stores"),
        api.get("/admin/users"),
      ]);

      setStats(statsRes.data);
      setStores(storesRes.data);
      setUsers(usersRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Admin Dashboard Fetch Error:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);


  const filteredUsers = users.filter((u) =>
    `${u.name} ${u.email} ${u.address} ${u.role}`
      .toLowerCase()
      .includes(userFilter.toLowerCase())
  );

  const filteredStores = stores.filter((s) =>
    `${s.name} ${s.email} ${s.address} ${s.avgRating}`
      .toLowerCase()
      .includes(storeFilter.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-sky-600">
        Loading Dashboard…
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar role="admin" />

      <div className="p-4 sm:p-6 space-y-8">
      
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow rounded-xl border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700">Total Stores</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalStores}</p>
          </div>

          <div className="bg-white p-6 shadow rounded-xl border-l-4 border-yellow-500">
            <h3 className="text-lg font-semibold text-gray-700">Total Ratings</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.totalRatings}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Users</h2>
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow"
            >
              + Add User
            </button>
          </div>

      
          <input
            type="text"
            placeholder="Search users by name, email, role, address..."
            className="w-full p-3 border rounded-lg shadow-sm mt-3"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          />

    
          <div className="bg-white shadow rounded-lg overflow-x-auto mt-4">
            <table className="min-w-full text-left border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Address</th>
                  <th className="p-3 border">Role</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    onClick={() => {
                      setSelectedUser(u);
                      setShowDetails(true);
                    }}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="p-3 border">{u.name}</td>
                    <td className="p-3 border">{u.email}</td>
                    <td className="p-3 border">{u.address}</td>
                    <td className="p-3 border capitalize">{u.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

   
        <div className="mt-10">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h2 className="text-2xl font-bold text-gray-800">Stores</h2>

            <button
              onClick={() => setShowAddStore(true)}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 shadow"
            >
              + Add Store
            </button>
          </div>

    
          <input
            type="text"
            placeholder="Search stores by name, email, address, rating..."
            className="w-full p-3 border rounded-lg shadow-sm mt-3"
            value={storeFilter}
            onChange={(e) => setStoreFilter(e.target.value)}
          />

          <div className="bg-white shadow rounded-lg overflow-x-auto mt-4">
            <table className="min-w-full text-left border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 border">Store Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Address</th>
                  <th className="p-3 border">Rating</th>
                </tr>
              </thead>

              <tbody>
                {filteredStores.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-100">
                    <td className="p-3 border">{s.name}</td>
                    <td className="p-3 border">{s.email}</td>
                    <td className="p-3 border">{s.address}</td>
                    <td className="p-3 border">{s.avgRating || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

 
      <AddUserModal show={showAddUser} onClose={() => setShowAddUser(false)} refresh={fetchAll} />
      <AddStoreModal show={showAddStore} onClose={() => setShowAddStore(false)} refresh={fetchAll} />
      <UserDetailsModal show={showDetails} onClose={() => setShowDetails(false)} user={selectedUser} />
    </div>
  );
};

export default AdminDashboard;
