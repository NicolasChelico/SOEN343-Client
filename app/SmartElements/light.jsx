import axios from "axios";
import React, { useState, useEffect } from "react";
import { toggleLight } from "../lib/home";

export default function Light({ lightData, roomId }) {
  const [light, setLight] = useState(lightData);

  const handleCLick = async () => {
    const updatedLight = await toggleLight(roomId, light.elementId);
    setLight(updatedLight);
    console.log(`Toggle light: ${light.elementId} in room: ${roomId}`);
  };

  useEffect(() => {
    setLight(lightData);
  }, [lightData]);

  return (
    <button
      onClick={handleCLick}
      className={`p-2 m-1 rounded-full ${
        light.isOpen ? "bg-yellow-500" : "bg-gray-500"
      }`}
    >
      {" "}
    </button>
  );
}
