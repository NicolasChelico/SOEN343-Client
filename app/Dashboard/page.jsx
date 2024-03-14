"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

import SideNav from "../Components/SideNav/SideNav";
import CommandsContainer from "./CommandsContainer";
import HouseContainer from "./HouseContainer";
import Room from "../HomeComponents/Room";
import SHC from "../Modules/SHC";
import SHS from "../Modules/SHS";

import { getHomeLayout, toggleAllLights, toggleRoomLights } from "../lib/home";

export default function SmartHomeSimulator() {
  let role = localStorage.getItem("role");
  let userName = localStorage.getItem("userName");
  let outdoorTemp = localStorage.getItem("outdoorTemp");
  let indoorTemp = localStorage.getItem("indoorTemp");
  let date = localStorage.getItem("date");
  const [houseLayout, setHouseLayout] = useState(null);
  const [activeElement, setActiveElement] = useState("SHS");
  const [open, setOpen] = useState(false);

  const roomNumberRef = useRef("1");

  // Fetch home layout on component mount
  useEffect(() => {
    getHomeLayout().then((data) => {
      setHouseLayout(data);
    });
  }, []);

  const handleChange = (e) => {
    roomNumberRef.current = e.target.value;
  };

  const changeRoomLights = async (roomId) => {
    const roomIdInt = parseInt(roomId);
    const updatedRoom = await toggleRoomLights(roomIdInt);

    setHouseLayout((prevState) => {
      const updatedRooms = prevState.roomList.map((room) => {
        if (room.roomId === roomIdInt) {
          return {
            ...room,
            updatedRoom,
          };
        }
        return room;
      });
      return { ...prevState, roomList: updatedRooms };
    });
  };

  const changeAllLights = async (isOpen) => {
    console.log(isOpen);
    const updatedHouseLayout = await toggleAllLights(isOpen);
    setHouseLayout(updatedHouseLayout);

    // setHouseLayout((prevState) => {
    //   const updatedRooms = prevState.roomList.map((room) => {
    //     return {
    //       ...room,
    //       smartElementList: room.smartElementList.map((element) => {
    //         if (element.elementType === "Light") {
    //           return { ...element, isOpen: isOn };
    //         }
    //         return element;
    //       }),
    //     };
    //   });
    //   return { ...prevState, roomList: updatedRooms };
    // });
  };

  const handleClick = (e) => {
    setActiveElement(e);
  };

  return (
    <div className="flex flex-row">
      <SideNav
        role={role}
        name={userName}
        outdoorTemp={outdoorTemp}
        indoorTemp={indoorTemp}
        date={date}
        location={location}
      />
      <CommandsContainer>
        <div>
          <ul className="flex space-x-4 bg-slate-800 py-4">
            <li
              onClick={() => handleClick("SHS")}
              className={`cursor-pointer border-2 border-white my-2 mx-1 px-6 py-2 ${
                activeElement === "SHS"
                  ? "bg-white text-bg-slate-800"
                  : "text-white bg-slate-800"
              }`}
            >
              SHS
            </li>
            <li
              onClick={() => handleClick("SHC")}
              className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${
                activeElement === "SHC"
                  ? "bg-white text-bg-slate-800"
                  : "text-white"
              }`}
            >
              SHC
            </li>
            <li
              onClick={() => handleClick("SHP")}
              className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${
                activeElement === "SHP"
                  ? "bg-white text-bg-slate-800"
                  : "text-white"
              }`}
            >
              SHP
            </li>
            <li
              onClick={() => handleClick("SHH")}
              className={`cursor-pointer border-2 border-white mx-1 my-2 px-6 py-2  ${
                activeElement === "SHH"
                  ? "bg-white text-bg-slate-800"
                  : "text-white border-1"
              }`}
            >
              SHH
            </li>
            {/* Navigation items */}
            {/* ... */}
          </ul>
        </div>
        {/* Depending which element is chosen from the nav, load the appropriate module. */}
        {activeElement === "SHC" && (
          <SHC
            toggleAllLights={changeAllLights}
            toggleRoomLights={changeRoomLights}
            changeRoomRef={handleChange}
          />
        )}
        {activeElement === "SHS" && <SHS />}
      </CommandsContainer>
      <HouseContainer>
        {houseLayout &&
          houseLayout.roomList.map((room, index) => {
            return <Room key={index} roomData={room} />;
          })}
      </HouseContainer>
    </div>
  );
}
