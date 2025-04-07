/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { useSocket } from "../hooks/useSocket";
import { useSelector } from "react-redux";

function UserNameCard({ value, changeScreen }) {
  const { onlineUsers } = useSocket();
  const { lastMessages } = useSelector((store) => store.users);

  useEffect(() => {}, [value, lastMessages]);

  return (
    <div
      className="flex gap-4 h-fit w-full hover:cursor-pointer hover:bg-gray-900  py-2"
      onClick={() => changeScreen(value)}
    >
      <div className="mt-4 relative">
        <Avatar
          style={{ width: "50px", height: "50px" }}
          src={value.profilePic ? value.profilePic : "user.png"}
          alt="User Pic"
        />
        <div
          className={`absolute top-0 right-0 rounded-4xl w-3 h-3 ${
            onlineUsers?.includes(value._id) ? `bg-green-600` : `bg-gray-600`
          }`}
        ></div>
      </div>
      <div className="w-full border-b-1 border-b-white pb-10 h-fit">
        <div className="flex justify-between items-center">
          <h2 className="text-white">{value.username}</h2>
          <p className="text-green-600 font-bold">
            {lastMessages[value._id]
              ? new Date().toDateString() ==
                new Date(lastMessages[value._id]?.createdAt).toDateString()
                ? new Date(
                    lastMessages[value._id]?.createdAt
                  ).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(
                    lastMessages[value._id]?.createdAt
                  ).toLocaleDateString()
              : "NA"}
          </p>
        </div>
        <div className="flex gap-2 mt-3 justify-between items-center">
          <p className=" inline-block max-w-50 overflow-hidden max-h-12 ">
            {lastMessages[value._id]
              ? lastMessages[value._id].chat
              : "start the convo"}
          </p>
          <p className="rounded-4xl px-2 bg-blue-700 text-white">{10}</p>
        </div>
      </div>
    </div>
  );
}

export default UserNameCard;
