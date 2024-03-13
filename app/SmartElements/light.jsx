import axios from "axios";
import React, { useState, useEffect } from "react";
import { toggleLight, toggleSmartElement } from "../lib/home";

export default function Light({ lightData, roomId }) {
  const [light, setLight] = useState(lightData);

  const handleClick = async () => {
    console.log(`Toggling light: ${light.elementId} in room: ${roomId}`);
    const updatedLight = await toggleSmartElement(roomId, light.elementId);

    setLight(updatedLight);
    console.log(`Toggled light: ${light.elementId} in room: ${roomId}`);
  };

  useEffect(() => {
    setLight(lightData);
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`p-2 m-1 h-4 w-4 rounded-full ${
        light.isOpen ? "bg-yellow-500" : "bg-gray-500"
      }`}
    >
      {" "}
    </button>
  );
}
