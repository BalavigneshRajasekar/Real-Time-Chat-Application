/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { CiCirclePlus } from "react-icons/ci";
import { setAddUserPopup, setGroupChatModal } from "../store/asyncCalls";
import AddUserPopup from "./AddUserPopup";
import { Avatar, Tag } from "antd";

function GroupChatModal() {
  const { addUserPopup, addGroupUsers } = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const closeProfileModel = (e) => {
    //Find the surrounded Div ,
    //If the div has the className close profile
    //else No
    if (e.target.classList.contains("profileBox")) {
      dispatch(setGroupChatModal());
    }
  };
  useEffect(() => {
    return () => {};
  }, []);
  return (
    <motion.div
      className="w-screen rounded-2xl text-center profileBox flex justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "tween" }}
      key="logout-modal"
      onClick={(e) => closeProfileModel(e)}
    >
      <div className="w-full h-full lg:w-2xl rounded-2xl p-10 bg-gray-900">
        <div className="flex justify-end">
          <ImCancelCircle
            className="text-white text-2xl active:scale-75 transition-all"
            onClick={() => dispatch(setGroupChatModal())}
          />
        </div>
        <h2 className="text-white">Create Group Chat</h2>
        <div className="text-left text-white">
          <h2>Group Name :</h2>
          <input
            type="text"
            className="w-full p-3 border-amber-600 outline-0 border-2 rounded-2xl"
          ></input>
          <div className="w-full mt-3 p-3 border-amber-600 outline-0 border-2 rounded-2xl min-h-20">
            {addGroupUsers.length > 0 ? (
              <>
                {addGroupUsers.map((user, i) => (
                  <Tag key={i} color="green" closable>
                    <Avatar src={user.profilePic}></Avatar>
                    {user.username}
                  </Tag>
                ))}
              </>
            ) : (
              <h2 className="text center">Please add Users</h2>
            )}
          </div>
          <button
            className="mt-3 bg-amber-700 active:scale-75 transition-all hover:bg-amber-900"
            onClick={() => dispatch(setAddUserPopup())}
          >
            <CiCirclePlus className="inline-block mr-2" size={"25px"} />
            Add users
          </button>
        </div>
        <button className=" mt-3 bg-green-600 active:scale-75 transition-all hover:bg-green-900">
          Create Group
        </button>
      </div>
      {addUserPopup && <AddUserPopup />}
    </motion.div>
  );
}

export default GroupChatModal;
