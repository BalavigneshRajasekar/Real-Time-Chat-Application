/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";

function Nav() {
  const { user } = useAuth();
  return (
    <div>
      <div className="p-5 bg-black text-white text-2xl flex justify-between items-center">
        <div>
          <img src="./chat.png" className="w-20"></img>
        </div>
        <div className="p-5">
          <button>Settings</button>

          {user ? (
            <button className="bg-gradient-to-b bg-amber-400 from-orange-400 text-black">
              Logout
            </button>
          ) : (
            <button>Login</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
