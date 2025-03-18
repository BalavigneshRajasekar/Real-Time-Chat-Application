/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-r from-gray-900 to-sky-950 items-center min-h-screen max-h-fit">
      {/* Forgot password contents */}
      <div className="p-5">
        <h1 className="font-bold text-2xl lg:text-4xl  text-center bg-gradient-to-l from-amber-300 to-amber-900   bg-clip-text text-transparent ">
          Forgot password ?
        </h1>
        <p className="text-center">
          Enter your email to receive a password reset link
        </p>
        {/* Email input */}
        <label className="text-white">Email</label>
        <input
          className="w-full h-14 p-2 mt-3 rounded-md text-white border border-amber-50"
          type="email"
          placeholder="Enter your email"
        />
        {/* Submit button */}
        <button className="w-full h-14 p-2 mt-3 rounded-md bg-gradient-to-l from-orange-300 to-orange-900 text-white hover:bg-gradient-to-r from-orange-300 to-orange-900">
          Send reset Link
        </button>
        {/* Back to login link */}
        <p className="mt-4 text-center text-white">
          remember password <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
