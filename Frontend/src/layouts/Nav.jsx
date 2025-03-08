/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";

function Nav() {
  const { user, logoutUser } = useAuth();
  return (
    <div className="">
      <div className="p-1 bg-neutral-900 text-white text-2xl flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <img src="./chat.png" className="w-11"></img>
          <h2>ChatHub</h2>
        </div>
        <div className="p-5">
          <button className="hover:cursor-pointer">Settings</button>

          <button
            className="bg-gradient-to-b bg-amber-400 from-orange-400 text-black hover:cursor-pointer"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nav;
