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
      <div className="py-5 ml-16">
        <label className="text-xl">Username</label>
        <input
          type="text"
          name="userName"
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
        <Link className="text-xl rounded-lg py-2 px-6 bg-black text-white" href="/">
          <button onClick={handleLogin}className="uppercase"> Sign In</button>
        </Link>
        <Link className="text-xl rounded-lg py-2 px-6 bg-black text-white  uppercase" href="/SignUp">
          Sign Up
        </Link>
      </div>
    </FormHolder>
  );
}
