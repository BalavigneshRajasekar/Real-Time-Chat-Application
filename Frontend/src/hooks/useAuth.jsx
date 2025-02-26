/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { userAuth } from "../context/AuthContext";

//This useAuth hook act as useContext with the following CONTEXT API
const useAuth = () => {
  return useContext(userAuth);
};

export default useAuth;
