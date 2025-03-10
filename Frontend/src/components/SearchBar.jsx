/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import useAuth from "../hooks/useAuth";

function SearchBar() {
  const { user } = useAuth();
  return (
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
  );
}

export default SearchBar;
