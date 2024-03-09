"use client";
import Link from "next/link";

import { useState, useEffect } from "react";
import FormHolder from "../Components/FormHolder";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  console.log(user);
  return (
    <FormHolder>
      <h1 className="text-4xl py-8 text-center font-sans">Welcome Back! </h1>
      <div className="py-5 ml-16">
        <label className="text-xl">Username</label>
        <input
          type="text"
          name="username"
          className="ml-4 mr-15 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="py-5 ml-16">
        <label className="text-xl">Password</label>
        <input
          type="password"
          name="password"
          className="ml-4 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-center gap-4 text-center">
        <Link
          className="text-xl rounded-lg py-2 px-6 bg-black text-white  uppercase"
          href="/SimulatorForm"
        >
          Sign In
        </Link>
        <Link
          className="text-xl rounded-lg py-2 px-6 bg-black text-white  uppercase"
          href="/SignUp"
        >
          Sign Up
        </Link>
      </div>
    </FormHolder>
  );
}
