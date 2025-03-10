/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { Avatar } from "antd";

function Chat2({ receiverData, changeScreen }) {
  const socket = useSocket();
  const [message, setMessage] = useState();
  const [online, setOnline] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const userId = 2;
  const receiver = 1;
  useEffect(() => {
    console.log("chat2");
    console.log(receiverData);

    socket.emit("join", userId);

    socket.on("receive", (messages) => {
      setMessages((prevMessages) => [...prevMessages, messages]);
    });

    socket.on("typing", (value) => {
      console.log(value);

      setTyping(value);
    });

    // This going to check whether user online or not
    // socket.emit("verifyUser", receiver);
    // //Now we get the current status of user
    // socket.on("userOnline", (status) => {
    //   console.log(status);
    //   setOnline(status);
    // });

    socket.emit("onlineUser", (value) => {
      console.log(value);

      setOnline(value);
    });

    return () => {
      socket.off("receive");
    };
  }, [userId]);

  const sendMessage = () => {
    const newMessage = { userId: userId, message: message };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
    socket.emit("sendMessage", { userId, receiver, message });
  };

  const handleFocus = () => {
    socket.emit("listenTyping", receiver);
  };
  const handleBlur = () => {
    socket.emit("stopTyping", receiver);
  };
  return (
    <div>
      {/* Chat screen headers */}
      <div className="bg-gray-300 flex gap-3 p-2 rounded-md">
        <div>
          <IoMdArrowBack
            size={"30px"}
            className="cursor-pointer hover:text-gray-700 inline-block"
            onClick={() => changeScreen(receiverData)}
          />
          <Avatar
            size={"large"}
            src={
              receiverData.profilePic ? (
                receiver.profilePic
              ) : (
                <RxAvatar className="inline-block text-gray-800 text-4xl" />
              )
            }
          ></Avatar>
        </div>
        <div>
          <h2>{receiverData.username}</h2>
          <p>{online ? "Online" : "Offline"}</p>
        </div>
      </div>

      {/* Message section */}
      <div className="flex-1 overflow-y-auto h-screen">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`content ${msg.userId === userId ? "user" : "sender"}`}
          >
            <span
              className={` ${msg.userId === userId ? "userClr" : "senderClr"}`}
            >
              {msg.message}
            </span>
          </div>
        ))}
      </div>
      {/* Message input section */}
    </div>
  );
}

export default Chat2;
