import React, { useState } from "react";
import { HomeIcon, Trees, Menu, X, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuOptions = [
  { name: "Home", icon: <HomeIcon size={18} />, navigate: "" },
  { name: "Plants", icon: <Trees size={18} />, navigate: "plants" },
  { name: "Cart", icon: <ShoppingCart size={18} />, navigate: "cart" }, // ✅ Cart added
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h2 className="text-2xl font-bold tracking-wide">🌱 PlantLy</h2>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6">
          {menuOptions.map((option, index) => (
            <li key={index}>
              <NavLink
                to={`/${option.navigate}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-1 rounded-md transition-colors duration-200 
                  ${isActive ? "bg-yellow-400 text-green-900" : "hover:text-yellow-300"}`
                }
              >
                {option.icon}
                {option.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-green-600 px-4 pb-4 pt-4">
          <ul className="flex flex-col gap-4">
            {menuOptions.map((option, index) => (
              <li key={index}>
                <NavLink
                  to={`/${option.navigate}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded-md transition-colors duration-200 
                    ${isActive ? "bg-yellow-400 text-green-900" : "hover:text-yellow-300"}`
                  }
                  onClick={() => setIsOpen(false)} // close menu after click
                >
                  {option.icon}
                  {option.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
