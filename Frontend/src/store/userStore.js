/* eslint-disable no-unused-vars */
import { configureStore } from "@reduxjs/toolkit";
import asyncCalls from "./asyncCalls";
const user = configureStore({
  reducer: {
    // Define your reducers here
    users: asyncCalls,
  },
});

export default user;
