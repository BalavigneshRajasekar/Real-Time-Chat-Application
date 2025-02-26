/* eslint-disable no-unused-vars */
import React from "react";
import userService from "../services/getUser";

function Home() {
  const getUser = async () => {
    try {
      const response = await userService.getUserData();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>Home</h1>
      <button onClick={getUser}>getUser</button>
    </div>
  );
}

export default Home;
