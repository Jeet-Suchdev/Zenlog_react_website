import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "../components";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return !loading ? (
    <div className="min-h-screen bg-[#222831] text-[#EEEEEE] font-sans flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-full ">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
