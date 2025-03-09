/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserNameCard from "../components/UserNameCard";
import { CiCirclePlus } from "react-icons/ci";

function Home() {
  const [chatScreen, setChatScreen] = useState(false);
  useEffect(() => {
    console.log(chatScreen);
  }, []);
  const navigate = useNavigate();

  const changeScreen = () => {
    if (window.innerWidth < 700) {
      setChatScreen((value) => !value);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-sky-950 w-screen ">
      <div className="flex gap-2 w-screen">
        <aside
          className={
            chatScreen ? "hidden" : "h-screen overflow-x-scroll p-5 w-100 "
          }
        >
          {/* Search bar for search user */}
          <div>
            <input
              type="search"
              aria-label="Search"
              placeholder="Search User"
              className="w-full p-1 rounded-md text-white placeholder:text-white border  focus:border-amber-600"
            />
            <p className="px-5 mt-3 text-white py-1 rounded-4xl bg-amber-600 w-fit cursor-pointer">
              <CiCirclePlus className="inline-block" size={"25px"} /> Group
            </p>
          </div>

          {/* List of user name cards */}
          {Array.from({ length: 10 }).map((value, i) => {
            return <UserNameCard key={i} changeScreen={changeScreen} />;
          })}
        </aside>
        <aside
          className={
            chatScreen ? "h-screen w-screen  border" : "hidden md:block w-full"
          }
        >
          <h1 className="text-white">Hello</h1>
          <button onClick={changeScreen}>Back</button>
          {/* Render chat component */}

          <p className="text-center  mt-50 ">Start the Conversation</p>

          <Outlet />
        </aside>
      </div>
    </div>
  );
}

export default Home;
