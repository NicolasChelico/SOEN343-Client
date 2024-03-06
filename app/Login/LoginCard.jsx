"use client";
import react from "react";
import axios from 'axios';

import {useState, useEffect} from "react"

export default function LoginCard() {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser((prev) => ({...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = e => {
        e.preventDefault();
            
    }


    console.log(user)
  return (
    <div className="flex justify-center h-3/6 ">
      <div className="self-center h-full w-2/5 bg-slate-50 bg-opacity-80">
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
        <div className="text-center">
          <button className="text-xl rounded-lg bg-black text-white px-24 py-2 m-4 ml-9 uppercase">Sign In</button>
        </div>
      </div>
    </div>
  );
}
