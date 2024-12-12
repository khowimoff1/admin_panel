import React from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LuLayoutGrid } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { IoLogoBuffer,IoLocationOutline,IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa6";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("tokenchik");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-between px-6 py-4 text-white bg-[#0a0a2a]">
        <h1 className="text-xl font-semibold">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 transition duration-300 bg-red-600 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="flex min-h-screen">
        <nav className="w-52 p-4 bg-[#0a0a2a]">
          <ul className="space-y-4 navl">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <AiOutlineHome/>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <LuLayoutGrid/>
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <BsLightningCharge/>
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/models"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoLogoBuffer/>
                Models
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/places"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoLocationOutline/>
                Places
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cities"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <FaCity/>
                Cities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cars"
                className="flex items-center gap-4 px-3 py-2 space-x-4 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoCarSport/>
                Cars
              </NavLink>
            </li>
          </ul>
        </nav>

        <main className="flex-1 p-4 bg-sky-200">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
