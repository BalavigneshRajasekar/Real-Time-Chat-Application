/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utilities/axiosConfig";
import { auth, signInWithPopup, provider } from "../config/firebaseConfig";

export const userAuth = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [restLinkLoading, setRestLinkLoading] = useState(false);

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

      setUser(response.data);
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  //Function to google Login
  const googleLogin = async () => {
    try {
      //Get Auth token from Google
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      //Send token to the server to get User data
      const response = await axiosInstance.post("/users/auth/google", {
        tokenId: token,
      });
      setUser(response.data.user);
      return response.data.message;
    } catch (error) {
      console.error(error);
      throw new Error(error.response.data.message);
    }
  };

  // Generate Reset code
  const generateResetCode = async (email) => {
    setResetPasswordLoading(true);
    try {
      const response = await axiosInstance.post(
        "/users/forgetPassword/resetCode",
        { email }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(e.message);
    } finally {
      setResetPasswordLoading(false);
    }
  };

  //Function to generate Reset password Link
  const resetPasswordLink = async (code, token) => {
    setRestLinkLoading(true);
    try {
      const response = await axiosInstance.post(
        "/users/forgetPassword/resetLink",
        { code },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.message;
    } catch (e) {
      console.error(e);
      if (e.status === 400) throw new Error("Code Expired");
      throw new Error(e.message);
    } finally {
      setRestLinkLoading(false);
    }
  };

  //Function to Make API call to update reset password to DB
  const updatePassword = async (token, password) => {
    try {
      const response = await axiosInstance.post(
        "/users/forgetPassword/reset",
        { password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.message;
    } catch (e) {
      console.error(e);
      if (e.status === 400) throw new Error("Link Expired");
      throw new Error(e.message);
    }
  };

  //Function toi upload profile
  const uploadProfilePic = async (profile) => {
    console.log("context", profile);

    try {
      const response = await axiosInstance.post("/app/addProfile", profile);
      return response.data.message;
    } catch (e) {
      console.log("context", e);

      throw new Error(e);
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
          googleLogin,
          generateResetCode,
          resetPasswordLoading,
          resetPasswordLink,
          restLinkLoading,
          updatePassword,
          uploadProfilePic,
        }}
      >
        {children}
      </userAuth.Provider>
    </>
  );
};

export default AuthProvider;
