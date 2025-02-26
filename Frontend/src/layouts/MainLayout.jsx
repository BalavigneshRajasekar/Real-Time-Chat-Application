/* eslint-disable no-unused-vars */
import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Nav></Nav>

      <main>
        {/* Your main content goes here */}
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
