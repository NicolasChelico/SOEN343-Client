import axios from "axios";
import React, { useState, useEffect } from "react";
import { toggleLight, toggleSmartElement } from "../lib/home";
import { GiWindow, GiWindowBars } from "react-icons/gi";

export default function Window({ windowData, roomId }) {
  const [window, setWindow] = useState(windowData);

  const handleClick = async () => {
    console.log(`Toggling window: ${window.elementId} in room: ${roomId}`);
    const updatedWindow = await toggleSmartElement(roomId, window.elementId);

    setWindow(updatedWindow);
    console.log(`Toggled window: ${window.elementId} in room: ${roomId}`);
  };

  useEffect(() => {
    setWindow(windowData);
  }, []);

  return (
    <button onClick={handleClick} className={`p-2 m-1`}>
      {window.isOpen ? <GiWindow size={30} /> : <GiWindowBars size={30} />}
    </button>
  );
}
