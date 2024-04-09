/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect, useRef } from "react";
import { useModal } from "../../Modals/Modal";
import axios from "axios";
import { updateCurrentUserLocation } from "@/app/lib/users";
import { getHomeLayout } from "../../lib/home";
import { useAuthStore } from "../../Store/user.store";
import { useSimlulationStore } from "@/app/Store/simulation.store";
export default function EditContext({ name }) {
  const { toggle } = useModal();
  const { location, userName, role, setLocation, setUserName, setRole } = useAuthStore();
  const {date, insideTemp, outdoorTemp, setInsideTemp, setOutdoorTemp, setDate} = useSimlulationStore();
  const [users, setUsers] = useState([]);
  const [roomList, setRoomList] = useState([]);
  // const originalLocation = localStorage.getItem('location');
  const originalLocation = location;

  const [simulationUser, setSimulationUser] = useState({
    userName: userName,
    role: "",
    location: location,
  });
  const [simulationContext, setSimulationContext] = useState({
    insideTemp: insideTemp,
    outdoorTemp: outdoorTemp,
    date: date,
    time: null,
  });

  useEffect(() => {
    async function fetchData() {
      const homeLayout = await getHomeLayout();
      setRoomList(homeLayout.roomList);
    }
    fetchData();
  }, []);

      const handleChange = e => {
        setSimulationContext((prev) => ({...prev,[e.target.name]: e.target.value}))
      }

      const handleUserChange = e => {
        setSimulationUser((prev) => ({...prev,[e.target.name]: e.target.value}))
        // console.log(users.find((user) =>  simulationUser.userName === user.name))
        console.log(simulationUser, ' ', users)
      }

      const submitSpecifications = async e => {
        e.preventDefault();
        const role = users.find((user) =>  simulationUser.userName === user.name)
       
        if(simulationUser.location !== originalLocation){
          const originalLocationId = roomList.find((room) => originalLocation === room.roomType)
          const newLocationId = roomList.find((room) => simulationUser.location === room.roomType)
        
          try{
            const response = await updateCurrentUserLocation(role.userName, originalLocationId.roomId, newLocationId.roomId)
            // console.log(response)
          }catch(err){
            console.log(err)
          }
        }
        setUserName(role.name)
        setRole(role.role)
        setLocation(simulationUser.location)
        setDate(simulationContext.date)
        setOutdoorTemp(simulationContext.outdoorTemp)
        setInsideTemp(simulationContext.insideTemp)  
        toggle();
      }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/User`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [localStorage]);

  return (
    <div className="flex flex-col text-justify w-3/4 border-2 border-black justify-center ">
      <div className=" flex flex-row ml-16 mt-8">
        <label className="text-black">Change current user:</label>

        <select
          name="userName"
          id=""
          value={simulationUser.userName}
          onChange={handleUserChange}
          className="text-black border-2 border-gray-300 rounded-md"
        >
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <option key={index} name="userName" value={user.name}>
                  {" " + user.name + " "}
                </option>
              );
            })}
        </select>

          </div>
          <div className=" flex flex-row ml-16 mt-8 mb-2">
            <label className="text-black">Set User location:</label>
              <select 
                name="location" 
                id="" 
                value={simulationUser.location} 
                onChange={handleUserChange}
                className="text-black border-2 border-gray-300 rounded-md"
                >
                {roomList &&
                  roomList.map((room, index) => {
                    return (
                      <option key={index} value={room.roomType} >
                        {room.roomType}
                      </option>
                    );
                  })}
                <option key='100' value='' >
                  " "        
                </option>

        </select>
          </div>
        <div className=" flex flex-row ml-16 mb-2">
            <label className="text-black">Inside temperature:</label>
            <input
              type="number"
              name="insideTemp"
              value={simulationContext.insideTemp}
              className="w-16 text-center inline-block border-2 border-gray-300 rounded-md text-black"
              onChange={handleChange}
            />
            <p className="text-black">°C</p>
          </div>

          <div className=" flex flex-row ml-16 my-2">
            <label className="text-black">Outdoor temperature:</label>
            <input
              type="number"
              name="outdoorTemp"
              value={simulationContext.outdoorTemp}
              className="w-16 text-center inline-block border-2 border-gray-300 rounded-md text-black"
              onChange={handleChange}
            />
            <p className="text-black">°C</p>
          </div>

      <div className="my-2 ml-16">
        <label className="text-black" htmlFor="">
          Set Date:{" "}
        </label>
        <input
          type="date"
          name="date"
          value={simulationContext.date}
          onChange={handleChange}
          className=" text-center inline-block border-2 border-gray-300 rounded-md text-black"
        />
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
  );
}
