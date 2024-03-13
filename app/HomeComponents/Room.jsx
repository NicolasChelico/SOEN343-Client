import React, { useState, useEffect } from "react";
import Light from "../SmartElements/light";
import Door from "../SmartElements/door";
import Window from "../SmartElements/window";

export default function Room({ roomData }) {
  const [room, setRoom] = useState(roomData);

  useEffect(() => {
    console.log("Room data changed in room: " + roomData.roomId);
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
      </div>
    </div>
  );
}
