"use client";
import Link from "next/link";
import axios from 'axios'
import { useState, useEffect } from "react";
import FormHolder from "../Components/FormHolder";

export default function Login() {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:8080/User/AuthenticateUser',credentials);
      console.log(response.data)
      alert('Works')
      
    }catch(error){
      console.log('Login failed. ' , error.response.data)
      alert('Wrong credentials. ');
      
    }

  }

  console.log(credentials)

  
  return (
    <FormHolder>
      <h1 className="text-4xl py-8 text-center font-sans">Welcome Back! </h1>
      <div className="flex justify-between px-12 items-center">
        <label className="text-xl">Username</label>
        <input
          type="text"
          name="userName"
          className="ml-4 mr-15 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between px-12 items-center">
        <label className="text-xl">Password</label>
        <input
          type="password"
          name="password"
          className="ml-4 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-4 items-center text-center">
        <Link
          className="w-64 py-2 px-6 text-xl rounded-lg bg-black text-white uppercase"
          href="/SimulatorForm"
        >
          Sign In
        </Link>
        <Link className="text" href="/SignUp">
          Not a user? Sign Up
        </Link>
      </div>
    </FormHolder>
  );
}
