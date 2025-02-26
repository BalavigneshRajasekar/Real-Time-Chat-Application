/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Provider } from "react-redux";

import "./App.css";
import user from "./store/userStore";
import Views from "./Views";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <>
      <Provider store={user}>
        <MainLayout />
      </Provider>
    </>
  );
}

export default App;
