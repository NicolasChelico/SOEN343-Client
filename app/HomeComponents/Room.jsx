import React, { useState, useEffect } from "react";
import Light from "../SmartElements/light";
import Door from "../SmartElements/door";

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

  return (

    <div
      className="border border-black flex flex-col items-center justify-center"
      style={{
        backgroundColor: generateRandomColor(),
      }}
    >
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
      </div>
    </div>
  );
}
