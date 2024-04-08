"use client";
import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import FormHolder from "../Components/FormHolder";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    userName: "",
    role: "",
    password: "",
    confirmPass: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error messages
    setSuccessMessage(""); // Clear any previous success messages

    if (
      user.name === "" ||
      user.userName === "" ||
      user.password === "" ||
      user.confirmPass === "" ||
      user.role === ""
    ) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (user.password !== user.confirmPass) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/User/AddUser", {
        name: user.name,
        userName: user.userName,
        password: user.password,
        role: user.role,
      });

      setSuccessMessage("Sign up successful!");
      // Optionally, redirect the user or clear the form here
      router.push("/Dashboard");
    } catch (err) {
      console.log(err);
      setErrorMessage("Sign up failed. Please try again.");
    }
  };

  return (
    <FormHolder>
      <h1 className="text-4xl py-8 text-center font-sans">Welcome Back! </h1>

      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      {successMessage && (
        <p className="text-green-500 text-center">{successMessage}</p>
      )}

      <div className="flex justify-between px-12 items-center">
        <label className="text-xl">Full Name</label>
        <input
          type="text"
          name="name"
          className="ml-4 mr-15 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between px-12 items-center">
        <label className="text-xl">User Name</label>
        <input
          type="text"
          name="userName"
          className="ml-4 mr-15 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="flex justify-between px-12 items-center">
        <label className="text-xl">Role</label>
        <select
          name="role"
          className="ml-4 mr-15 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        >
          <option value="Admin">Admin</option>
          <option value="Parent">Parent</option>
          <option value="Child">Child</option>
          <option value="Guest">Guest</option>
          <option value="Stranger">Stranger</option>
        </select>
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
      <div className="flex justify-between px-12 items-center">
        <label className="text-xl">Confirm Password</label>
        <input
          type="password"
          name="confirmPass"
          className="ml-4 py-3 w-1/2 px-5 rounded-lg border-2 border-black"
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-4 items-center text-center">
        <button
          className="w-64 py-2 px-6 text-xl rounded-lg bg-black text-white uppercase"
          onClick={handleClick}
        >
          Sign Up
        </button>
        <Link className="text" href="/Login">
          Already a user? Sign In
        </Link>
      </div>
    </FormHolder>
  );
}
