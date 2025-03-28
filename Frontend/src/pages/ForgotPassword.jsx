/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { generateResetCode, resetPasswordLoading } = useAuth();
  const navigate = useNavigate();

  const sendResetCode = async () => {
    // Call your backend API to send a password reset email
    try {
      const response = await generateResetCode(email);
      toast.success(response.message);
      navigate(`/resetCode?token=${response.token}&&email=${email}`);
    } catch (e) {
      console.error(e);
      // Display error message
      toast.error(e.message);
    } finally {
      setEmail("");
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-r from-gray-900 to-sky-950 items-center min-h-screen max-h-fit">
      {/* Section A */}
      {/* Forgot password contents */}
      <div className="p-5">
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        <h1 className="font-bold text-2xl lg:text-4xl lg:h-12 text-center bg-gradient-to-l from-amber-300 to-amber-900   bg-clip-text text-transparent ">
          Forgot password ?
        </h1>
        <p className="text-center ">
          Enter your registered email to receive a password reset link
        </p>
        {/* Email input */}
        <label className="text-white">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-14 p-2 mt-3 rounded-md text-white border focus:border-amber-600 focus:outline-none"
          type="email"
          placeholder="Enter your email"
        />
        {/* Submit button */}
        <button
          disabled={resetPasswordLoading}
          className="w-full h-14 p-2 mt-3 rounded-md bg-gradient-to-l from-orange-300 to-orange-900 text-white hover:bg-gradient-to-r from-orange-300 to-orange-900"
          onClick={sendResetCode}
        >
          {resetPasswordLoading ? "Sending..." : "Send Reset Code"}
        </button>
        {/* Back to login link */}
        <p className="mt-4 text-center text-white">
          remember password :<Link to="/login"> Sign In</Link>
        </p>
      </div>
      {/* Section B */}
      {/* Design column for desktop */}
    </div>
  );
}

export default ForgotPassword;
