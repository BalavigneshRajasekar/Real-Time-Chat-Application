/* eslint-disable no-unused-vars */
import React from "react";
import useAuth from "../hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setLogoutModal, setProfileModal } from "../store/asyncCalls";

function Nav() {
  const dispatch = useDispatch();
  return (
    <div className="">
      <div className="p-1 bg-neutral-900 text-white text-2xl flex justify-between items-center">
        <div className="flex justify-center items-center gap-2">
          <img src="./chat.png" className="w-11"></img>
          <h2>ChatHub</h2>
        </div>
        <div className="flex gap-3  p-5">
          <p
            onClick={() => dispatch(setProfileModal())}
            className="inline-block cursor-pointer px-3 py-1 w-fit hover:bg-white rounded-4xl  transition-all ease-in-out hover:scale-110 active:scale-90"
          >
            <MdOutlineSettings size={"35px"} />
          </p>
          <p
            onClick={() => dispatch(setLogoutModal())}
            className="inline-block cursor-pointer px-3 py-1 w-fit hover:bg-white rounded-4xl  transition-all ease-in-out hover:scale-110 active:scale-90"
          >
            <IoIosLogOut className="inline-block " size={"35px"} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Nav;
