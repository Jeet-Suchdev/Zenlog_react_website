import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logo, LogoutBtn } from "../index";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="bg-[#31363F] text-[#EEEEEE] shadow-md font-sans w-full sticky top-0 z-50 border-b-2 border-b-[#76ABAE]">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo left */}
        <Link to="/" className="flex items-center gap-2">
          <Logo width="48px" />
          <span className="font-bold text-xl text-[#EEEEEE]">Zenlog</span>
        </Link>
        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-6 ml-auto">
          {navItems.map(
            (item) =>
              item.active && (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`text-lg font-medium px-3 py-2 rounded-lg transition-colors duration-200 ${
                      window.location.pathname === item.slug
                        ? "text-[#76ABAE]"
                        : "text-[#EEEEEE] hover:text-[#76ABAE]"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              )
          )}
          {!authStatus && (
            <>
              <li>
                <button
                  onClick={() => navigate("/login")}
                  className="text-lg font-bold px-4 py-2 rounded-xl bg-[#76ABAE] text-[#222831] hover:opacity-80 transition-colors duration-200"
                >
                  Log In
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-lg font-bold px-4 py-2 rounded-xl bg-bg-transparent text-[#76ABAE] border border-[#76ABAE] hover:bg-[#222831] transition-colors duration-200"
                >
                  Sign Up
                </button>
              </li>
            </>
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-[#222831]/20 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="h-8 w-8 text-[#76ABAE]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute left-0 top-full w-full bg-[#31363F] shadow-lg rounded-b-2xl z-40 animate-slideDown"
        >
          <ul className="flex flex-col items-center gap-2 py-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name} className="w-full flex justify-center">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        navigate(item.slug);
                      }}
                      className={`text-lg font-medium px-4 py-3 rounded-lg transition-colors duration-200 ${
                        window.location.pathname === item.slug
                          ? "text-[#76ABAE]"
                          : "text-[#EEEEEE] hover:text-[#76ABAE]"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {!authStatus && (
              <>
                <li className="w-full flex justify-center">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/login");
                    }}
                    className="text-lg font-bold px-4 py-3 rounded-xl bg-[#76ABAE] text-[#222831] hover:opacity-80 transition-colors duration-200"
                  >
                    Log In
                  </button>
                </li>
                <li className="w-full flex justify-center">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate("/signup");
                    }}
                    className="text-lg font-bold px-4 py-3 rounded-xl bg-[#76ABAE] text-[#222831] hover:opacity-80 transition-colors duration-200"
                  >
                    Sign Up
                  </button>
                </li>
              </>
            )}
            {authStatus && (
              <li className="w-full flex justify-center">
                <LogoutBtn className="bg-[#76ABAE] text-[#222831] hover:opacity-80 transition-colors duration-200" />
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
