/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";

function GroupChatModal() {
  const dispatch = useDispatch();
  return (
    <motion.div
      className="w-screen min-h-40 absolute rounded-2xl text-center top-52 flex justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ type: "tween" }}
      key="logout-modal"
    >
      <div className="w-fit h-full rounded-2xl p-10 bg-gray-900">
        <h2 className="text-white">Are you sure want to Logout ?</h2>
        <div className="mt-6 flex justify-around">
          <button className="px-4 py-2 rounded-4xl bg-red-500 hover:bg-red-700 text-white">
            No
            <ImCancelCircle size={"25px"} className="inline-block ml-3" />
          </button>

          <button className="px-4 py-2 rounded-4xl bg-green-500 hover:bg-green-700 text-white ml-4">
            Yes
            <TiTick size={"25px"} className="inline-block ml-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default GroupChatModal;
