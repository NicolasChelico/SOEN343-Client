'use client'
import React, {useState} from "react";
import FormHolder from "../Components/FormHolder";
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function SimulatorFormContainer() {
  const router = useRouter()
  const [homeSpecifications, setHomeSpecifications] = useState({
    indoorTemp:null,
    outdoorTemp:null,
    date: null,
    time: null
  })

  const handleChange = e => {
    setHomeSpecifications((prev) => ({...prev,[e.target.name]: e.target.value}))
  }

  const submitSpecifications = e => {
    e.preventDefault();
    localStorage.setItem('indoorTemp', homeSpecifications.indoorTemp)
    localStorage.setItem('outdoorTemp', homeSpecifications.outdoorTemp)
    localStorage.setItem('date', homeSpecifications.date)
    router.push('/Dashboard')
  }



  return (
    <FormHolder>
      <div className="flex flex-col text-center mb-8">
        <h1 className="text-4xl font-sans pt-8 pb-2 ">Smart Home Simulator.</h1>
        <p className="text-gray-400/90 font-sans">
          Please enter the home specifications.
        </p>
      </div>
      <div className="flex flex-col text-justify w-3/4 justify-center ml-24">
 
        <div className=" flex flex-row my-2">
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
          </div>

        <div className="my-2">
          <label htmlFor="">Set Date: </label>
          <input 
            type="date" 
            name="date" 
            onChange={handleChange}
          />
        </div>
        <div className="my-2">
          <label htmlFor="">Set Time: </label>
          <input 
            type="time" 
            name="time" 
            onChange={handleChange} 
          />
        </div>
        <div></div>
        <div className="flex">
          
            <button onClick={submitSpecifications} className="text-l rounded-lg bg-black text-white px-16 py-2 m-8 uppercase ">
              submit
            </button>
      
        </div>
      </div>
    </FormHolder>
  );
}
