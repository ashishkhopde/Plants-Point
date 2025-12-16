import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    adminId: "",
    adminPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/login`,
        form
      );

      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/plantManager");
      } else {
        setErrorMsg(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm border-2 border-green-200"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Admin Login</h2>

        <div className="mb-4">
          <label className="block text-green-700 mb-1">Admin ID</label>
          <input
            type="text"
            name="adminId"
            value={form.adminId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-green-700 mb-1">Password</label>
          <input
            type="password"
            name="adminPassword"
            value={form.adminPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 text-center mb-3">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
