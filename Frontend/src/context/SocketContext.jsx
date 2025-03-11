/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, SetSocket] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    SetSocket(socket);
    socket.on("connect", () => {
      console.log("User connected" + socket.id);
    });
    //Join socket when User Login
    if (user) {
      socket.emit("join", user._id);
    }
    //Disconnect socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user]);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
