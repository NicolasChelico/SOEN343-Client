import React, { useState, useEffect } from "react";
import Room from "../HomeComponents/Room";
import { useHomeStore } from "../Store/home.store";
import { useTempStore } from "../Store/temp.store";

export default function HouseContainer() {
  const { getRooms } = useHomeStore();
  const { getTemp } = useTempStore();
  const rooms = getRooms();
  const temp = getTemp();

  return (
    <div className='grid grid-cols-2 gap-4 p-4 h-7/8 my-12 mx-4 rounded overflow-hidden  bg-[url("https://t4.ftcdn.net/jpg/01/01/78/03/360_F_101780352_I3bDsI4PGZ8hSOYxnknHS1vNp5cWokfw.jpg")]'>
      {rooms &&
        rooms.map((room, index) => {
          return <Room key={index} roomData={room} />;
        })}
      <div className="w-full items-center">
        <p className="text-white font-bold text-800">Outside: {temp}˚C</p>
      </div>
    </div>
  );
}
