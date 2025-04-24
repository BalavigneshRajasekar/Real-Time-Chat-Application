/* eslint-disable no-unused-vars */
import { Avatar } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { setAddGroupUsers, setAddUserPopup } from "../store/asyncCalls";

function AddUserPopup() {
  const dispatch = useDispatch();
  const { receiverData, addGroupUsers } = useSelector((store) => store.users);

  const addUsers = (e, user) => {
    console.log(user);

    dispatch(setAddGroupUsers({ isChecked: e.target.checked, user }));
  };

  //Checked when user already selected
  const userAdded = (newUser) => {
    return addGroupUsers.some((user) => user._id == newUser._id);
  };
  return (
    <div className="w-fit h-fit bg-white rounded-2xl absolute top-72 p-3">
      <div className="flex justify-between  items-center ">
        <h1>Select user :</h1>
        <MdCancel
          className="inline-block text-2xl hover:text-red-700 active:scale-75 transition-all"
          onClick={() => dispatch(setAddUserPopup())}
        />
      </div>
      <div>
        <input type="search" className="w-100"></input>
      </div>
      <div className="min-h-20 max-h-52 overflow-y-auto mt-3">
        {receiverData.map((users, i) => (
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
