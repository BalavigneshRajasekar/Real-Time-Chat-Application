/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import {
  searchGroupUser,
  setAddGroupUsers,
  setAddUserPopup,
} from "../store/asyncCalls";

function AddUserPopup() {
  const dispatch = useDispatch();
  const { groupSearchFilter, addGroupUsers } = useSelector(
    (store) => store.users
  );

  const addUsers = (e, user) => {
    console.log(user);

    dispatch(setAddGroupUsers({ isChecked: e.target.checked, user }));
  };

  //Checked when user already selected
  const userAdded = (newUser) => {
    return addGroupUsers.some((user) => user._id == newUser._id);
  };
  return (
    <div className="w-fit h-fit bg-white rounded-2xl absolute top-80 p-3">
      {/* PopUP header */}
      <div className="flex justify-between  items-center gap-3">
        <input
          autoFocus
          onChange={(e) => dispatch(searchGroupUser(e.target.value))}
          placeholder="Search User"
          type="search"
          className="w-full h-10 rounded-2xl p-3 text-center border-amber-600 border-2 outline-0"
        ></input>
        <MdCancel
          className="inline-block text-4xl hover:text-red-700 active:scale-75 transition-all"
          onClick={() => dispatch(setAddUserPopup())}
        />
      </div>
      {/* Popup Body */}
      <div className="min-h-20 max-h-52 overflow-y-auto mt-3">
        {groupSearchFilter.map((users, i) => (
          <div key={i} className="flex gap-3 mt-3 items-center">
            <input
              type="checkbox"
              onChange={(e) => addUsers(e, users)}
              checked={userAdded(users)}
            ></input>
            <img
              src={users.profilePic}
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            ></img>
            <h2>{users.username}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddUserPopup;
