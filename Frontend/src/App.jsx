/* eslint-disable no-unused-vars */

import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

import "./App.css";
import user from "./store/userStore";
import AuthProvider from "./context/AuthContext";
import AppRouters from "./routes/AppRouters";
import SocketProvider from "./context/SocketContext";

function App() {
  return (
    <>
      <Provider store={user}>
        <SocketProvider>
          <AuthProvider>
            <AppRouters />
          </AuthProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </SocketProvider>
      </Provider>
    </>
  );
}

export default App;
