import React, { useState, useEffect } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
export default function Door({ doorData, roomId }) {
  const [door, setDoor] = useState(doorData);

  const handleClick = () => {
    setDoor((prevDoor) => ({ ...prevDoor, open: !prevDoor.open }));
    console.log(`Toggle Door in room: ${roomId}`);
  };

  useEffect(() => {
    setDoor(doorData);
  }, [doorData]);

  return (
    <button
      onClick={handleClick}
      className={`p-2 m-1`}
    >
      {door.open ? <FaDoorClosed size={30}/>:<FaDoorOpen size={30}/>}
    </button>
  );
}
