/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function AddUserPopup() {
  const { receiverData } = useSelector((store) => store.users);

  const addUsers = () => {};
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
