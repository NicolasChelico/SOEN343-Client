import React, { useState, useRef } from "react";
import Room from "./room";
import { roomsData } from "../HouseLayoutFile/HouseLayout"

export default function HouseLayout({houseLayout}) {
    // Take these in as props
//   const [houseLayout, setHouseLayout] = useState(roomsData);
//   const roomNumberRef = useRef(0);

//   const [houseLayout, setHouseLayout] = useState(roomsData);
//   const roomNumberRef = useRef(0);

//   const handleChange = (e) => {
//     roomNumberRef.current = e.target.value;
//   };

//   const toggleRoomLights = (roomId) => {
//     console.log(`Toggle lights in room: ${roomId}`);
//     var roomIdInt = parseInt(roomId);
//     setHouseLayout((prevState) => {
//       const updatedRooms = prevState.roomList.map((room) => {
//         if (room.roomId === roomIdInt) {
//           console.log(room);
//           return {
//             ...room,
//             smartElements: room.smartElements.map((element) => {
//               console.log(element);
//               if (element.elementType === "Light") {
//                 return { ...element, open: false };
//               }
//               return element;
//             }),
//           };
//         }
//         return room;
//       });
//       return { ...prevState, roomList: updatedRooms };
//     });
//   };

//   const toggleAllLights = () => {
//     console.log(`Toggle all lights`);
//     setHouseLayout((prevState) => {
//       const updatedRooms = prevState.roomList.map((room) => {
//         console.log(room);
//         return {
//           ...room,
//           smartElements: room.smartElements.map((element) => {
//             console.log(element);
//             if (element.elementType === "Light") {
//               return { ...element, open: false };
//             }
//             return element;
//           }),
//         };
//       });
//       return { ...prevState, roomList: updatedRooms };
//     });
//   };

  return (
    <>
      <div className="bg-slate-600">
        <div className="grid grid-cols-2 gap-4 p-4">
          {houseLayout.roomList.map((room, index) => (
            <Room key={index} roomData={room} />
          ))}
        </div>
      </div>
      {/* <div>
        <button onClick={() => toggleRoomLights(roomNumberRef.current)}>
          Toggle Lights in room:{" "}
        </button>
        <input
          type="text"
          placeholder="Enter room number"
          defaultValue={roomNumberRef.current}
          onChange={handleChange}
        />
      </div>
      <button onClick={() => toggleAllLights()}>Toggle all lights</button> */}
    </>
  );
}
