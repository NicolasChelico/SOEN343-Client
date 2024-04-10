import React, { useState, useEffect } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { FaDoorClosed } from "react-icons/fa";
import { toggleSmartElement } from "../lib/element";

export default function Door({ doorData, roomId }) {
  const [door, setDoor] = useState(doorData);

  const handleClick = async () => {
    const updatedSmartElement = await toggleSmartElement(
      roomId,
      door.elementId,
      door.elementType
    );

    setDoor(updatedSmartElement);
  };

  useEffect(() => {
    setDoor(doorData);
  }, [doorData]);

  return (
    <button onClick={handleClick}>
      {door.isOpen ? (
        <FaDoorClosed size={30} color="black" />
      ) : (
        <FaDoorOpen size={30} color="black" />
      )}
    </button>
  );
}
