/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";

export const userAuth = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <userAuth.Provider value={{ user, setUser, loading, setLoading }}>
        {children}
      </userAuth.Provider>
    </>
  );
};

export default AuthProvider;
