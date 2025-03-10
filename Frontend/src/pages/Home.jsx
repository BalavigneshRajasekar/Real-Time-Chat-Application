/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserNameCard from "../components/UserNameCard";
import { useSocket } from "../hooks/useSocket";
import { useSelector } from "react-redux";
import Chat2 from "./Chat2";
import SearchBar from "../components/SearchBar";

function Home() {
  const socket = useSocket();
  const navigate = useNavigate();
  const [receiverData, setReceiverData] = useState(null);
  const receivers = useSelector((state) => state.users.receiverData);
  const [chatScreen, setChatScreen] = useState(false);
  useEffect(() => {}, []);

  const changeScreen = (value) => {
    console.log(value);
    setReceiverData(value);

    if (window.innerWidth < 700) {
      setChatScreen((value) => !value);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-sky-950 w-screen ">
      <div className="flex gap-2 w-screen">
        <aside
          className={
            chatScreen
              ? "hidden md:block"
              : "h-screen overflow-x-scroll p-5 w-100 "
          }
        >
          {/* Search bar for search user */}
          <SearchBar />
          {/* List of user name cards */}
          {receivers &&
            receivers.map((value, i) => {
              return (
                <UserNameCard
                  value={value}
                  key={i}
                  changeScreen={changeScreen}
                />
              );
            })}
        </aside>
        {/* Chat screen */}
        <aside
          className={
            chatScreen ? "h-screen w-screen  border" : "hidden md:block w-full"
          }
        >
          {/* Render chat component */}
          {receiverData ? (
            <Chat2 receiverData={receiverData} changeScreen={changeScreen} />
          ) : (
            <p className="text-center  mt-50 ">Start the Conversation</p>
          )}

          <Outlet />
        </aside>
      </div>
    </div>
  );
}

export default Home;
