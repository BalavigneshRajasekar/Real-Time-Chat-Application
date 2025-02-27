/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import socket from "../socket";
function Chat2() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const userId = 2;
  const receiver = 1;
  useEffect(() => {
    console.log("chat2");

    socket.emit("join", userId);

    socket.on("receive", (messages) => {
      setMessages((prevMessages) => [...prevMessages, messages]);
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
  return (
    <div>
      <h1>User 2</h1>
      <div className="messageBar">
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
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="write message"
      ></input>
      <button onClick={sendMessage}> send</button>
    </div>
  );
}

export default Chat2;
