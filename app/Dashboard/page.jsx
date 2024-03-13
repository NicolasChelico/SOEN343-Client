"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

import SideNav from "../Components/SideNav/SideNav";
import CommandsContainer from "./CommandsContainer";
import HouseContainer from "./HouseContainer";
import Room from "../HomeComponents/Room";
import SHC from "../Modules/SHC";
import SHS from "../Modules/SHS";

import { getHomeLayout } from "../lib/home";

export default function SmartHomeSimulator() {
  const role = localStorage.getItem("role");
  const userName = localStorage.getItem("userName");

  const [houseLayout, setHouseLayout] = useState(null);
  const [activeElement, setActiveElement] = useState("SHC");
  const [open, setOpen] = useState(false);

  const roomNumberRef = useRef(0);

  // Fetch home layout on component mount
  useEffect(() => {
    getHomeLayout().then((data) => {
      setHouseLayout(data);
    });
  }, []);

  const handleChange = (e) => {
    roomNumberRef.current = e.target.value;
  };

  const toggleRoomLights = useCallback((roomId) => {
    const roomIdInt = parseInt(roomId);
    setHouseLayout((prevState) => {
      const updatedRooms = prevState.roomList.map((room) => {
        if (room.roomId === roomIdInt) {
          return {
            ...room,
            smartElementList: room.smartElementList.map((element) => {
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
  }, []);

  const toggleAllLights = () => {
    setHouseLayout((prevState) => {
      const updatedRooms = prevState.roomList.map((room) => {
        return {
          ...room,
          smartElementList: room.smartElementList.map((element) => {
            if (element.elementType === "Light") {
              return { ...element, isOpen: false };
            }
            return element;
          }),
        };
      });
      return { ...prevState, roomList: updatedRooms };
    });
  };

  const handleClick = (e) => {
    setActiveElement(e);
  };

  
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
  }, []);



  console.log(roomsData);
  return (
    <div className="flex flex-row">
      <SideNav role={role} name={userName} />
      <CommandsContainer>
        <div>
          <ul className="flex space-x-4 bg-slate-800 py-4">
            {/* Navigation items */}
            {/* ... */}
          </ul>
        </div>
        {/* Depending which element is chosen from the nav, load the appropriate module. */}
        {activeElement === "SHC" && (
          <SHC
            toggleAllLights={toggleAllLights}
            toggleRoomLights={toggleRoomLights}
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
