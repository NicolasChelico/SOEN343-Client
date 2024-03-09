'use client';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { IoPersonOutline } from "react-icons/io5";
import { MdHome } from "react-icons/md";


export default function SideNav(props){

  const [simulation, setSimulation] = useState(false);
  

  return (
    <div className="flex w-48 h-screen">
      <div className="w-48 bg-gray-800 text-white pt-6 p-2">
        {/* Your side navigation content goes here */}
        <div className='mb-16'>
          <h2 className="text-xl font-bold  mb-4 text-center ">Simulation</h2>
          <div className="flex flex-col">
            <button onClick={(e) => setSimulation(!simulation)}>
              <span>Simulation: 
                <p className='bg-white text-slate-800 border'>{simulation ? 'ON':'OFF'}</p>
              </span>
            </button>
          </div>
        </div>
        <ul>
          <li className="mb-4 py-8 rounded-md border-white border-2 flex flex-col">
            <div className="flex justify-center">
              <IoPersonOutline size={30} className=""/>
              </div>
              <div className="flex flex-col justify-start text-justify">
                  <p className=''>Name:{props.name}</p>
                  <p className=''>Role: {props.role} </p>
                  <p className=''>Location: {props.location} </p>
              </div>
              
          </li>
          <li className="mb-4 py-6 h-3/5 rounded-md border-white border-2 text-center">
            <div className="flex flex-col">
              <div className="flex justify-center">
                  <MdHome size={40}/>
              </div>
              <div className="text-justify">
                <p className="mb-4">Outside temp. wef{props.outsideTemp} C</p>
                <p className="mb-4">Date: {props.currentDate}</p>
                <p>Time: {props.time}</p>
                
              </div>
              <label>Time speed.</label>
                <input type="range" min="-20" max ="20"/>
            </div>

          </li>
        </ul>
      </div>
      <div className='bottom-0 fixed mb-12 w-28 ml-4 text-center bg-white rounded py-2'>
        <Link href="/">
            <button> Log out</button>
          </Link>
      </div>
    </div>
  );
};



