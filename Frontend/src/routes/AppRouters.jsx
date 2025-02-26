/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";
import Forbidden from "../pages/Forbidden";

const ProtectedRote = ({ element }) => {
  const { user } = useAuth();
  console.log(user);

  return user ? element : <Forbidden />;
};

function AppRouters() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              path="/home"
              element={<ProtectedRote element={<Home />} />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouters;
