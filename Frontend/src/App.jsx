/* eslint-disable no-unused-vars */

import { Provider } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";

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
      </Provider>
    </>
  );
}

export default App;
