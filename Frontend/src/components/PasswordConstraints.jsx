/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";

function PasswordConstraints({ error, setError, password }) {
  useEffect(() => {
    setError(handleConstraints(password));
    console.log(error);
  }, [password]);
  const handleConstraints = (passwords) => {
    const incomingValue = passwords;
    //Check if password is empty or undefined we return a false value"
    //Because useEffect initially trigger the stateUpdate with empty password right
    if (!incomingValue) {
      return {
        uppercase: false,
        lowercase: false,
        numbers: false,
        specialCharacters: false,
        length: false,
      };
    }
    return {
      uppercase: /[A-Z]/.test(incomingValue) ? true : false,
      lowercase: /[a-z]/.test(incomingValue) ? true : false,
      numbers: /[0-9]/.test(incomingValue) ? true : false,
      specialCharacters: /[@$#!%^&*]/.test(incomingValue) ? true : false,
      length: incomingValue?.length >= 6 ? true : false,
    };
  };
  return (
    <div>
      <ol className="p-7 text-white list-disc lg:text-lg">
        <li className={`${error.length ? "text-green-600" : "text-white"}`}>
          Password must contain at least 6 characters
        </li>
        <li className={`${error.uppercase ? "text-green-600" : "text-white"}`}>
          Password must contain at least one uppercase letter
        </li>
        <li className={`${error.lowercase ? "text-green-600" : "text-white"}`}>
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
    </div>
  );
}

export default PasswordConstraints;
