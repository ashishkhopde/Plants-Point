import React, { useState } from "react";
import {
  HomeIcon,
  Trees,
  Menu,
  X,
  ShoppingCart,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const menuOptions = [
    { name: "Home", icon: <HomeIcon size={18} />, navigate: "" },
    { name: "Plants", icon: <Trees size={18} />, navigate: "plants" },
    ...(isLoggedIn
      ? [{ name: "Cart", icon: <ShoppingCart size={18} />, navigate: "cart" }]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <nav className="w-full z-50 bg-green-800/80 backdrop-blur-lg shadow-lg">
      <div className="max-w-7xl mx-auto px-1 py-4 flex justify-between items-center">
        {/* 🌱 Logo */}
        <h2
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer text-yellow-300 hover:text-yellow-400 transition-all duration-200"
        >
          🌱 PlantLy
        </h2>

        {/* 🖥️ Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <NavLink
                to={`/${option.navigate}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 
                   ${
                     isActive
                       ? "bg-yellow-400 text-green-900 shadow-md"
                       : "text-white hover:bg-green-700 hover:text-yellow-300"
                   }`
                }
              >
                {option.icon}
                {option.name}
              </NavLink>
            </li>
          ))}

          {/* 👤 Auth Buttons */}
          {!isLoggedIn ? (
            <div className="flex gap-3">
              <NavLink
                to="/login"
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-white text-green-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </ul>

        {/* 📱 Mobile Toggle */}
        <button
          className="md:hidden flex items-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      <div
        className={`md:hidden bg-green-700/95 backdrop-blur-md px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4 border-t border-green-600 shadow-lg" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <NavLink
                to={`/${option.navigate}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 
                  ${
                    isActive
                      ? "bg-yellow-400 text-green-900"
                      : "text-white hover:bg-green-600 hover:text-yellow-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {option.icon}
                {option.name}
              </NavLink>
            </li>
          ))}

          {/* Mobile Auth Buttons */}
          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 mt-4">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-yellow-400 text-green-900 px-4 py-2 rounded-md font-semibold text-center hover:bg-yellow-300 transition-all duration-300"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-white text-green-800 px-4 py-2 rounded-md font-semibold text-center hover:bg-gray-100 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold text-white mt-3 transition-all duration-300"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
