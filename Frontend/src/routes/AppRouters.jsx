/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";
import Chat2 from "../pages/Chat2";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetCode from "../pages/ResetCode";

function AppRouters() {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <MainLayout /> : <Navigate to="/login" />}
          >
            <Route
              path="home"
              element={user ? <Home /> : <Navigate to="login" />}
            >
              <Route
                path="chat2"
                element={user ? <Chat2 /> : <Navigate to="login" />}
              ></Route>
            </Route>
          </Route>

          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/forgotPassword"
            element={!user ? <ForgotPassword /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="resetCode/"
            element={!user ? <ResetCode /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouters;
