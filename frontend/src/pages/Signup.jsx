import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios"; // 👈 centralized Axios instance with interceptors

export default function Signup() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/user/signup", {
        name,
        avatar,
        email,
        password,
      });

      // ✅ Store access & refresh tokens
      if (res.data.accessToken && res.data.refreshToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        try {
          // ✅ Fetch and store user info
          const userRes = await API.get("/user");
          localStorage.setItem("user", JSON.stringify(userRes.data.user));
        } catch (userErr) {
          console.warn("Could not fetch user:", userErr);
        }

        navigate("/plants");
      } else {
        setErrorMsg(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setErrorMsg("Something went wrong. Try again!");
    } finally {
      setLoading(false);
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
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              loading
                ? "bg-green-400 cursor-not-allowed text-white"
                : "bg-green-700 hover:bg-green-800 text-white"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
