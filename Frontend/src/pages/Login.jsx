// eslint-disable-next-line no-unused-vars
import React from "react";

function Login() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* LoginForm */}
      <div className="w-full p-10">
        <div className="flex justify-center p-10">
          <img src="./chat.png" className="w-20 "></img>
        </div>
        <h1 className="text-2xl text-center">Login</h1>
        {/* Input fields */}
        <label className="block">UserName :</label>
        <input
          className="mt-3 p-4 w-full border-2 rounded-md h-14 border-gray-300 focus:outline-none focus:border-amber-600"
          type="text"
          name="username"
          placeholder="Username"
        />
        <label className="block mt-3">Password :</label>
        <input
          className="mt-3 p-4 w-full border-2 rounded-md h-14 border-gray-300 focus:outline-none focus:border-amber-600"
          type="password"
          placeholder="Password"
        />
        <button className="w-full p-2 mt-3 rounded-md bg-blue-500 text-white hover:bg-blue-600">
          Login
        </button>
        <p className="text-center">or</p>
        <button className="w-full p-2 mt-3 rounded-md  text-white bg-black hover:bg-slate-600 text-center">
          <img src="./search.png" className="w-10 inline-block mr-5"></img>
          Google Login
        </button>
        <p className="mt-4 text-center">
          Forgot Password? <a href="/forgot-password">Reset Password</a>
        </p>
        <p className="mt-4 text-center">
          Don&rsquo;t have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
      <div className="w-full">
        <img src="./talking-1988.gif" className="grayscale-50"></img>
      </div>
    </div>
  );
}

export default Login;
