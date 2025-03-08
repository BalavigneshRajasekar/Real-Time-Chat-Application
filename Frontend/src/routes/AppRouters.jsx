/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import useAuth from "../hooks/useAuth";
import Chat from "../pages/Chat";
import Chat2 from "../pages/Chat2";
import Login from "../pages/Login";
import Nav from "../layouts/Nav";
import Footer from "../layouts/Footer";
import Signup from "../pages/Signup";

function AppRouters() {
  const { user } = useAuth();

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
                path="chat"
                element={user ? <Chat /> : <Navigate to="login" />}
              ></Route>
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouters;
