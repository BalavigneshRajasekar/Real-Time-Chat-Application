/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const email = query.get("email");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [confirmError, setConfirmError] = useState(null);
  const [error, setError] = useState({
    uppercase: null,
    lowercase: null,
    numbers: null,
    specialCharacters: null,
    length: null,
  });

  const setPasswords = (e) => {
    let incomingValue = e.target.value;
    setError({
      uppercase: /[A-Z]/.test(incomingValue) ? true : false,
      lowercase: /[a-z]/.test(incomingValue) ? true : false,
      numbers: /[0-9]/.test(incomingValue) ? true : false,
      specialCharacters: /[@$#!%^&*]/.test(incomingValue) ? true : false,
      length: incomingValue.length >= 6 ? true : false,
    });
    setNewPassword(e.target.value);
  };

  const submit = () => {
    // send password reset request to server with email and token
    if (newPassword?.length > 0 && newPassword == confirmPassword) {
      console.log("same");
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-r from-gray-900 to-sky-950 items-center min-h-screen max-h-fit">
      {/* Section A */}
      {/* Reset password contents */}
      <div className="p-5">
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        {/* Display welcome message */}
        <h1 className="font-bold text-2xl lg:text-4xl text-center bg-gradient-to-l from-amber-300 to-amber-900   bg-clip-text text-transparent ">
          Hi ! Vignesh
        </h1>
        <p className="text-center">
          Please Reset your password, keep remember it or else no issues we have
          your back
        </p>
        {/* Reset password form */}
        <div className="relative">
          <input
            value={newPassword}
            onChange={setPasswords}
            className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-gray-400 border-gray-300 focus:outline-none focus:border-amber-600"
            type={showPassword.newPassword ? "text" : "password"}
            name="password"
            placeholder="new Password"
          />
          {showPassword.newPassword ? (
            <FaRegEye
              className="absolute  right-5 top-8 cursor-pointer text-white text-xl"
              onClick={() =>
                setShowPassword({ ...showPassword, newPassword: false })
              }
            />
          ) : (
            <FaRegEyeSlash
              className="absolute right-5 top-8 cursor-pointer text-white text-xl"
              onClick={() =>
                setShowPassword({ ...showPassword, newPassword: true })
              }
            />
          )}
        </div>
        {/* password must contains */}

        <ol className="p-7 text-white list-disc">
          <li className={`${error.length ? "text-green-600" : "text-white"}`}>
            Password must contain at least 6 characters
          </li>
          <li
            className={`${error.uppercase ? "text-green-600" : "text-white"}`}
          >
            Password must contain at least one uppercase letter
          </li>
          <li
            className={`${error.lowercase ? "text-green-600" : "text-white"}`}
          >
            Password must contain at least one lowercase letter
          </li>
          <li className={`${error.numbers ? "text-green-600" : "text-white"}`}>
            Password must contain at least one number
          </li>
          <li
            className={`${
              error.specialCharacters ? "text-green-600" : "text-white"
            }`}
          >
            Password must contain at least one special character (e.g.!@#$%^&*)
          </li>
        </ol>
        <div className="relative">
          <input
            //Every validation pass it return as true so we convert it to false to disable
            disabled={!Object.values(error).every((value) => value == true)}
            className={`mt-3 disabled:cursor-not-allowed p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-gray-400 border-gray-300 focus:outline-none focus:border-amber-600`}
            type={showPassword.confirmPassword ? "text" : "password"}
            name="ConfirmPassword"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showPassword.confirmPassword ? (
            <FaRegEye
              className="absolute  right-5 top-8 cursor-pointer text-white text-xl"
              onClick={() =>
                setShowPassword({ ...showPassword, confirmPassword: false })
              }
            />
          ) : (
            <FaRegEyeSlash
              className="absolute right-5 top-8 cursor-pointer text-white text-xl"
              onClick={() =>
                setShowPassword({ ...showPassword, confirmPassword: true })
              }
            />
          )}
        </div>
        {confirmPassword && (
          <span className="text-red-600">
            * Password doesn&lsquo;t match with current password
          </span>
        )}
        {/* Submit button */}
        <button
          className="w-full h-14 p-2 mt-3 rounded-md bg-gradient-to-l from-orange-300 to-orange-900 text-white hover:bg-gradient-to-r from-orange-300 to-orange-900"
          onClick={() => submit()}
        >
          Change
        </button>
      </div>

      {/* Section B */}
      {/* Terms and conditions */}
    </div>
  );
}

export default ResetPassword;
