/* eslint-disable no-unused-vars */

import { Provider } from "react-redux";

import "./App.css";
import user from "./store/userStore";
import AuthProvider from "./context/AuthContext";
import AppRouters from "./routes/AppRouters";

function App() {
  return (
    <>
      <Provider store={user}>
        <AuthProvider>
          <AppRouters />
        </AuthProvider>
      </Provider>
    </>
  );
}

export default App;
