/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import PasswordConstraints from "../components/PasswordConstraints";

function ResetPassword() {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const username = query.get("username");
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [newPassword, setNewPassword] = useState(null);
  const [success, setSuccess] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: false,
    confirmPassword: false,
  });
  const [error, setError] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    specialCharacters: false,
    length: false,
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const setPasswords = (e) => {
    //When ever User enter new password we make the error as false
    setPasswordErrors({ ...passwordErrors, newPassword: false });
    setNewPassword(e.target.value);
  };

  const validateConfirmPassword = (e) => {
    //If new password and the current target is equal make it false to take the error message
    if (newPassword == e.target.value) {
      setPasswordErrors({ ...passwordErrors, confirmPassword: false });
    }
    //Here it set the confirm password
    setConfirmPassword(e.target.value);
  };

  const submit = async () => {
    // Check password field is empty or not
    //Check both password are same
    try {
      if (!newPassword) {
        setPasswordErrors({ ...passwordErrors, newPassword: true });
      } else if (newPassword !== confirmPassword) {
        setPasswordErrors({ ...passwordErrors, confirmPassword: true });
      } else {
        // Make API call to update password using the token and new password
        const response = await updatePassword(token, newPassword);
        toast.success(response);
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (e) {
      // Handle error here
      console.error(e);
      toast.error(e.message);
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-r from-gray-900 to-sky-950 items-center min-h-screen max-h-fit place-items-center">
      {/* Section A */}
      {/* Reset password contents */}
      <div className="p-5">
        <div className="flex justify-center p-10">
          <img src="../../public/chat.png" className="w-20 "></img>
        </div>
        {/* Display welcome message */}
        <h1 className="font-bold text-2xl lg:text-4xl text-center bg-gradient-to-l from-amber-300 to-amber-900   bg-clip-text text-transparent ">
          Hi ! {username}
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
          {passwordErrors.newPassword && (
            <span className="text-red-600">* Plz enter the password</span>
          )}
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
        <div className="lg:hidden">
          <PasswordConstraints
            error={error}
            setError={setError}
            password={newPassword}
          />
        </div>

        <div className="relative">
          <input
            //Every validation pass it return as true so we convert it to false to disable
            disabled={!Object.values(error).every((value) => value == true)}
            className={`mt-3 disabled:cursor-not-allowed p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-gray-400 border-gray-300 focus:outline-none focus:border-amber-600`}
            type={showPassword.confirmPassword ? "text" : "password"}
            name="ConfirmPassword"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={validateConfirmPassword}
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
        {passwordErrors.confirmPassword && (
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
      {/* password must contains */}
      <div className=" hidden lg:block bg-cyan-950 p-5 rounded-md mt-40">
        <h2 className="text-4xl">Password constraints</h2>
        <div className="w-fit  ">
          <PasswordConstraints
            error={error}
            setError={setError}
            password={newPassword}
          />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
