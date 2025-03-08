/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
  const [chatScreen, setChatScreen] = useState(false);
  useEffect(() => {
    console.log(chatScreen);
  }, []);
  const navigate = useNavigate();

  const changeScreen = () => {
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
          {Array.from({ length: 100 }).map((value, i) => {
            return (
              <div
                key={i}
                onClick={changeScreen}
                className="p-2 cursor-pointer hover:bg-gray-100 text-white"
              >
                User {value}
              </div>
            );
          })}
        </aside>
        <aside className={chatScreen ? "h-screen w-screen  border" : "hidden"}>
          <h1 className="text-white">Hello</h1>
          <button onClick={changeScreen}>Back</button>
          <Outlet />
        </aside>
      </div>
    </div>
  );
}

export default Home;
