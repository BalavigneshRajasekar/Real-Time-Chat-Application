import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

// This hook acts as useContext with the following CONTEXT API
export const useSocket = () => {
  return useContext(SocketContext);
};
