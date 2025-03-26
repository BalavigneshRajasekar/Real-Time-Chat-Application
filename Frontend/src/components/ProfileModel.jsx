/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

function ProfileModel({ show }) {
  return (
    <>
      {show && (
        <div className="absolute h-60 w-60 bg-white">
          <h1>Profile</h1>
        </div>
      )}
    </>
  );
}

export default ProfileModel;
