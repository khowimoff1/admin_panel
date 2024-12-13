import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { LuLayoutGrid } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { IoLogoBuffer, IoLocationOutline, IoCarSport } from "react-icons/io5";
import { FaCity } from "react-icons/fa6";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const HomePage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("tokenchik");
    navigate("/login");
  };
  const [openMenu, setOpenMenu] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex fixed z-10 w-full items-center justify-between px-6 py-4 text-white bg-[#0a0a2a]">
        <h1 className="text-xl font-semibold">Admin Panel</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-1 transition duration-300 bg-red-600 rounded lg:py-2 hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-1 min-h-screen sm:flex-col md:flex-row">
        <nav className="w-52 px-4 pt-20 h-full fixed z-[9] bg-[#0a0a2a] md:w-0 hidden lg:w-52 lg:block transition-all duration-300">
          <ul className="space-y-4 navl">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <AiOutlineHome />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <LuLayoutGrid />
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <BsLightningCharge />
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/models"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoLogoBuffer />
                Models
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/places"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoLocationOutline />
                Places
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cities"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <FaCity />
                Cities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cars"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoCarSport />
                Cars
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav
          className={` h-full z-[9]  pt-20 bg-[#0a0a2a] fixed lg:hidden transition-all duration-300 ${
            openMenu ? "w-0" : "w-52 pl-5 pr-8"
          }`}
        >
          <div className={`absolute z-10 text-4xl text-white ${openMenu ? "-right-5" : "-right-4"}`}>
              <IoIosArrowDroprightCircle
                onClick={() => setOpenMenu((prev) => !prev)}
                className={`p-0 transition-all duration-700 overflow-hidden bg-[#0a0a2a] rounded-full ${
                  openMenu ? "-rotate-180" : "rotate-0"
                }`}
              />
            </div>
          <ul className="overflow-hidden spayce-y-4 navl">
            <li>
              <NavLink
                to="/dashboard"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <AiOutlineHome />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <LuLayoutGrid />
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/brands"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <BsLightningCharge />
                Brands
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/models"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoLogoBuffer />
                Models
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/places"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoLocationOutline />
                Places
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cities"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <FaCity />
                Cities
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cars"
                className="flex items-center gap-4 px-3 py-2 text-lg font-medium text-white transition-transform duration-700 transform rounded-xl hover:scale-110"
              >
                <IoCarSport />
                Cars
              </NavLink>
            </li>
          </ul>
        </nav>
        <main className="flex-1 w-full pt-24 pl-4 pr-4 lg:pl-[240px] lg:pr-10 bg-sky-200 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
