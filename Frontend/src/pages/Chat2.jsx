/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { Avatar, Image } from "antd";
import useAuth from "../hooks/useAuth";
import MessageInput from "../components/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, resetMessages } from "../store/asyncCalls";
import ChatScreenHeader from "../components/ChatScreenHeader";

function Chat2({ changeScreen }) {
  const { socket } = useSocket();
  const { user } = useAuth();
  const lastMessageRef = useRef();
  const { onlineUsers } = useSocket();
  const [typing, setTyping] = useState(false);

  const { currentRecipient, messages } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //User ID and Current Receiver ID
  const userId = user._id;

  useEffect(() => {
    //TODO get Messages from Db

    socket.on("receive", (messages) => {
      dispatch(setMessages(messages));
    });

    socket.on("typing", (value) => {
      setTyping(value);
    });

    return () => {
      // remove previous messages when move to another receiver chat
      dispatch(resetMessages());
      socket.off("receive");
    };
  }, [user._id, socket, currentRecipient]);

  // UseEffect tract the the last chat to scroll
  useEffect(() => {
    // Scroll to bottom when new message arrives
    lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen  ">
      {/* Chat screen headers */}
      <ChatScreenHeader changeScreen={changeScreen} />

      {/* Message section */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-220px)] border border-indigo-200 border-b-0  ">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`content ${
              msg.senderID == userId ? "user" : "sender"
            } p-5`}
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
            <div
              className={`flex flex-col ml-2 gap-1 shadow-2xs ${
                msg.senderID == userId ? "userClr" : "senderClr"
              }`}
            >
              {msg.chat && <span className="">{msg.chat}</span>}

              {msg.image && (
                <Image
                  src={msg.image}
                  width={"300px"}
                  height={"300px"}
                  className="rounded-md"
                ></Image>
              )}

              <span className="text-gray-500 text-xs ">10:00 AM</span>
            </div>
          </div>
        ))}
        {/* Add scroll to bottom so dummy div to track */}
        <div ref={lastMessageRef}></div>
      </div>
      {/* Message input section */}
      <MessageInput />
    </div>
  );
}

export default Chat2;
