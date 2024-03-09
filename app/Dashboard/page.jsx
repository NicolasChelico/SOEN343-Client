'use client';
import React, {useEffect, useState, useRef, useCallback} from 'react'
import SideNav from '../Components/SideNav/SideNav'
import CommandsContainer from './CommandsContainer';
import HouseContainer from './HouseContainer';
import Home from '../HomeComponents/Home'
import SHC from  '../Modules/SHC'
import { roomsData } from "../HouseLayoutFile/HouseLayout"

export default function SmartHomeSimulator() {


  let role = localStorage.getItem('role');
  let userName = localStorage.getItem('userName')
  const [houseLayout, setHouseLayout] = useState(roomsData);
  const roomNumberRef = useRef(0);

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



  console.log(roomsData)
  return (
    <div className="flex flex-row">
      {/* // This is the sidebar holding all the modules // */}
        <SideNav role={role} name={userName}/>
        <CommandsContainer>
            <SHC 
            toggleAllLights={toggleAllLights} 
            toggleRoomLights={toggleRoomLights}
            changeRoomRef={handleChange}
            />
        </CommandsContainer>
          <HouseContainer>
              <Home houseLayout={houseLayout} roomNumberRef={roomNumberRef.current}/>
          </HouseContainer>
    </div>
  )
}
