import React, { useState, useRef } from "react";
import Room from "./room";
import { roomsData } from "../HouseLayoutFile/HouseLayout"

export default function HouseLayout({houseLayout}) {
   
  return (
    <>
      <div className="bg-slate-600">
        <div className="grid grid-cols-2 gap-4 p-4">
          {houseLayout.roomList.map((room, index) => (
            <Room key={index} roomData={room} />
          ))}
        </div>
      </div>
    </>
  );
}
