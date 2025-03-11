/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Avatar } from "antd";

function UserNameCard({ value, changeScreen }) {
  return (
    <div
      className="flex gap-4 h-fit w-full hover:cursor-pointer hover:bg-gray-900  py-2"
      onClick={() => changeScreen(value)}
    >
      <div className="mt-4">
        <Avatar
          style={{ width: "40px", height: "40px" }}
          src={value.profilePic ? value.profilePic : "user.png"}
          alt="User Pic"
        />
      </div>
      <div className="w-full border-b-1 border-b-white pb-10 h-fit">
        <div className="flex justify-between items-center">
          <h2 className="text-white">{value.username}</h2>
          <p className="text-green-600 font-bold">10:20 AM</p>
        </div>
        <div className="flex gap-2 mt-3 justify-between items-center">
          <p className=" inline-block max-w-50 overflow-hidden max-h-12 ">
            Hai How are you what are you doing H
          </p>
          <p className="rounded-4xl px-2 bg-blue-700 text-white">100</p>
        </div>
      </div>
    </div>
  );
}

export default UserNameCard;
