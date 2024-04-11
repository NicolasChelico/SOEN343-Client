import React, { useState, useEffect } from "react";
import PermissionModal from "../Permissions/PermissionModal";
import { addMotionDetectors, toggleSmartElementsType } from "../lib/element";
import { useAuthStore } from "../Store/user.store";
import { ConsoleLogger } from "../Logger/Console";
import { useSimlulationStore } from "../Store/simulation.store";
import { useHomeStore } from "../Store/home.store";
import {
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

export default function SHP() {
  const { location, role } = useAuthStore();
  const { getRooms } = useHomeStore();
  const { awayMode, toggleAwayMode, setAwayMode } = useSimlulationStore();
  const [roomList, setRoomList] = useState(getRooms());
  const [counter, setCounter] = useState(0);
  const [policeTrigger, setPoliceTrigger] = useState(false);
  const [sensor, setSensor] = useState({
    roomId: 0,
  });
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    stopCounter();
    if (location !== "" && awayMode === "ON") {
      const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [location, awayMode]);

  const onClickSetActive = async () => {
    await toggleAwayMode();
  };

  const stopCounter = () => {
    setCounter(0);
  };

  useEffect(() => {
    if (counter > 2 && location !== "") {
      setAwayMode("ON");
    } else {
      setAwayMode("OFF");
    }
  }, [counter]);

  useEffect(() => {
    async function fetchData() {
      if (awayMode === "ON") {
        ConsoleLogger(
          `Police Alert! person in ${location}`,
          location,
          " when system is in away mode.",
          {
            reason: "System Alert",
          }
        );
        if (awayMode === "ON") {
          await toggleSmartElementsType("Light", false);
          await toggleSmartElementsType("Door", false);
          await toggleSmartElementsType("Window", false);
        }
      }
    }
    fetchData();
  }, [awayMode]);

  const onSensorChange = (e) => {
    setSensor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onTimerChange = (time) => {
    setTimer(time);
  };

  const onAddMotionDetector = async (e) => {
    e.preventDefault();
    const response = await addMotionDetectors(sensor);
  };

  if (role !== "Parent") {
    return <></>;
  }

  return (
    <>
      <div>
        <div className="mx-4 my-4">
          <button onClick={onClickSetActive}>
            <span>
              <p className="bg-slate-800 text-white border px-8 py-2">
                Away Mode: {awayMode}
              </p>
            </span>
          </button>
        </div>

        {/* Motion Detector */}
        <p className="text-lg font-semibold m-4">Set Motion Detector: </p>
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

        {/* Motion Timer */}
        <p className="text-lg font-semibold m-4">Set Motion Timer: </p>
        <div className="ml-4 flex flex-row ">
          <div className="flex justify-between rounded-md border-slate-800 ">
            <NumberInput value={timer} onChange={(time) => onTimerChange(time)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
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
