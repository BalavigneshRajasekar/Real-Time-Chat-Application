/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";

function MainLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, []);
  return (
    <div>
      <main>
        {/* Your main content goes here */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
