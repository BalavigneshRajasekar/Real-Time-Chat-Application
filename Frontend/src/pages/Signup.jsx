/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import useAuth from "../hooks/useAuth";
import Lottie from "lottie-react";
import { toast } from "react-toastify";
import appStore from "../animations/appstore.json";
import playStore from "../animations/playStore.json";
import { MdEmail } from "react-icons/md";
import { FaRegEyeSlash, FaUser } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

function Signup() {
  const { registerUser, isSigning } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null,
  });
  // Function to handle form input change event
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //function to validate form data return boolean status
  const formValidation = () => {
    // Local variable to hold errors for immediate return
    const newErrors = {
      username: formData.username == "" ? "* Enter Valid username" : null,
      email: !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(
        formData.email
      )
        ? "* please enter a valid email"
        : null,
      password:
        formData.password.length >= 6
          ? null
          : "* Please enter a valid password",
    };
    // Asynchronously change the error state
    setErrors(newErrors);
    // we need immediate return so use local variable
    return Object.values(newErrors).every((error) => error === null);
  };
  //Handle the submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    //If form validation true then only Api call happens
    if (formValidation()) {
      try {
        let response = await registerUser(formData);

        toast.success(response);
        // Navigate to login page after successful registration
        navigate("/login");
      } catch (e) {
        toast.error(e.message);
      } finally {
        //Refresh form fields
        setFormData({ username: "", email: "", password: "" });
      }
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-r from-gray-900 to-sky-950 items-center min-h-screen max-h-fit">
      {/* Section A Signup */}
      <motion.div
        className="w-full p-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        <h5 className="font-bold text-2xl lg:text-4xl  text-center bg-gradient-to-l from-amber-300 to-amber-900   bg-clip-text text-transparent ">
          Become a Part of the ChatHub Community
        </h5>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className="mt-10">
          <label className="block text-white">
            <FaUser className="inline-block mr-2 text-xl" />
            UserName
          </label>
          <input
            autoFocus
            value={formData.username}
            onChange={handleChange}
            className="mt-3 text-white placeholder:text-gray-400 p-4 w-full border-2 rounded-md h-14 border-gray-300 focus:outline-none focus:border-amber-600"
            type="text"
            name="username"
            placeholder="John"
          />
          {errors.username && <p className="text-red-800">{errors.username}</p>}
          <label className="block text-white mt-3">
            <MdEmail className="inline-block mr-2 text-xl" />
            email
          </label>
          <input
            value={formData.email}
            onChange={handleChange}
            className="mt-3 text-white placeholder:text-gray-400text-white p-4 w-full border-2 rounded-md h-14 border-gray-300 focus:outline-none focus:border-amber-600"
            type="text"
            name="email"
            placeholder="john@gmail.com"
          />
          {errors.email && <p className="text-red-800">{errors.email}</p>}
          <label className="block mt-3 text-white">
            <RiLockPasswordFill className="inline-block text-xl" /> Password
          </label>
          <div className="relative">
            <input
              value={formData.password}
              onChange={handleChange}
              className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-gray-400 border-gray-300 focus:outline-none focus:border-amber-600"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="#1234John-"
            />
            {showPassword ? (
              <FaRegEye
                className="absolute  right-5 top-8 cursor-pointer text-white text-xl"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute right-5 top-8 cursor-pointer text-white text-xl"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          {errors.password && <p className="text-red-800">{errors.password}</p>}
          <button
            className="w-full h-14 p-2 mt-3 rounded-md bg-gradient-to-l from-orange-300 to-orange-900 text-white hover:bg-gradient-to-r from-orange-300 to-orange-900 "
            disabled={isSigning}
          >
            {isSigning ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          already have an account? <Link to="/login">Sign IN</Link>
        </p>
      </motion.div>
      {/* Section B  for desktop designs */}
      <div className="w-full hidden md:flex md:flex-col items-center">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          src="chat.png"
          className="w-100"
        ></motion.img>
        {/* Get the app  */}
        <motion.div
          className="flex gap-2 justify-center mt-5 col-span-2 "
          initial={{ translateY: -180 }}
          animate={{ translateY: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* App Store Button */}
          <div className="flex justify-center items-center gap-2 w-50 border border-orange-500 p-4 rounded-4xl">
            <Lottie animationData={appStore} className="w-14 inline-block" />
            <p className="text-white">Download on App Store</p>
          </div>
          {/* Play store Button */}
          <div className="flex justify-center items-center gap-2 w-50 border border-orange-500 p-4 rounded-4xl">
            <Lottie
              animationData={playStore}
              className="w-30 inline-block bg-white rounded-2xl h-11"
            />
            <p className="text-white ">Download on Play Store</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
