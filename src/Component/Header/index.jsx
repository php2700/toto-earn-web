import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { User, LogOut, List, Database, Menu, X, Edit } from "lucide-react";

import logo1 from "../../assets/toto1.png";
import axios from "axios";
import { UserContext } from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, fetchUserData } from "../Store/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);
  const totoToken = localStorage.getItem("totoToken");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch, totoToken]);

  // if (loading) return <p>Loading user...</p>;
  // if (error) return <p>Error: {error}</p>;

  const handleSignUp = () => navigate("/signup");
  const handleHome = () => navigate("/");
  const handleLogout = () => {
    localStorage.removeItem("totoToken");
    localStorage.removeItem("userId");
    dispatch(clearUserData());
    navigate("/");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    // { to: "/services", label: "Our Solutions" },
    { to: "/faq", label: "Help Center" },
    { to: "/contact", label: "Get in Touch" },
  ];

  return (
    <nav className="flex z-10 fixed top-0 left-0 w-full items-center justify-between px-6 md:px-10 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="h-8  flex-shrink-0">
        <img
          onClick={handleHome}
          src={logo1}
          className="h-full  object-cover w-full  cursor-pointer"
          alt="logo"
        />
      </div>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex space-x-8 font-semibold text-gray-900">
        {navLinks?.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `px-3 py-2 border-b-2 text-lg transition ${
                  isActive
                    ? "border-[#0C3B57] text-[#0C3B57] font-bold"
                    : "border-gray-300 text-gray-800 hover:border-[#0C3B57] hover:text-[#0C3B57]"
                }`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Desktop User/Signup */}
      <div className="hidden lg:block">
        {!userData ? (
          <button
            onClick={handleSignUp}
            className="bg-[#0C3B57] text-white px-5 py-2 rounded-md font-semibold"
          >
            SIGN UP
          </button>
        ) : (
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-2 px-4 py-2 cursor-pointer border rounded-lg hover:bg-gray-100"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <User className="w-5 h-5" />
              <span>{userData?.name}</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
                <div className="mb-2">
                  <div className="text-[12px]">{userData.email}</div>

                  {/* {userData?.referralCode && (
                    <div className="text-[12px]">
                      Referral: {userData.referralCode}
                    </div>
                  )} */}
                </div>
                <hr />
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/edit");
                  }}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/apply");
                  }}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  <Database className="w-4 h-4 mr-2" /> Refer
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/referrals");
                  }}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  <List className="w-4 h-4 mr-2" /> Referral List
                </button>
                {/* <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/applied-list");
                  }}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  <List className="w-4 h-4 mr-2" /> Applied List
                </button> */}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex items-center"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
      >
        {mobileMenuOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Menu className="w-7 h-7" />
        )}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md lg:hidden flex flex-col items-start px-6 py-4 space-y-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full px-3 py-2 text-lg ${
                  isActive
                    ? "text-[#0C3B57] font-bold"
                    : "text-gray-800 hover:text-[#0C3B57]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {!userData ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleSignUp();
              }}
              className="bg-[#0C3B57] text-white w-full px-5 py-2 rounded-md font-semibold"
            >
              SIGN UP
            </button>
          ) : (
            <div className="flex flex-col w-full space-y-2">
              <div className="text-sm text-gray-600">{userData.email}</div>
              {/* {userData?.referralCode && (
                <div className="text-sm text-gray-600">
                  Referral: {userData.referralCode}
                </div>
              )} */}
  <button
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/edit");
                  }}
                  className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
                >
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/apply");
                }}
                className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
              >
                <Database className="w-4 h-4 mr-2" />
                Refer
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/referrals");
                }}
                className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
              >
                <List className="w-4 h-4 mr-2" /> Referral List
              </button>
              {/* <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/applied-list");
                }}
                className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
              >
                <List className="w-4 h-4 mr-2" /> Applied List
              </button> */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center w-full px-3 py-2 rounded hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
