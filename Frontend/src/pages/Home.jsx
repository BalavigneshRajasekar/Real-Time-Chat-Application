/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserNameCard from "../components/UserNameCard";
import { CiCirclePlus } from "react-icons/ci";
import { useSocket } from "../hooks/useSocket";
import { Avatar } from "antd";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import Chat2 from "./Chat2";

function Home() {
  const socket = useSocket();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [receiverData, setReceiverData] = useState(null);
  const receivers = useSelector((state) => state.users.receiverData);
  const [chatScreen, setChatScreen] = useState(false);
  useEffect(() => {
    console.log(user);
    console.log(receiverData);

    socket.emit("join", 1);
    console.log(chatScreen);
  }, []);

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
            chatScreen ? "hidden" : "h-screen overflow-x-scroll p-5 w-100 "
          }
        >
          {/* Search bar for search user */}
          <div>
            <div className="flex gap-3">
              <Avatar src={user.profilePic}></Avatar>
              <p className="text-white">{user.username}</p>
            </div>
            <input
              type="search"
              aria-label="Search"
              placeholder="Search User"
              className="w-full p-1 mt-3 rounded-md text-white placeholder:text-white border  focus:border-amber-600"
            />
            <p className="px-5 mt-3 text-white py-1 rounded-4xl bg-amber-600 w-fit cursor-pointer">
              <CiCirclePlus className="inline-block" size={"25px"} /> Group
            </p>
          </div>

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
