/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { Avatar } from "antd";
import useAuth from "../hooks/useAuth";
import MessageInput from "../components/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/asyncCalls";

function Chat2({ changeScreen }) {
  const socket = useSocket();
  const { user } = useAuth();
  const [typing, setTyping] = useState(false);

  const { currentRecipient, messages } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //User ID and Current Receiver ID
  const userId = user._id;

  useEffect(() => {
    socket.on("receive", (messages) => {
      dispatch(setMessages(messages));
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

    return () => {
      dispatch(setMessages([])); // remove previous messages when unmount
    };
  }, [user._id, socket]);

  return (
    <div className="h-screen  ">
      {/* Chat screen headers */}
      <div className="bg-gray-300 flex gap-3 p-2 rounded-t-md">
        <div>
          <IoMdArrowBack
            size={"30px"}
            className="cursor-pointer hover:text-gray-700 inline-block"
            onClick={() => changeScreen(currentRecipient)}
          />
          <Avatar
            size={"large"}
            src={
              currentRecipient.profilePic ? (
                currentRecipient.profilePic
              ) : (
                <RxAvatar className="inline-block text-gray-800 text-4xl" />
              )
            }
          ></Avatar>
        </div>
        <div>
          <h2>{currentRecipient.username}</h2>
          {/* <p>{online ? "Online" : "Offline"}</p> */}
        </div>
      </div>

      {/* Message section */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-220px)] border border-indigo-200 ">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`content ${
              msg.senderID === userId ? "user" : "sender"
            } p-5`}
          >
            <span
              className={` ${
                msg.senderID === userId ? "userClr" : "senderClr"
              }`}
            >
              {msg.senderID !== userId && (
                <Avatar
                  src={
                    currentRecipient.profilePic ? (
                      currentRecipient.profilePic
                    ) : (
                      <RxAvatar className="inline-block text-gray-500 text-2xl" />
                    )
                  }
                ></Avatar>
              )}
              {msg.chat}
            </span>
          </div>
        ))}
      </div>
      {/* Message input section */}
      <MessageInput />
    </div>
  );
}

export default Chat2;
