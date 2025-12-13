import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, {
        name,
        avatar,
        email,
        password,
      });

      if (res.data.accessToken && res.data.refreshToken) {
        // ✅ Store tokens in localStorage
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        // ✅ Fetch user details using the access token
        const userRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/user`, {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        });

        console.log("User details:", userRes.data.user);
        localStorage.setItem("user", JSON.stringify(userRes.data.user));
        navigate("/plants");
      } else {
        setErrorMsg(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Try again!");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
          Create Account 🌱
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join PlantLy and bring nature closer
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Avatar (optional URL)"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMsg && (
            <p className="text-center text-red-500 text-sm">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg font-medium hover:bg-green-800 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
