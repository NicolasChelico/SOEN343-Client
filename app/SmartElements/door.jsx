import React, { useState, useEffect } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import { toggleSmartElement } from "../lib/home";

export default function Door({ doorData, roomId }) {
  const [door, setDoor] = useState(doorData);

  const handleClick = async () => {
    console.log(
      `Toggling ${door.elementType}: ${door.elementId} in room: ${roomId}`
    );
    const updatedSmartElement = await toggleSmartElement(
      roomId,
      door.elementId
    );

    setDoor(updatedSmartElement);
    console.log(
      `Toggled ${door.elementType}: ${door.elementId} in room: ${roomId}`
    );
  };

  useEffect(() => {
    setDoor(doorData);
  }, [doorData]);

  return (
    <button onClick={handleClick} className={`p-2 m-1`}>
      {door.isOpen ? (
        <FaDoorClosed size={30} color="black" />
      ) : (
        <FaDoorOpen size={30} color="black" />
      )}
    </button>
  );
}
