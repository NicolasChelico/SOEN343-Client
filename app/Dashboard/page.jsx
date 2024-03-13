'use client';
import React, {useEffect, useState, useRef, useCallback} from 'react'
import SideNav from '../Components/SideNav/SideNav'
import CommandsContainer from './CommandsContainer';
import HouseContainer from './HouseContainer';
import Home from '../HomeComponents/Home'
import SHC from  '../Modules/SHC'
import SHS from '../Modules/SHS';
import { roomsData } from "../HouseLayoutFile/HouseLayout"

export default function SmartHomeSimulator() {


  let role = localStorage.getItem('role');
  let userName = localStorage.getItem('userName')
  const [houseLayout, setHouseLayout] = useState(roomsData);
  const roomNumberRef = useRef(0);
  const [activeElement, setActiveElement] = useState("SHC");

  const [open, setOpen] = useState(false)
 
  const handleChange = (e) => {
    roomNumberRef.current = e.target.value;
  };

  const toggleRoomLights = useCallback((roomId) => {
    console.log(`Toggle lights in room: ${roomId}`);
    var roomIdInt = parseInt(roomId);
    setHouseLayout((prevState) => {
      const updatedRooms = prevState.roomList.map((room) => {
        if (room.roomId === roomIdInt) {
          console.log(room);
          return {
            ...room,
            smartElements: room.smartElements.map((element) => {
              console.log(element);
              if (element.elementType === "Light") {
                return { ...element, open: false };
              }
              return element;
            }),
          };
        }
        return room;
      });
      return { ...prevState, roomList: updatedRooms };
    });
  },[setHouseLayout]);

  const toggleAllLights = () => {
    console.log(`Toggle all lights`);
    setHouseLayout((prevState) => {
      const updatedRooms = prevState.roomList.map((room) => {
        console.log(room);
        return {
          ...room,
          smartElements: room.smartElements.map((element) => {
            console.log(element);
            if (element.elementType === "Light") {
              return { ...element, open: false };
            }
            return element;
          }),
        };
      });
      return { ...prevState, roomList: updatedRooms };
    });
  };

  
    const handleClick = (e) => {
        setActiveElement(e)
        console.log(activeElement)
    }

const [users, setUsers] = useState([]);

useEffect(()=> {
    const fetchUsers = async () => {
        try{
            const res = await axios.get(`http://localhost:8080/User`); 
            setUsers(res.data)
        }catch(err){
            console.log(err)
        }      
    }
    fetchUsers();
},[localStorage])


const onDelete = userId => {
    console.log(userId);
}


  console.log(roomsData)
  return (
    <div className="flex flex-row">
      {/* // This is the sidebar holding all the modules // */}
        <SideNav role={role} name={userName}/>
        <CommandsContainer>
        <div>
        <ul className="flex space-x-4 bg-slate-800 py-4">
            <li onClick={() => handleClick('SHS') } 
            className={`cursor-pointer border-2 border-white my-2 mx-1 px-6 py-2 ${activeElement === 'SHS' ? 'bg-white text-bg-slate-800' : 'text-white bg-slate-800'}`}>
                SHS
            </li>
            <li onClick={() => handleClick('SHC') } 
            className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${activeElement === 'SHC' ? 'bg-white text-bg-slate-800' : 'text-white'}`}>
                SHC
            </li>
            <li onClick={() => handleClick('SHP') } 
            className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${activeElement === 'SHP' ? 'bg-white text-bg-slate-800' : 'text-white'}`}>
                SHP
            </li>
            <li onClick={() => handleClick('SHH') } 
            className={`cursor-pointer border-2 border-white mx-1 my-2 px-6 py-2  ${activeElement === 'SHH' ? 'bg-white text-bg-slate-800' : 'text-white border-1'}`}>
                SHH
            </li>
        </ul>
        </div>
        {/* Depending which element is chosen from the nav, load the appropriate module. */}
        {activeElement === 'SHC' && (  
          <SHC 
              toggleAllLights={toggleAllLights} 
              toggleRoomLights={toggleRoomLights}
              changeRoomRef={handleChange}
          />)
          }

        {activeElement === 'SHS' && (  
          <SHS />)
        }
           
        </CommandsContainer>
          <HouseContainer>
              <Home houseLayout={houseLayout} roomNumberRef={roomNumberRef.current}/>
          </HouseContainer>
    </div>
  )
}
