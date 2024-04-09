import React, { useState, useEffect } from "react";
import SimulationOff from "../Dashboard/SimulationOff";
import PermissionModal from "../Permissions/PermissionModal";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

import { useHomeStore } from "../Store/home.store";
import { useZoneStore } from "../Store/zone.store";

export default function SHH() {
  const { initZone, getZones, addZone, addRoomToZone } = useZoneStore();
  const { getRooms } = useHomeStore();
  const zones = getZones();
  const roomList = getRooms();

  const [active, setActive] = useState(true);
  const [assignedSelectedRoom, setAssignedSelectedRoom] = useState();
  const [assignedZone, setAssignedZone] = useState();

  const [setTemp, setSetTemp] = useState(0);
  const [tempRoomId, setTempRoomId] = useState();

  const [newZone, setNewZone] = useState({
    zone: 0.0,
    AM: 0.0,
    PM: 0.0,
    NIGHT: 0.0,
  });

  useEffect(() => {
    initZone();
  }, []);

  const onClickSetActive = (e) => {
    e.preventDefault();
    setActive(!active);
  };

  const onZoneChange = (e) => {
    setNewZone((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onAddZone = async (e) => {
    e.preventDefault();
    try {
      // Call addZone function to add the new zone
      addZone(newZone);
      newZone.zone = 0.0;
      newZone.AM = 0.0;
      newZone.PM = 0.0;
      newZone.NIGHT = 0.0;

      // // Update the zones state with the updated data
    } catch (error) {
      console.log(error);
    }
  };

  const handleZoneAssignment = async (e) => {
    e.preventDefault();
    if (!assignedSelectedRoom || !assignedZone) {
      console.log("Please select a room and a zone");
      return;
    }
    await addRoomToZone(assignedZone, assignedSelectedRoom);
  };

  const handleSetTemp = async (e) => {
    await setRoomTemp(tempRoomId, setTemp);
  };

  const handleTempReset = async (e) => {
    await resetRoomTemp(tempRoomId);
  };

  return (
    <>
      <div>
        {active ? (
          <div>
            <div className="m-4">
              <button onClick={onClickSetActive}>
                <span>
                  <p className="bg-slate-800 text-white border px-8 py-2">
                    SHH: {active ? "ON" : "OFF"}
                  </p>
                </span>
              </button>
            </div>
            <TableContainer>
              <Table variant="simple">
                <TableCaption>Zone Settings</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Zone #</Th>
                    <Th>AM</Th>
                    <Th>PM</Th>
                    <Th>NIGHT</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {zones.length > 0 &&
                    zones.map((zone) => {
                      return (
                        <Tr key={zone.zoneId}>
                          <Td>Zone {zone.zoneId}</Td>
                          <Td>{zone.amTemp}˚ C</Td>
                          <Td>{zone.pmTemp}˚ C</Td>
                          <Td>{zone.nightTemp}˚ C</Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
            </TableContainer>

            <p className="text-lg font-semibold mx-4 mt-2">Create Zone</p>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Zone #</Th>
                    <Th>AM</Th>
                    <Th>PM</Th>
                    <Th>NIGHT</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <input
                        name="zone"
                        min={zones.length + 1}
                        type="number"
                        onChange={onZoneChange}
                        className="w-3/4 border-2 border-md"
                      />
                    </Td>
                    <Td>
                      <input
                        name="AM"
                        type="number"
                        onChange={onZoneChange}
                        className="w-2/4 border-2 border-md"
                      />
                      °C{" "}
                    </Td>
                    <Td>
                      <input
                        name="PM"
                        type="number"
                        onChange={onZoneChange}
                        className="w-2/4 border-2 border-md"
                      />
                      °C{" "}
                    </Td>
                    <Td>
                      <input
                        name="NIGHT"
                        type="number"
                        onChange={onZoneChange}
                        className="w-2/4 border-2 border-md"
                      />
                      °C{" "}
                    </Td>
                    <Td>
                      <button
                        className="rounded-md bg-slate-800 text-white ml-4 px-8"
                        onClick={onAddZone}
                      >
                        SET
                      </button>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>

            <p className="text-lg font-semibold m-4">Set Zone Settings</p>
            <div className="flex flex-row px-4">
              <div className="flex justify-between rounded-md border-slate-800 ">
                <select
                  className="h-7 w-1/5 border-2"
                  name="role"
                  placeholder="zone#"
                >
                  {zones &&
                    zones.map((zone) => {
                      return (
                        <option key={zone.zoneId} value={zone.zoneId}>
                          {zone.zoneId}
                        </option>
                      );
                    })}
                </select>
                <select
                  onChange={onZoneChange}
                  className="h-7 border-2 w-1/4"
                  name="role"
                >
                  <option name="AM" value="AM">
                    AM
                  </option>
                  <option name="PM" value="PM">
                    PM
                  </option>
                  <option name="NIGHT" value="NIGHT">
                    NIGHT
                  </option>
                </select>
                <input
                  className="h-7 w-2/5 border-2"
                  type="text"
                  placeholder="Temperature"
                  name="temperature"
                />
              </div>
              <button
                className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
                onClick={() => onAddUser(newProfile)}
              >
                SET
              </button>
            </div>
            <p className="text-lg font-semibold m-4">Set Room Temperature</p>
            <div className="flex flex-row px-4">
              <div className="flex justify-between rounded-md border-slate-800 ">
                <select className="h-7 border-2" name="role">
                  {roomList &&
                    roomList.map((room, index) => {
                      return (
                        <option key={index} value={room.roomId}>
                          {room.roomType}
                        </option>
                      );
                    })}
                </select>
                <input
                  className="h-7 w-2/5 border-2"
                  type="text"
                  placeholder="Temperature"
                  name="temperature"
                />
              </div>
              <button
                className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
                onClick={() => onAddUser(newProfile)}
              >
                SET
              </button>
            </div>
            <p className="text-lg font-semibold m-4">Assign Room to Zone</p>
            <div className="flex flex-row px-4">
              <div className="flex justify-between items-center rounded-md border-slate-800 ">
                <select
                  className="h-7 border-2"
                  name="role"
                  onChange={(e) => setAssignedSelectedRoom(e.target.value)}
                  value={assignedSelectedRoom}
                >
                  {roomList &&
                    roomList.map((room) => {
                      return (
                        <option key={room.roomId} value={room.roomId}>
                          {room.roomType}
                        </option>
                      );
                    })}
                </select>
                <p>Zone #</p>
                <select
                  onChange={(e) => setAssignedZone(e.target.value)}
                  value={assignedZone}
                >
                  {zones &&
                    zones.map((zone) => {
                      return (
                        <option key={zone.zoneId} value={zone.zoneId}>
                          {zone.zoneId}
                        </option>
                      );
                    })}
                </select>
              </div>
              <button
                className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
                onClick={handleZoneAssignment}
              >
                SET
              </button>
            </div>
          </div>
        ) : (
          <SimulationOff title={"SHH MODULE OFF"}>
            <button className="pt-8" onClick={onClickSetActive}>
              <span>
                <p className="bg-slate-800 text-white border px-8 py-2">
                  SHH: {active ? "ON" : "OFF"}
                </p>
              </span>
            </button>
          </SimulationOff>
        )}
      </div>
      <div className="h-full relative">
        <PermissionModal
          module={"SHH"}
          parents={
            "All permissions granted to operate the SHH from home, or remotely."
          }
          // eslint-disable-next-line react/no-children-prop
          children={
            "Permission to increase/decrease the temperature of the room where they are physically located."
          }
          guest={
            "Permission to increase/decrease the temperature of the room where they are physically located."
          }
          stranger={
            "Non-identified users have no permissions no matter where they are located."
          }
        />
      </div>
    </>
  );
}
