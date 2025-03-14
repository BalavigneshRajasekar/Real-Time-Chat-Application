/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { RxAvatar } from "react-icons/rx";
import { IoMdArrowBack } from "react-icons/io";
import { Avatar, Image, message } from "antd";
import useAuth from "../hooks/useAuth";
import MessageInput from "../components/MessageInput";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, resetMessages, getMessages } from "../store/asyncCalls";
import ChatScreenHeader from "../components/ChatScreenHeader";

function Chat2({ changeScreen }) {
  const { socket } = useSocket();
  const { user } = useAuth();
  const lastMessageRef = useRef();
  const { onlineUsers } = useSocket();
  const [typing, setTyping] = useState(true);

  const { currentRecipient, messages, messageLoading } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();

  //User ID and Current Receiver ID
  const userId = user._id;

  useEffect(() => {
    dispatch(getMessages(currentRecipient._id));
  }, [currentRecipient]);

  useEffect(() => {
    //TODO get Messages from Db

    socket.on("receive", (messages) => {
      dispatch(setMessages(messages));
    });

    socket.on("typing", (value) => {
      setTyping(value);
      console.log(value);
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
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="h-screen  ">
      {/* Chat screen headers */}
      <ChatScreenHeader changeScreen={changeScreen} />
      {messageLoading ? (
        <div className="h-[calc(100vh-220px)] flex items-center justify-center">
          <div className="w-14 h-14 rounded-4xl border-8 border-t-amber-500 animate-spin"></div>
        </div>
      ) : (
        // Message container
        <div className="flex-1 overflow-y-auto h-[calc(100vh-220px)] border border-indigo-200 border-b-0 ">
          {messages?.map((msg, i) => {
            let currentMsgDate = new Date(msg.createdAt).toDateString();
            let previousMsgDate = new Date(
              messages[i - 1]?.createdAt
            ).toDateString();

            return (
              <div key={i}>
                {(i == 0 || currentMsgDate !== previousMsgDate) && (
                  <div className="text-center">
                    <span className="bg-gray-400 px-1 rounded-4xl">
                      {new Date(msg.createdAt).toDateString()}
                    </span>
                  </div>
                )}
                <div
                  key={i}
                  className={`content ${
                    msg.senderID == userId ? "user" : "sender"
                  } px-1 py-4`}
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

                    <span className="text-gray-500 text-xs ">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add scroll to bottom so dummy div to track */}
          {typing == currentRecipient._id ? (
            <div className="bg-gray-100 w-fit flex justify-center gap-2 px-6 py-4 rounded-4xl  ml-5 mb-5 mt-3 ">
              <div className="w-3 h-3 bg-black rounded-4xl ease-in-out animate-bounce"></div>
              <div className="w-3 h-3 bg-black rounded-4xl ease-in-out animate-bounce"></div>
              <div className="w-3 h-3 bg-black rounded-4xl ease-in-out animate-bounce"></div>
            </div>
          ) : null}
          <div ref={lastMessageRef}></div>
        </div>
      )}
      {/* Message input section */}
      <MessageInput />
    </div>
  );
}

export default Chat2;
