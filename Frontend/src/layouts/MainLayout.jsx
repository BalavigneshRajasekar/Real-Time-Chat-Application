/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  // Redirect to home page when the component mounts to avoid unnecessary navigation
  useEffect(() => {
    navigate("/home");
  }, [navigate]);
  return (
    <div>
      <Nav />
      <main className="bg-gradient-to-tl from-slate-900 to-stone-900 h-screen">
        {/* Your main content goes here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
