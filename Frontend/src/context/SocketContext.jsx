/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, SetSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();

  useEffect(() => {
    const socket = io("https://real-time-chat-application-ttav.onrender.com", {
      withCredentials: true,
    });
    SetSocket(socket);
    socket.on("connect", () => {
      console.log("User connected" + socket.id);
    });
    //Join socket when User Login
    if (user) {
      socket.emit("join", user._id);
    }
    //Get online users when connected
    socket.on("onlineUsers", (Users) => {
      setOnlineUsers(Users);
    });

    //Disconnect socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [user]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
