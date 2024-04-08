"use client";
import React, { useState } from "react";
import FormHolder from "../Components/FormHolder";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthStore from "../Store/user.store";
export default function SimulatorFormContainer() {
  const router = useRouter();
  const [homeSpecifications, setHomeSpecifications] = useState({
    date: new Date().toISOString().slice(0, 10), // Set default date to current date
    time: null,
  });

  const { userName } = useAuthStore();
  console.log("usernme of zustand: ", userName);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the date input changes, update the time to the current time
    if (name === "date") {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      setHomeSpecifications((prev) => ({
        ...prev,
        [name]: value,
        time: currentTime,
      }));
    } else {
      setHomeSpecifications((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    console.log(homeSpecifications);
  };

  const submitSpecifications = async (e) => {
    e.preventDefault();

    try {
      // Format date and time strings
      const formattedDate = homeSpecifications.date;
      const formattedTime = homeSpecifications.time
        ? homeSpecifications.time
        : new Date().toLocaleTimeString("en-US", { hour12: false });

      // Concatenate date and time strings
      const dateTimeString = new Date(formattedDate + " " + formattedTime);
      const dateSeconds = dateTimeString.getTime().toString();

      const response = await axios.post(
        "http://localhost:8080/SimClock/UpdateSimulationTime",
        {
          date: dateSeconds,
        }
      );

      if (response.status === 200) {
        localStorage.setItem("indoorTemp", homeSpecifications.indoorTemp);
        localStorage.setItem("outdoorTemp", homeSpecifications.outdoorTemp);
        localStorage.setItem("date", formattedDate);
        localStorage.setItem("time", formattedTime);
        router.push("/Dashboard");
      }
    } catch (error) {
      console.error("Failed to update simulation time:", error);
      // Handle error appropriately
    }
  };
  // localStorage.setItem('indoorTemp', homeSpecifications.indoorTemp)
  // localStorage.setItem('outdoorTemp', homeSpecifications.outdoorTemp)
  // localStorage.setItem('date', homeSpecifications.date)
  // router.push('/Dashboard')

  return (
    <FormHolder>
      <div className="flex flex-col text-center mb-8">
        <h1 className="text-4xl font-sans pt-8 pb-2">Smart Home Simulator.</h1>
        <p className="text-gray-400/90 font-sans">
          Please enter the home specifications.
        </p>
      </div>
      <div className="flex flex-col text-justify w-3/4 justify-center ml-24">
        {/* <div className=" flex flex-row my-2">
            <label>Inside temperature:</label>
            <input
              type="number"
              name="indoorTemp"
              className="w-16 text-center inline-block"
              onChange={handleChange}
            />
            <p className="">°C</p>
          </div>

          <div className=" flex flex-row my-2">
            <label>Outdoor temperature:</label>
            <input
              type="number"
              name="outdoorTemp"
              className="w-16 text-center inline-block"
              onChange={handleChange}
            />
            <p className="">°C</p>
          </div> */}

        <div className="my-2">
          <label htmlFor="">Set Date: </label>
          <input type="date" name="date" onChange={handleChange} />
        </div>
        <div className="my-2">
          <label htmlFor="">Set Time: </label>
          <input type="time" name="time" onChange={handleChange} />
        </div>
        <div></div>
        <div className="flex">
          <button
            onClick={submitSpecifications}
            className="text-l rounded-lg bg-black text-white px-16 py-2 m-8 uppercase "
          >
            submit
          </button>
        </div>
      </div>
    </FormHolder>
  );
}
