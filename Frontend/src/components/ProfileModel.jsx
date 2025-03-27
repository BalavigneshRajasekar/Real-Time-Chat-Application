/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import { Avatar } from "antd";
function ProfileModel() {
  return (
    <>
      <motion.div
        className="w-screen min-h-40 absolute rounded-2xl text-center top-52 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "tween" }}
        key="logout-modal"
      >
        <div className="w-fit h-full rounded-2xl p-10 bg-gray-900">
          <h2 className="text-white">Profile</h2>
          <div>
            <Avatar src={"user.png"} className="w-50 "></Avatar>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ProfileModel;
