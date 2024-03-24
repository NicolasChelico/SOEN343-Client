import React, {useState, useEffect} from 'react'
import {useModal} from "../../Modals/Modal";
import axios from 'axios';


export default function ({name}) {
    const { toggle } = useModal();
    const [users, setUsers] = useState([])
    let role = ''
    const [simulationUser, setSimulationUser] = useState({
        userName: localStorage.getItem("userName"),
        role: '',
        location: localStorage.getItem("location")
    })
    const [simulationContext, setSimulationContext] = useState({
        indoorTemp: localStorage.getItem("indoorTemp"),
        outdoorTemp: localStorage.getItem("outdoorTemp"),
        date: localStorage.getItem("date"),
        time: null
      })
    
      const handleChange = e => {
        setSimulationContext((prev) => ({...prev,[e.target.name]: e.target.value}))
      }

      const handleUserChange = e => {
        setSimulationUser((prev) => ({...prev,[e.target.name]: e.target.value}))
      }

      
      const submitSpecifications = e => {
        e.preventDefault();
        const role = users.find((user) =>  simulationUser.userName === user.name)
        localStorage.setItem("userName", role.name)
        localStorage.setItem("role", role.role)
        localStorage.setItem('indoorTemp', simulationContext.indoorTemp)
        localStorage.setItem('outdoorTemp', simulationContext.outdoorTemp)
        localStorage.setItem('date', simulationContext.date)
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
             {users.length > 0 && (
                users.map((user) => {
                   return <option name="userName" value={user.name}> {user.name} </option>
                })
             )}

        </select>

          </div>
          <div className=" flex flex-row ml-16 mt-8 mb-2">
            <label className="text-black">Set User location:</label>
              <select 
                name="userName" 
                id="" 
                value={simulationUser.location} 
                onChange={handleUserChange}
                className="text-black border-2 border-gray-300 rounded-md"
                >
                <option name="LivingRoom" value="LivingRoom"> Living Room</option>
                <option name="Kitchen" value="Kitchen"> Kitchen</option>
                <option name="Garage" value="Garage"> Garage</option>
                <option name="Bedroom" value="Bedroom"> Bedroom</option>
                <option name="BuildingEntrance" value="BuildingEntrance"> Building Entrance</option>
                <option name="Outdoor" value="Outdoor"> Outdoor</option>
                <option name="Backyard" value="Backyard"> Backyard</option>

        </select>
          </div>
        <div className=" flex flex-row ml-16 mb-2">
            <label className="text-black">Inside temperature:</label>
            <input
              type="number"
              name="indoorTemp"
              value={simulationContext.indoorTemp}
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
          <label className="text-black" htmlFor="">Set Date: </label>
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
            <button onClick={submitSpecifications} className="text-l rounded-lg bg-black text-white px-16 py-2 m-8 uppercase ">
              submit
            </button>
      
        </div>
      </div>

  )
}
