/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";

function Nav() {
  const { user, logoutUser } = useAuth();
  return (
    <div>
      <div className="p-1 bg-neutral-900 text-white text-2xl flex justify-between items-center">
        <div>
          <img src="./chat.png" className="w-11"></img>
        </div>
        <div className="p-5">
          <button>Settings</button>

          <button
            className="bg-gradient-to-b bg-amber-400 from-orange-400 text-black"
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
