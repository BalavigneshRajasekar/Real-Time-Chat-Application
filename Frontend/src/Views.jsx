/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./store/asyncCalls";

function Views() {
  const { data, error, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(data);
    console.log(error);
    console.log(loading);
  }, [data]);
  return (
    <div>
      <h1>Show user data</h1>
      <button onClick={() => dispatch(getUserData("1234"))}>get Data</button>
    </div>
  );
}

export default Views;
