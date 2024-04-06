'use client'
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import FormHolder from '../Components/FormHolder'
import Link from 'next/link';
export default function SimulatorForm(props) {
    const [simulationParameters, setSimulationParameters] = useState({
        date: '',
        time: ''
    })

    const onChange = e => {
        setSimulationParameters({...prev, [e.target.name]:e.target.value})
        console.log(simulationParameters)
    }

  return (
    <FormHolder>
        <div className="flex flex-col text-center mb-8">
            <h1 className="text-4xl font-sans pt-8 pb-2 ">Smart Home Simulator.</h1>
            <p className="text-gray-400/90 font-sans">Please enter the home specifications.</p>
        </div>
        <div className="flex flex-col text-justify w-2/4 justify-center ml-40">
            <div className="my-2">
                <span>
                    <label htmlFor="">Inside temperature: </label>
                    <input type ="number" name="insideTemp"  className="w-16 text-center"/> 
                    °C 
                </span> 
            </div>
            <div className="my-2">
                <span>
                    <label htmlFor="">Outside temperature:</label>
                    <input type ="number" name="outdoorTemp"  className="w-16 text-center"/>    
                     °C 
                </span> 
            </div>
            <div className="my-2">
                <label htmlFor="">Set Date: </label>
                <input type ="date" name="date"  />        
            </div>
            <div className="my-2">
                <label htmlFor="">Set Time: </label>
                <input type ="time" name="time" />        
            </div>
            <div>
        </div>
        <div className="flex">
        <Link href="/Dashboard">
    <button className="text-l rounded-lg bg-black text-white px-16 py-2 m-8 uppercase ">
        submit
    </button>
</Link>

            </div>
        </div>
     </FormHolder>
  )
}
