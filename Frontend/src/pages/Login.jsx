/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement login logic here
    console.log(formData);
  };
  return (
    <div className="grid gap-4 md:grid-cols-2 bg-cyan-950 h-screen items-center">
      {/* LoginForm */}
      <div className="w-full p-10">
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        <h1 className="text-2xl text-center">Login</h1>
        {/* Input fields */}
        <form onSubmit={handleSubmit}>
          <label className="block text-white">UserName :</label>
          <input
            value={formData.username}
            onChange={handleChange}
            className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-white border-gray-300 focus:outline-none focus:border-amber-600"
            type="text"
            name="username"
            placeholder="Username"
          />
          <label className="block mt-3 text-white">Password :</label>
          <input
            value={formData.password}
            onChange={handleChange}
            className="mt-3 p-4 w-full border-2 rounded-md h-14 text-white placeholder:text-white border-gray-300 focus:outline-none focus:border-amber-600"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="w-full h-14 p-2 mt-3 rounded-md bg-blue-500 text-white hover:bg-blue-600 active:scale-90 duration-100 ease-in-out">
            Login
          </button>
          <p className="text-center">or</p>
          <button
            type="submit"
            className="w-full h-14 p-2 mt-3 rounded-md  text-white bg-black hover:bg-slate-600 text-center active:scale-90 duration-100 ease-in-out"
          >
            <img src="./search.png" className="w-10 inline-block mr-5"></img>
            Google Login
          </button>
        </form>
        <p className="mt-4 text-center">
          Forgot Password? <a href="/forgot-password">Reset Password</a>
        </p>
        <p className="mt-4 text-center">
          Don&rsquo;t have an account? <Link to="/signup">Register</Link>
        </p>
      </div>
      <div className="w-full hidden md:block">
        <img src="./talking-1988.gif" className="grayscale-50"></img>
      </div>
    </div>
  );
}

export default Login;
