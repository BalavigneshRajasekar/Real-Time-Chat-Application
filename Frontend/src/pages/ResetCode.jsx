/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

function ResetCode() {
  const [resetCode, setResetCode] = useState();
  const {
    generateResetCode,
    resetPasswordLoading,
    resetPasswordLink,
    restLinkLoading,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParam = new URLSearchParams(location.search);
  const token = queryParam.get("token");
  const email = queryParam.get("email");

  useEffect(() => {
    if (!token) navigate("/login");
  }, [token]);

  const resendCode = async () => {
    try {
      const response = await generateResetCode(email);
      toast.success(response.message);
      navigate(`?token=${response.token}&&email=${email}`);
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
  const resetPassword = async () => {
    if (!resetCode.length >= 5) return;
    try {
      const response = await resetPasswordLink(resetCode, token);
      toast.success(response);
      navigate("/login");
    } catch (e) {
      console.error(e);
      toast.error(e.message);
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-r from-gray-900 to-sky-950 items-center  min-h-screen max-h-fit">
      {/* Section A */}
      {/* Reset Code column */}
      <div className="shadow-2xl rounded-3xl p-10 w-fit ">
        <h1 className="text-teal-700">Reset Code</h1>
        <p className="text-white mt-3 font-bold">
          Enter the reset code sent to your email :
        </p>
        <p>{email}</p>
        <input
          onChange={(e) => setResetCode(e.target.value)}
          type="text"
          placeholder="Reset Code"
          className="w-full p-3 border-2 rounded-md border-white mt-3 placeholder:text-white text-white text-2xl tracking-widest"
        />
        <button
          disabled={restLinkLoading}
          className="w-full h-14 p-2 mt-3 rounded-md bg-gradient-to-l from-orange-300 to-orange-900 text-white hover:bg-gradient-to-r from-orange-300 to-orange-900"
          onClick={resetPassword}
        >
          {restLinkLoading ? "Verifying code..." : "verify code"}
        </button>
        <p>
          If you didn&rsquo;t receive the code, please check your spam folder or
        </p>
        <div className="flex justify-end">
          <p className="text-white">
            <button
              disabled={resetPasswordLoading}
              className="text-white bg-gradient-to-l from-blue-500 to-blue-700 text-white hover:bg-gradient-to-r from-blue-500 to-blue-700"
              onClick={() => resendCode()}
            >
              {resetPasswordLoading ? "re-Sending..." : "resend"}
            </button>
          </p>
        </div>
      </div>
      {/* Section B */}
      {/* Design column for desktop */}
    </div>
  );
}

export default ResetCode;
