/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { setAddGroupUsers, setAddUserPopup } from "../store/asyncCalls";

function AddUserPopup() {
  const dispatch = useDispatch();
  const { receiverData } = useSelector((store) => store.users);

  const addUsers = (e, user) => {
    console.log(user);
    dispatch(setAddGroupUsers({ isChecked: e.target.checked, user }));
  };
  return (
    <div className="w-fit h-fit bg-white rounded-2xl absolute top-72 p-3">
      <div className="flex justify-between  items-center ">
        <h1>Select user</h1>
        <MdCancel
          className="inline-block text-2xl hover:text-red-700 active:scale-75 transition-all"
          onClick={() => dispatch(setAddUserPopup())}
        />
      </div>
      <div className="min-h-fit max-h-52 overflow-y-auto mt-3">
        {receiverData.map((users, i) => (
          <div key={i} className="flex gap-3">
            <input type="checkbox" onChange={(e) => addUsers(e, users)}></input>
            <Avatar src={users.profilePic}></Avatar>
            <h2>{users.username}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddUserPopup;
