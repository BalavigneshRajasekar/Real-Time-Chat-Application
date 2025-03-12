/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";

function ChatScreenHeader({ changeScreen }) {
  const { onlineUsers } = useAuth();
  const { currentRecipient } = useSelector((store) => store.users);
  return (
    <>
      <div className="bg-gray-300 flex gap-3 p-2 rounded-t-md">
        <div>
          <IoMdArrowBack
            size={"30px"}
            className="cursor-pointer hover:text-gray-700 inline-block"
            onClick={() => changeScreen(currentRecipient)}
          />
          <Avatar
            size={"large"}
            src={
              currentRecipient.profilePic ? (
                currentRecipient.profilePic
              ) : (
                <RxAvatar className="inline-block text-gray-800 text-4xl" />
              )
            }
          ></Avatar>
        </div>
        <div>
          <h2>{currentRecipient.username}</h2>
          {onlineUsers?.includes(currentRecipient._id) ? (
            <>
              <span className="rounded-4xl w-3 h-3 bg-green-600 inline-block"></span>
              <p className="inline-block ml-2">online</p>
            </>
          ) : (
            <>
              <span className="rounded-4xl w-3 h-3 bg-gray-600 inline-block"></span>
              <p className="inline-block ml-2">offline</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatScreenHeader;
