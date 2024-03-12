"use client";
import React, { useEffect, useState } from "react";
import SideNav from "../Components/SideNav/SideNav";
import CommandsContainer from "./CommandsContainer";
import HouseContainer from "./HouseContainer";
import Bedroom from "../HomeComponents/Bedroom";
import { roomsData } from "../HouseLayoutFile/HouseLayout";

export default function SmartHomeSimulator() {
  let role = localStorage.getItem("role");
  let userName = localStorage.getItem("userName");

  const [open, setOpen] = useState(false);
  const onClick = (e) => {
    e.preventDefault();
    setOpen(!open);
  };
  console.log(userName);
  return (
    <div className="flex flex-row">
      {/* // This is the sidebar holding all the modules // */}
      <SideNav role={role} name={userName} />
      <CommandsContainer />
      <HouseContainer>
        {roomsData.roomList.map((room) => {
          return <Bedroom key={room.id} roomData={room} />;
        })}
      </HouseContainer>
    </div>
  );
}
