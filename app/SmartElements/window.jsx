import React, { useState, useEffect } from "react";
import { toggleSmartElement } from "../lib/home";
import { GiWindow, GiWindowBars } from "react-icons/gi";

export default function Window({ windowData, roomId }) {
  const [window, setWindow] = useState(windowData);

  const handleClick = async () => {
    const updatedWindow = await toggleSmartElement(
      roomId,
      window.elementId,
      window.elementType
    );

    setWindow(updatedWindow);
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
