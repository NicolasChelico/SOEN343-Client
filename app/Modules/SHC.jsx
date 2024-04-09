import React, { useEffect, useRef, useState } from "react";
import PermissionModal from "../Permissions/PermissionModal";
import {
  toggleAllLights,
  toggleRoomLights,
  toggleSmartElement,
} from "../lib/home";
import { useAuthStore } from "../Store/user.store";
import { useHomeStore } from "../Store/home.store";

export default function SHC() {
  const [selectValue, setSelectValue] = useState("true");
  const { role, location } = useAuthStore();
  const { getRooms, setRooms, setSelectedRoom } = useHomeStore();
  const rooms = getRooms();

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const roomNumberRef = useRef(1);
  const [roomNumber, setRoomNumber] = useState(1);
  const [elementType, setElementType] = useState("");
  const [elementId, setElementId] = useState("");

  const handleChange = (e) => {
    roomNumberRef.current = e.target.value;
  };

  const handleElementChange = (e) => {
    setElementId(e.target.value);
    rooms[roomNumber - 1].smartElementList.map((element) => {
      if (element.elementId === parseInt(e.target.value)) {
        setElementType(element.elementType);
      }
    });
  };

  // Function to check if the user is in the room
  const isUserInRoom = () => {
    const room = rooms.find((room) => room.roomId == roomNumber);

    return room && room.roomType === location;
  };

  const changeRoomLights = async () => {
    if (!isUserInRoom()) {
      console.log("You are not in the room");
      return;
    }
    const updatedRoom = await toggleSmartElement(
      roomNumber,
      elementId,
      elementType
    );
    setSelectedRoom(updatedRoom);
  };

  const changeAllLights = async (isOpen) => {
    const updatedHouseLayout = await toggleAllLights(isOpen);
    setRooms(updatedHouseLayout.roomList);
  };

  return (
    <>
      <div>
        <p className="text-lg font-semibold m-4">Control System</p>
        <div>
          <p className="text-lg font-semibold m-4">
            Change Smart Element State
          </p>
          <div className="flex flex-row px-4">
            <div className="flex justify-between rounded-md border-slate-800 ">
              <select
                className="h-7 border-2"
                name="roomNumber"
                onChange={(e) => {
                  setRoomNumber(e.target.value);
                }}
              >
                {rooms &&
                  rooms.map((room, index) => {
                    return (
                      <option key={index} value={room.roomId}>
                        {room.roomType}
                      </option>
                    );
                  })}
              </select>
              <select
                className="h-7 border-2"
                name="elementType"
                onChange={(e) => {
                  handleElementChange(e);
                }}
              >
                {rooms &&
                  rooms[roomNumber - 1].smartElementList.map(
                    (element, index) => {
                      return (
                        <option key={index} value={element.elementId}>
                          {element.elementType}
                        </option>
                      );
                    }
                  )}
              </select>
              <select value={selectValue} onChange={handleSelectChange}>
                <option value="true">ON</option>
                <option value="false">OFF</option>
              </select>
            </div>
            <button
              onClick={() => {
                changeRoomLights(roomNumberRef.current);
              }}
              className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
            >
              Set
            </button>
          </div>
          {role === "Parent" && (
            <div className="px-4 pt-2">
              <label>Turn off All lights:</label>
              <button
                className="rounded-md bg-slate-800 text-white px-2 m-2"
                onClick={() => changeAllLights(false)}
              >
                TURN OFF ALL
              </button>
              <div className="flex flex-row items-center">
                <label>Turn on All lights:</label>
                <button
                  className="rounded-md bg-slate-800 text-white px-2 m-2"
                  onClick={() => changeAllLights(true)}
                >
                  TURN ON ALL
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-full relative">
        <PermissionModal
          module={"SHC"}
          parents={
            "All permissions granted to open/close windows, unlock doors, open/close garage and turn on/off lights."
          }
          // eslint-disable-next-line react/no-children-prop
          children={
            "Limited permission to turn on/off lights and open/close windows on the room that they are located. If they are not home, all permissions are revoked."
          }
          guest={
            "Limited permission to turn on/off lights and open/close windows on the room that they are located. If they are not home, all permissions are revoked."
          }
          stranger={
            "Non-identified users have no permissions no matter where they are located."
          }
        />
      </div>
    </>
  );
}
