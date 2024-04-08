import React, { useState, useEffect } from "react";
import PermissionModal from "../Permissions/PermissionModal";
import { getHomeLayout } from "../lib/home";
import { addMotionDetectors } from "../lib/zones";
import axios from "axios";
export default function SHP() {
  const [awayMode, setAwayMode] = useState(false);
  const [roomList, setRoomList] = useState([]);

  const [sensor, setSensor] = useState({
    id: "",
    roomId: 0,
  });
  const onClickSetActive = () => {
    setAwayMode(!awayMode);
  };

  const onSensorChange = (e) => {
    setSensor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(sensor);
  };

  useEffect(() => {
    async function fetchData() {
      const homeLayout = await getHomeLayout();
      setRoomList(homeLayout.roomList);
    }
    fetchData();
  }, []);

  const onAddMotionDetector = async (e) => {
    e.preventDefault();
    try {
      const response = await addMotionDetectors(sensor);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <div className="mx-4 my-4">
          <button onClick={onClickSetActive}>
            <span>
              <p className="bg-slate-800 text-white border px-8 py-2">
                Away Mode: {!awayMode ? "ON" : "OFF"}
              </p>
            </span>
          </button>
        </div>
        <p className="mt-2 font-bold">Set Motion Detector: </p>
        <div className="flex flex-row ">
          <div className="flex justify-between rounded-md border-slate-800 ">
            <input
              className="h-7 w-1/5 border-2"
              type="number"
              placeholder="id#"
              name="id"
              onChange={onSensorChange}
            />
            <select
              className="h-7 border-2"
              name="roomId"
              onChange={onSensorChange}
            >
              {roomList &&
                roomList.map((room, index) => {
                  return (
                    <option key={index} value={room.roomId}>
                      {room.roomType}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
            onClick={onAddMotionDetector}
          >
            SET
          </button>
        </div>
      </div>
      <div className="h-full relative">
        <PermissionModal
          module={"SHP"}
          parents={
            "All permissions granted to operate the SHP from home, or remotely"
          }
          // eslint-disable-next-line react/no-children-prop
          children={
            "No permissions are allowed  no matter where they are located"
          }
          guest={"No permissions are allowed  no matter where they are located"}
          stranger={
            "Non-identified users have no permissions no matter where they are located"
          }
        />
      </div>
    </>
  );
}
