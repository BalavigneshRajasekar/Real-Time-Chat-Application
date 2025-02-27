/* eslint-disable no-unused-vars */
import React from "react";
import userService from "../services/getUser";
import useAuth from "../hooks/useAuth";

function Home() {
  const { loading } = useAuth();
  const getUser = async (key) => {
    try {
      const response = await userService.getUserData(key);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <h1>Home</h1>
      {loading ? <p>loading...</p> : null}
      <button onClick={() => getUser("getUser")}>getUser</button>
    </div>
  );
}

export default Home;
