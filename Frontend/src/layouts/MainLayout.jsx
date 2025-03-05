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
  }, []);
  return (
    <div>
      <Nav />
      <main>
        {/* Your main content goes here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
