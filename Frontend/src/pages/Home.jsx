/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import UserNameCard from "../components/UserNameCard";
import { useSocket } from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import Chat2 from "./Chat2";
import SearchBar from "../components/SearchBar";
import {
  getAllMessages,
  setCurrentRecipient,
  setProfileModal,
} from "../store/asyncCalls";
import { Card } from "antd";
import LogoutModal from "../components/LogoutModal";
import ProfileModel from "../components/ProfileModel";

function Home() {
  const { onlineUsers } = useSocket();

  const dispatch = useDispatch();
  const { receiverData, currentRecipient, logoutModal, profileModal } =
    useSelector((state) => state.users);
  const [chatScreen, setChatScreen] = useState(false);

  useEffect(() => {
    dispatch(getAllMessages());
  }, [onlineUsers]);

  const changeScreen = (value) => {
    dispatch(setCurrentRecipient(value));

    if (window.innerWidth < 700) {
      setChatScreen((value) => !value);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-sky-950 w-screen relative">
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
          {receiverData.length > 0 ? (
            receiverData.map((value, i) => {
              return (
                <UserNameCard
                  value={value}
                  key={i}
                  changeScreen={changeScreen}
                />
              );
            })
          ) : (
            <Card loading></Card>
          )}
        </aside>
        {/* Chat screen */}
        <aside
          className={
            chatScreen ? "h-screen w-screen  border" : "hidden md:block w-full"
          }
        >
          {/* Render chat component */}
          {currentRecipient ? (
            <Chat2 changeScreen={changeScreen} />
          ) : (
            <p className="text-center  mt-50 ">Start the Conversation</p>
          )}

          <Outlet />
        </aside>
      </div>
      {profileModal && <ProfileModel />}
      {logoutModal && <LogoutModal />}
    </div>
  );
}

export default Home;
