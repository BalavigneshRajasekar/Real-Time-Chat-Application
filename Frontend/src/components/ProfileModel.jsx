/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "motion/react";
import { Avatar, Image, Upload } from "antd";
import useAuth from "../hooks/useAuth";
import { FaCamera } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setProfileModal } from "../store/asyncCalls";
function ProfileModel() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <>
      {/* Animation div */}
      <motion.div
        onClick={() => dispatch(setProfileModal(false))}
        className="w-screen absolute rounded-2xl text-center top-1 flex justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "tween" }}
        key="logout-modal"
      >
        {/* Main Div */}
        <div className="w-full lg:w-3xl h-full rounded-2xl p-10 bg-gray-900">
          <h2 className="text-white">Profile</h2>
          <div className="w-full  h-fit">
            <Image
              src={user.profilePic ? user.profilePic : "user.png"}
              style={{ width: "150px", height: "150px", borderRadius: "50%" }}
            ></Image>
            <Upload className="relative">
              <FaCamera className="text-white text-2xl inline-block absolute bottom-0 hover:cursor-pointer active:scale-75 transition-all" />
            </Upload>
          </div>
          {/* User Data Container */}
          <div className="text-left">
            <label className="text-white block" htmlFor="name">
              Name:
            </label>
            <input
              name="name"
              value={user.username}
              disabled
              className="w-full text-white uppercase  p-3 rounded-xl bg-gradient-to-l   from-orange-300 to-orange-900"
            ></input>
            <label className="text-white mt-3 inline-block " htmlFor="email">
              Email:
            </label>
            <input
              name="email"
              value={user.email}
              disabled
              className="w-full text-white uppercase  p-3 rounded-xl bg-gradient-to-l   from-orange-300 to-orange-900"
            ></input>
          </div>
          {/* Group List */}
          <div>
            <h2 className="text-white mt-10 text-left">Groups IN</h2>
            <div className="flex text-white">
              {/* Group Card */}
              <div>
                <Avatar
                  src={"chat.png"}
                  style={{ width: "50px", height: "50px" }}
                ></Avatar>
                <h3>Friends Forever</h3>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default ProfileModel;
