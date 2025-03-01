/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import socket from "../socket";
function Chat2() {
  const [message, setMessage] = useState();
  const [online, setOnline] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const userId = 2;
  const receiver = 1;
  useEffect(() => {
    console.log("chat2");

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
      <h1>User 2</h1>
      <div className="messageBar">
        <div>
          <h2>{receiver}</h2>
          <span>{online ? "Online" : "Offline"}</span>
        </div>
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
        {typing && <div>User is typing...</div>}
      </div>
      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="write message"
      ></input>
      <button onClick={sendMessage}> send</button>
    </div>
  );
}

export default Chat2;
