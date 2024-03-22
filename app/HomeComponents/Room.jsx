import React, { useState, useEffect } from "react";
import Light from "../SmartElements/light";
import Door from "../SmartElements/door";
import Window from "../SmartElements/window";
import { IoMan } from "react-icons/io5";
export default function Room({ roomData }) {
  const [room, setRoom] = useState(roomData);
  const [userRoom, setUserRoom] = useState(false)
  useEffect(() => {
 
    if(room.userList.length > 0){
      setUserRoom(true)
    }
    setRoom(roomData);
  }, [roomData]);

  const Lights = room.smartElementList.filter(
    (element) => element.elementType === "Light"
  );

  const Doors = room.smartElementList.filter(
    (element) => element.elementType === "Door"
  );

  const Windows = room.smartElementList.filter(
    (element) => element.elementType === "Window"
  );

  // console.log(userRoom , ' room status in ' , room.roomId)
  return (

    <div className="bg-slate-400 border border-black flex flex-col items-center justify-center">

      <div>{room.roomType}</div>

      <div className="flex justify-center items-center">
        {room &&
          Lights.map((light, index) => (
            <Light key={index} lightData={light} roomId={room.roomId} />
          ))}
        {room &&
          Doors.map((door, index) => (
            <Door key={index} doorData={door} roomId={room.roomId} />
          ))}
        {room &&
          Windows.map((window, index) => (
            <Window key={index} windowData={window} roomId={room.roomId} />
          ))}
          {
            userRoom ? <IoMan size={30}/>:""
          }        
      </div>
      
    </div>
  );
}
