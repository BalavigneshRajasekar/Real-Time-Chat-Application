/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddGroupUsers } from "../store/asyncCalls";

function AddUserPopup() {
  const dispatch = useDispatch();
  const { receiverData } = useSelector((store) => store.users);

  const addUsers = (e, user) => {
    console.log(user);
    dispatch(setAddGroupUsers({ isChecked: e.target.checked, user }));
  };
  return (
    <div className="w-fit h-fit bg-white rounded-2xl absolute top-72 p-3">
      <h1>Select User</h1>
      <div className="min-h-52 ">
        {receiverData.map((users, i) => (
          <div key={i} className="flex gap-3">
            <input type="checkbox" onChange={(e) => addUsers(e, users)}></input>
            <Avatar src={users.profilePic}></Avatar>
            <h2>{users.username}</h2>
          </div>
        ))}
      </div>
      <div className="flex justify-around">
        <button>close</button>
        <button>Add</button>
      </div>
    </div>
  );
}

export default AddUserPopup;
