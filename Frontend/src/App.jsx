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
      <AuthProvider>
        <Provider store={user}>
          <SocketProvider>
            <AppRouters />
          </SocketProvider>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </Provider>
      </AuthProvider>
    </>
  );
}

export default App;
