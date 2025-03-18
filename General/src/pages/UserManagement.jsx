import React, { useState, useEffect } from "react";
import axios from "axios";


const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const API_URL = import.meta.env.VITE_API_URL

  // 🔹 Fetch Users from Backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/all`, {
        withCredentials: true, // ✅ Ensure cookies are sent
      });
      setUsers(res.data.filter(user => user.role !== "admin"));
      


    } catch (err) {
      setError("Failed to fetch users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete User Function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    setDeleting(true);
    try {
      await axios.delete(`${API_URL}/auth/delete/${id}`, {
        withCredentials: true, // ✅ Ensure cookies are sent
      });
      setUsers(users.filter(user => user.role === "user" && user._id !== id));
    } catch (err) {
      alert("Failed to delete user");
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">User Management</h2>

      {loading ? (
        <p className="text-gray-300 text-center">Loading users...</p>
      ) : error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 min-w-[600px]">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="border border-gray-700 px-4 py-2">Name</th>
                <th className="border border-gray-700 px-4 py-2">Email</th>
                <th className="border border-gray-700 px-4 py-2">Role</th>
                <th className="border border-gray-700 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center text-gray-300 py-4">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="text-gray-300 border border-gray-700">
                    <td className="border border-gray-700 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-700 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-700 px-4 py-2">{user.role}</td>
                    <td className="border border-gray-700 px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        onClick={() => handleDelete(user._id)}
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
