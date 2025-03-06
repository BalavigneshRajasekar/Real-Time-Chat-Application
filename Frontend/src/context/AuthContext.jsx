/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utilities/axiosConfig";

export const userAuth = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  useEffect(() => {
    refreshUser();
  }, []);

  //Function to create new User
  const registerUser = async (formdata) => {
    setIsSigning(true);
    try {
      const response = await axiosInstance.post("/users/auth/signup", formdata);
      return response.data.message;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    } finally {
      setIsSigning(false);
    }
  };
  //Function to login User
  const loginUser = async (formdata) => {
    setIsLogging(true);
    try {
      const response = await axiosInstance.post("/users/auth/login", formdata);
      console.log(response.data.user);

      setUser(response.data.user);
      return response.data.message;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    } finally {
      setIsLogging(false);
    }
  };
  //Function to logout
  const logoutUser = async () => {
    try {
      await axiosInstance.post("/users/auth/logout");
      setUser(null);
      return "Logged Out Successfully";
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    }
  };

  //Function to  refresh the user
  const refreshUser = async () => {
    try {
      const response = await axiosInstance.get("/users/auth/user");
      console.log(response.data);

      setUser(response.data);
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    }
  };
  return (
    <>
      <userAuth.Provider
        value={{
          user,
          setUser,
          registerUser,
          isSigning,
          loginUser,
          isLogging,
          logoutUser,
        }}
      >
        {children}
      </userAuth.Provider>
    </>
  );
};

export default AuthProvider;
