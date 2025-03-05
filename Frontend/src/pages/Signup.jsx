/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const formValidation = () => {
    setErrors({
      username: formData.username == "" ? "EnterValid username" : null,
      email: !/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(
        formData.email
      )
        ? "Invalid email"
        : null,
      password:
        !formData.password >= 6 && /[a-fA-F0-9]/.test(formData.password)
          ? "Please enter a valid password"
          : null,
    });

    return Object.values(errors).every((error) => error === null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate form data
    console.log(formValidation());

    // TODO: Implement login logic here
    console.log(formData);
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-zinc-900 items-center h-screen">
      {/* LoginForm */}
      <div className="max-w-full">
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        <h1 className="text-2xl text-center bg-gradient-to-b from-25% bg-orange-400 to-60% bg-amber-500 bg-clip-text text-transparent animate-bounce">
          Welcome To the App
        </h1>
        {/* Input fields */}
        <form onSubmit={handleSubmit}>
          <label className="block text-white">UserName :</label>
          <input
            value={formData.username}
            onChange={handleChange}
            className="mt-3 text-white placeholder:text-white p-4 w-full border-2 rounded-md h-14 border-gray-300 focus:outline-none focus:border-amber-600"
            type="text"
            name="username"
            placeholder="Username"
          />
          <label className="block text-white mt-3">email :</label>
          <input
            value={formData.email}
            onChange={handleChange}
            className="mt-3 text-white placeholder:text-white p-4 w-full border-2 rounded-md h-14 border-gray-300 focus:outline-none focus:border-amber-600"
            type="email"
            name="email"
            placeholder="email"
          />
          <label className="block mt-3 text-white">Password :</label>
          <input
            value={formData.password}
            onChange={handleChange}
            className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-white border-gray-300 focus:outline-none focus:border-amber-600"
            type="password"
            placeholder="Password"
          />
          <button className="w-full h-14 p-2 mt-3 rounded-md bg-blue-500 text-white hover:bg-blue-600">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-white">
          already have an account? <Link to="/login">Sign IN</Link>
        </p>
      </div>
      <div className="w-full hidden md:block">
        <img src="./talking-1988.gif" className="grayscale-50"></img>
      </div>
    </div>
  );
}

export default Signup;
