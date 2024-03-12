import React, { useState, useEffect } from "react";
import axios from "axios";
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
export default function Light({ lightData, roomId }) {
  const [light, setLight] = useState(lightData);

  const handleClick = () => {
    setLight({ ...light, open: !light.open });
    console.log(`Toggle light: ${light.elementId} in room: ${roomId}`);
  };

  useEffect(() => {
    setLight(lightData);
  }, [lightData]);

  return (
    <button
      key={light.elementId}
      onClick={() => {
        handleClick();
      }}
      className=""
    >
      {light.open ? (
        <LuLightbulb size={30} color="yellow" />
      ) : (
        <LuLightbulbOff size={30} />
      )}
    </button>
  );
}
