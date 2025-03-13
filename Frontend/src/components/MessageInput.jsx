/* eslint-disable no-unused-vars */
import { Upload } from "antd";
import React, { useState } from "react";
import { FaImage } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/asyncCalls";
import { MdOutlineCancel } from "react-icons/md";

function MessageInput() {
  const [text, setText] = useState();
  const [img, setImg] = useState(null);
  const { currentRecipient } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { user } = useAuth();

  const userId = user._id;
  const receiver = currentRecipient._id;

  // Function send message to socket and save to DB
  const sendMessage = () => {
    const newMessage = {
      senderID: user._id,
      receiverID: currentRecipient._id,
      chat: text,
      image: img,
      createdAt: Date.now(),
    };

    dispatch(setMessages(newMessage));
    socket.emit("sendMessage", {
      userId,
      receiver,
      text,
      img,
      createdAt: Date.now(),
    });
    setText("");
    setImg(null);
  };

  const handleFocus = () => {
    socket.emit("listenTyping");
  };
  const handleBlur = () => {
    socket.emit("stopTyping", receiver);
  };

  const handleImageUpload = (e) => {
    const file = e.file.originFileObj;
    const reader = new FileReader();

    // convert image to base64
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImg(e.target.result);
    };
    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };
  return (
    <>
      <div className={img ? "absolute -mt-45 w-40 h-40 rounded-2xl" : "hidden"}>
        <MdOutlineCancel
          className="absolute right-0 -top-7 text-white text-2xl"
          onClick={() => setImg(null)}
        />
        <img src={img} className="w-40  rounded-2xl"></img>
      </div>
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
        <Upload accept=".jpg" fileList={[]} onChange={handleImageUpload}>
          <FaImage className="text-3xl active:scale-95 transition-all"></FaImage>
        </Upload>
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default MessageInput;
