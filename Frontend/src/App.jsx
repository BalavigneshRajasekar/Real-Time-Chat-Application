/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Provider } from "react-redux";

import "./App.css";
import user from "./store/userStore";
import Views from "./Views";

function App() {
  return (
    <>
      <h1>Social Media app</h1>
      <Provider store={user}>
        <Views />
      </Provider>
    </>
  );
}

export default App;
