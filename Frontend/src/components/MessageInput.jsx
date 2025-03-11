/* eslint-disable no-unused-vars */
import { Upload } from "antd";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/asyncCalls";

function MessageInput() {
  const [text, setText] = useState();
  const { currentRecipient } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const socket = useSocket();
  const { user } = useAuth();

  const userId = user._id;
  const receiver = currentRecipient._id;

  const sendMessage = () => {
    const newMessage = {
      senderId: user._id,
      receiverID: receiver,
      chat: text,
    };
    dispatch(setMessages(newMessage));
    setText("");

    socket.emit("sendMessage", { userId, receiver, text });
  };

  const handleFocus = () => {
    socket.emit("listenTyping");
  };
  const handleBlur = () => {
    socket.emit("stopTyping", receiver);
  };
  return (
    <div>
      <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-b-md  w-full px-3">
        <textarea
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="outline-0 w-full resize-none max-h-32 overflow-y-auto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          rows={1}
        />
        <Upload>
          <FaImage className="text-3xl active:scale-95 transition-all"></FaImage>
        </Upload>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MessageInput;
