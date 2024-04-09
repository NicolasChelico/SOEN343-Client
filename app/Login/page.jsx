"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import FormHolder from "../Components/FormHolder";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../Store/user.store";

export default function Login() {
  const {setUserId,setRole,setUserName, setLocation} = useAuthStore();
  const router = useRouter();

  const [credentials, setCredentials] = useState({
    userName: "",
    password: "",
  });
  const [simulationParameters, setSimulationParameters] = useState({
    indoorTemp: "",
    outdoorTemp: "",
    date: "",
    // localStorage.setItem('indoorTemp', homeSpecifications.indoorTemp)
    // localStorage.setItem('outdoorTemp', homeSpecifications.outdoorTemp)
    // localStorage.setItem('date', homeSpecifications.date)
  });
  const [loginError, setLoginError] = useState(false);
  const errorMessage = "Wrong Credentials entered. ";

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.clear();

    try {
      const response = await axios.post(
        "http://localhost:8080/User/AuthenticateUser",
        credentials
      );
      setUserId(response.data.userId);
      setRole(response.data.role);
      setUserName(response.data.userName);
      setLocation(response.data.location);
      // localStorage.setItem('userId', response.data.userId);
      // localStorage.setItem('role', response.data.role);
      // localStorage.setItem('userName', response.data.userName);
      // localStorage.setItem('location', response.data.location)
      alert("Login successful");
      router.push("/SimulatorForm"); // Use router.push to navigate to another page
    } catch (error) {
      console.log(error);
      setLoginError(true);
    }
  };

  return (
    <FormHolder>
      <h1 className="text-4xl py-8 text-center font-sans">Welcome Back!</h1>
      <div className="flex gap-4 flex-col justify-between ">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label className="text-xl">Username</label>
            <input
              type="text"
              name="userName"
              className="ml-4 py-3 w-3/2 px-5 rounded-lg border-2 border-black"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <label className="text-xl">Password</label>
            <input
              type="password"
              name="password"
              className="ml-4 py-3 w-1/1 px-5 rounded-lg border-2 border-black"
              onChange={handleChange}
            />
          </div>
        </div>
        {loginError && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        <div className="flex justify-center gap-4 text-center">
          <button
            className="text-xl rounded-lg py-2 px-6 bg-black text-white uppercase"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <Link
            href="/SignUp"
            className="text-xl rounded-lg py-2 px-6 bg-black text-white uppercase"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </FormHolder>
  );
}
