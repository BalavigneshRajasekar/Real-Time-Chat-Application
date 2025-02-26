/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

export const userAuth = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);

  return (
    <>
      <userAuth.Provider value={{ user, setUser }}>
        {children}
      </userAuth.Provider>
    </>
  );
};

export default AuthProvider;
