/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import chatAnime from "../animations/chat.json";
import { motion } from "motion/react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
function Login() {
  const { isLogging, loginUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  // Function to handle form input change event
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Function to handle form validation
  const formValidation = () => {
    // Local variable to hold errors for immediate return
    const newErrors = {
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
    // Update errors state Asynchronously
    setErrors(newErrors);
    // Here we use Local variable to calculate return response
    return Object.values(newErrors).every((error) => error === null);
  };
  // Function to handle form submission event
  const handleSubmit = async (e) => {
    e.preventDefault();
    //If form validation true then only Api call happens
    if (formValidation()) {
      try {
        const response = await loginUser(formData);
        toast.success(response);
      } catch (e) {
        console.log(e);
        toast.error(e.message);
      } finally {
        setFormData({ email: "", password: "" });
      }
    }
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-gradient-to-l from-gray-900 to-sky-950 items-center min-h-screen max-h-fit">
      {/* Section A */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full p-10"
      >
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        <h1 className="text-2xl text-center text-white">Login</h1>
        {/* Login form */}

        <form onSubmit={handleSubmit} className="">
          <label className="block text-white">Email :</label>
          <input
            autoFocus
            value={formData.email}
            onChange={handleChange}
            className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-gray-400 border-gray-300 focus:outline-none focus:border-amber-600"
            type="text"
            name="email"
            placeholder="John@gmail.com"
          />
          {errors.email && <p className="text-red-800">{errors.email}</p>}
          <label className="block mt-3 text-white">Password :</label>
          <input
            value={formData.password}
            onChange={handleChange}
            className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-gray-400 border-gray-300 focus:outline-none focus:border-amber-600"
            type="password"
            name="password"
            placeholder="#123SDsc-"
          />
          {errors.password && <p className="text-red-800">{errors.password}</p>}
          <button
            disabled={isLogging}
            className="w-full h-14 p-2 mt-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 active:scale-90 duration-100 ease-in-out"
          >
            {isLogging ? "Logging IN..." : "Login"}
          </button>
          <p className="text-center">or</p>
          <button
            type="button"
            className="w-full h-14 p-2 mt-3 rounded-md  text-black bg-white hover:bg-slate-600 text-center active:scale-90 duration-100 ease-in-out"
          >
            <img src="./search.png" className="w-10 inline-block mr-5"></img>
            Google Login
          </button>

          <p className="mt-4 text-center text-gray-400">
            Forgot Password? <a href="/forgot-password">Reset Password</a>
          </p>
          <p className="mt-4 text-center text-gray-400">
            Don&rsquo;t have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </motion.div>
      {/* Section B for desktop designs*/}
      <div className="w-full hidden md:block">
        <Lottie animationData={chatAnime} width={300} className="h-screen" />
      </div>
    </div>
  );
}

export default Login;
