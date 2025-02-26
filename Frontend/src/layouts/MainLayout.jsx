/* eslint-disable no-unused-vars */
import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div>
      <nav>
        <Nav></Nav>
      </nav>
      <main>{/* Your main content goes here */}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
