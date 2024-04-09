import React, { useState, useEffect } from "react";
import PermissionModal from "../Permissions/PermissionModal";
import { getHomeLayout } from "../lib/home";
import { addMotionDetectors } from "../lib/home";
import { useAuthStore } from "../Store/user.store";
import { ConsoleLogger } from "../Logger/Console";
import axios from "axios";
import { useSimlulationStore } from "../Store/simulation.store";
export default function SHP() {
  const {location} = useAuthStore();

  const {awayMode,setAwayMode} = useSimlulationStore()

  const [isAway, setIsAway] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [counter, setCounter] = useState(0)
  const [policeTrigger, setPoliceTrigger] = useState(false)
  const [sensor, setSensor] = useState({
    roomId: 0,
  });
  useEffect(() => {
    stopCounter()
    if (location !== '' && isAway) {
      const interval = setInterval(() => {  
        setCounter(prevCounter => prevCounter + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [location, isAway]);

  const onClickSetActive = () => {
    setIsAway(!isAway);

  }

  const stopCounter = () =>{
    setCounter(0)
  } 

  useEffect(() => {
    if(counter > 2 && location !== ''){
      setAwayMode('ON')
    }else{
      setAwayMode('OFF')
    }
  }, [counter]);

  useEffect(() => {
    if (awayMode === "ON") {
      ConsoleLogger(
        `Police Alert! person in ${location}`,
        location,
        " when system is in away mode.",
        {
          reason: "System Alert",
        },
      );
    }
  }, [awayMode]);

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
      const response = await addMotionDetectors(sensor);
      console.log(response);
  };

  return (
    <>
      <div>
        <div className="mx-4 my-4">
          <button onClick={onClickSetActive}>
            <span>
              <p className="bg-slate-800 text-white border px-8 py-2">
                Away Mode: {isAway ? "ON" : "OFF"} 
              </p>
            </span>
          </button>
        </div>
        <p className="mt-2 ml-4 font-bold">Set Motion Detector: </p>
        <div className="ml-4 flex flex-row ">
          <div className="flex justify-between rounded-md border-slate-800 ">
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
