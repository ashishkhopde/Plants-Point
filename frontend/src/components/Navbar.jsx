import React, { useState } from "react";
import {
  HomeIcon,
  Trees,
  Menu,
  X,
  ShoppingCart,
  LogOut,
  User,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [showDropdown, setShowDropdown] = useState(false); // Desktop avatar dropdown
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const menuOptions = [
    { name: "Home", icon: <HomeIcon size={18} />, navigate: "" },
    { name: "Plants", icon: <Trees size={18} />, navigate: "plants" },
    ...(isLoggedIn
      ? [{ name: "Cart", icon: <ShoppingCart size={18} />, navigate: "cart" }]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
    setShowDropdown(false);
    setIsOpen(false);
  };

  const MenuLink = ({ option, onClick }) => (
    <NavLink
      to={`/${option.navigate}`}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
          isActive
            ? "bg-yellow-400 text-green-900 shadow-md"
            : "text-white hover:bg-green-600 hover:text-yellow-300"
        }`
      }
      onClick={onClick}
    >
      {option.icon}
      {option.name}
    </NavLink>
  );

  return (
    <nav className="w-full z-50 bg-green-800/80 backdrop-blur-lg shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h2
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer text-yellow-300 hover:text-yellow-400 transition-all duration-200"
        >
          🌱 PlantLy
        </h2>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <MenuLink option={option} onClick={() => {}} />
            </li>
          ))}

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
            <div className="relative">
              {/* Avatar */}
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 focus:outline-none"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full border-2 border-yellow-400 object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-400 text-green-900">
                    <User size={18} />
                  </div>
                )}
              </button>

              {/* Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg w-40 py-2 z-50">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-green-800 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex items-center text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-green-700/95 backdrop-blur-md px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 py-4 border-t border-green-600 shadow-lg" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <MenuLink
                option={option}
                onClick={() => setIsOpen(false)}
              />
            </li>
          ))}

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
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="bg-white text-green-800 px-4 py-2 rounded-md font-semibold text-center hover:bg-gray-100 transition-all duration-300"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-2 bg-yellow-400 text-green-900 px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-all duration-300"
              >
                <User size={18} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold text-white transition-all duration-300"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
}
