import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // 👈 your centralized axios instance
import Loader from "../components/Loader.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Fetch user details
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await API.get("/user");
        setUser(res.data.user);
      } catch (error) {
        console.error("Profile fetch error:", error);
        setErrorMsg("Unable to fetch profile details. Please log in again.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      // Optional: notify backend to invalidate refresh token
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await API.post("/user/logout", { refreshToken });
      }

      // Clear all local data
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      localStorage.clear();
      navigate("/login");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">My Profile 🌿</h2>

        {errorMsg ? (
          <p className="text-red-500 text-sm">{errorMsg}</p>
        ) : user ? (
          <>
            <img
              src={user.avatar || "https://via.placeholder.com/100"}
              alt="avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-green-400"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-1">
              {user.name}
            </h3>
            <p className="text-gray-600 mb-6">{user.email}</p>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-all"
            >
              Log Out
            </button>
          </>
        ) : (
          <p className="text-gray-500">No user data found.</p>
        )}
      </div>
    </div>
  );
}
