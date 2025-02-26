/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";

function Nav() {
  const { user } = useAuth();
  return (
    <div>
      <h1>NAv</h1>
    </div>
  );
}

export default Nav;
