/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import socket from "../socket";
function Chat() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const userId = 1;
  const receiver = 2;
  useEffect(() => {
    socket.emit("join", userId);
    socket.on("receive", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("typing", (value) => {
      console.log(value);

      setTyping(value);
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
      <h1>User1</h1>
      <div className="messageBar">
        {messages.map((msg, i) => (
          <div key={i}>{msg.message}</div>
        ))}
        {typing && <div> typing...</div>}
      </div>

      <input
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="add message"
      ></input>
      <button onClick={() => sendMessage()}>Send</button>
    </div>
  );
}

export default Chat;
