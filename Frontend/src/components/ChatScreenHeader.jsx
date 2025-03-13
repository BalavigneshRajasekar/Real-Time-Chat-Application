/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Avatar, Image } from "antd";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";
import { useSelector } from "react-redux";
import { IoIosCall } from "react-icons/io";
import { useSocket } from "../hooks/useSocket";
import { FaVideo } from "react-icons/fa6";

function ChatScreenHeader({ changeScreen }) {
  const { onlineUsers } = useSocket();
  const { currentRecipient } = useSelector((store) => store.users);

  return (
    <>
      <div className="bg-gray-300 flex gap-3 p-2 rounded-t-md relative">
        <div>
          <IoMdArrowBack
            size={"30px"}
            className="cursor-pointer hover:text-gray-700 inline-block"
            onClick={() => changeScreen(currentRecipient)}
          />
          <Image
            preview
            style={{
              width: "50px",
              height: "50px",
              border: "1px solid black",
              display: "inline-block",
              borderRadius: "50%",
            }}
            size={"large"}
            src={
              currentRecipient.profilePic
                ? currentRecipient.profilePic
                : "./user.png"
            }
          ></Image>
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
        {/* Headers Action */}
        <div className="absolute right-10 top-8 md:top-5">
          <IoIosCall className="inline-block text-3xl" />
          <FaVideo className="inline-block text-3xl ml-5" />
        </div>
      </div>
    </>
  );
}

export default ChatScreenHeader;
