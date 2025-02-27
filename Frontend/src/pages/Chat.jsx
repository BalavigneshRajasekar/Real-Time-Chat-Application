/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import socket from "../socket";
function Chat() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const userId = 1;
  const receiver = 2;
  useEffect(() => {
    socket.emit("join", userId);
    socket.on("receive", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
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
      <h1>User1</h1>
      <div className="messageBar">
        {messages.map((msg, i) => (
          <div key={i}>{msg.message}</div>
        ))}
      </div>

      <input
        onChange={(e) => setMessage(e.target.value)}
        placeholder="add message"
      ></input>
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
}

export default Chat;
