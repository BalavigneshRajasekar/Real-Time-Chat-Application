/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserData } from "../store/asyncCalls";

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // Redirect to home page when the component mounts to avoid unnecessary navigation
  useEffect(() => {
    dispatch(getUserData());
    if (location.pathname === "/") navigate("/home");
  }, []);
  return (
    <div className="fixed top-0 h-screen w-screen">
      <Nav />
      <main className="bg-gradient-to-r from-gray-900 to-sky-950 h-screen">
        {/* Your main content goes here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
