"use client";
import Link from "next/link";
import axios from 'axios'
import { useState } from "react";
import FormHolder from "../Components/FormHolder";
import { useRouter } from "next/navigation";

export default function Login() {
  localStorage.clear();
  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/User/AuthenticateUser', credentials);
      console.log('response data', response.data)
      localStorage.setItem('userId', response.data.userId)
      localStorage.setItem('role', response.data.role)
      localStorage.setItem('userName', response.data.userName)
      alert('Login successful');
    } catch (error) {
      console.log('Login failed.', error.response.data)
      alert('Wrong credentials.');   
    }
  }

  console.log('Role from local:', localStorage.getItem('role'))

  return (
    <FormHolder>
      <h1 className="text-4xl py-8 text-center font-sans">Welcome Back!</h1>
      <div className="flex justify-between px-12 items-center">
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
        <div className="flex justify-center gap-4 text-center">
          <button className="text-xl rounded-lg py-2 px-6 bg-black text-white  uppercase" onClick={handleLogin}>Sign In</button>
          <Link href="/SignUp" className="text-xl rounded-lg py-2 px-6 bg-black text-white  uppercase">Sign Up</Link>
        </div>
      </div>
    </FormHolder>
  );
}

