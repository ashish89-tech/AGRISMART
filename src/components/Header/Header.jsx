import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ShoppingCart,
  Sprout,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const userData = useSelector((state) => state.auth.userData);

  const cartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const navItems = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "MarketPrice", slug: "/marketprice", active: authStatus },
    { name: "Marketplace", slug: "/all-posts", active: authStatus },
    { name: "For Farmers", slug: "/dashboard", active: authStatus },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMenu2 = () => setOpen(!open);

  return (
    <header
      className="navbar glass sticky top-0 z-50"
      style={{ background: "#fcdfcb" }}
    >
      <Container>
        <div className="container flex items-center justify-between py-4">

          {/* Logo */}
          <Link to="/" className="brand flex items-center gap-2">
            <div className="logo-icon flex items-center justify-center bg-primary rounded-full p-1">
              <Sprout size={24} color="white" />
            </div>

            <span className="brand-text font-serif text-xl font-bold text-primary">
              AgriSmart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links hidden md:flex items-center gap-6">

            <ul className="flex ml-auto gap-2 items-center">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      className="nav-link inline-block px-6 py-2 duration-200 hover:text-green-700 rounded-full font-medium"
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}

              {/* Account Button */}
              {authStatus && (
                <li className="relative">

                  <button
                    onClick={toggleMenu2}
                    className="flex items-center gap-3 rounded-full border border-green-200 bg-white px-3 py-2 shadow-sm transition hover:border-green-500 hover:bg-green-50"
                  >

                    {/* Avatar */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">
                      {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    {/* Name */}
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-semibold text-gray-800">
                        {userData?.name || "Farmer"}
                      </p>

                      <p className="text-xs text-gray-500">
                        My Account
                      </p>
                    </div>

                    {/* Arrow */}
                    <ChevronDown
                      size={18}
                      className={`text-gray-600 transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown */}
                  {open && (
                    <div className="absolute right-0 top-16 z-50 w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

                      {/* User Section */}
                      <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-4 text-white">

                        <p className="text-sm opacity-90">
                          Welcome back 👋
                        </p>

                        <h2 className="mt-1 text-lg font-semibold">
                          {userData?.name || "Farmer"}
                        </h2>

                        <span className="mt-2 inline-block rounded-lg bg-green-500/40 px-3 py-1 text-sm">
                          ID: AGS12345
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">

                        <button
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                          onClick={() => navigate("/dashboard")}
                        >
                          🌾 Dashboard
                        </button>

                        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-green-50 hover:text-green-700">
                          📦 Orders
                        </button>

                        <button
                          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-gray-700 transition hover:bg-green-50 hover:text-green-700"
                          onClick={() => navigate("/setting")}
                        >
                          ⚙️ Settings
                        </button>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-gray-100 p-2">
                        <div className="rounded-xl transition hover:bg-red-50">
                          <LogoutBtn
                            className="hover:bg-transparent"
                            onClick={() => setOpen(false)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              )}
            </ul>

            {/* Cart */}
            {authStatus && (
              <div className="flex items-center gap-4 border-l border-gray-300 pl-4">
                <Link
                  to="/cart"
                  className="icon-btn"
                  aria-label="Cart"
                  style={{
                    position: "relative",
                    display: "inline-flex",
                  }}
                >
                  <ShoppingCart
                    size={24}
                    className="text-primary hover:text-green-700 transition"
                  />

                  {cartCount > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-8px",
                        right: "-8px",
                        background: "#e53e3e",
                        color: "#fff",
                        borderRadius: "999px",
                        minWidth: "18px",
                        height: "18px",
                        fontSize: "0.7rem",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 4px",
                      }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">

            <Link
              to="/cart"
              className="icon-btn"
              aria-label="Cart"
            >
              <ShoppingCart
                size={24}
                className="text-primary hover:text-green-700 transition"
              />
            </Link>

            <button
              onClick={toggleMenu}
              className="text-primary p-1 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;