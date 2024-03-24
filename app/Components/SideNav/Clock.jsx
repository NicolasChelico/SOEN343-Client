import { getClock, setTimeSpeed } from "@/app/lib/clock";
import React, { useState, useEffect, useRef } from "react";

const Clock = (props) => {
  const [time, setTime] = useState(new Date());
  const [speedFactor, setSpeedFactor] = useState(1);
  const [simulationContext, setSimulationContext] = useState(props.simulation);

  // Effect to update simulation context and speed factor when props.simulation changes
  useEffect(() => {
    setSimulationContext(props.simulation);
    setSpeedFactor(1);
  }, [props.simulation]);

  // Effect to fetch the current time from the server every 2 seconds and update the state
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const time = await getClock();
      setTime(new Date(time));
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  // Handler to change the speed factor
  const handleSpeedChange = async (e) => {
    if (!simulationContext) {
      return;
    }
    const tempSpeed = e.target.value;
    await setTimeSpeed(tempSpeed);
    setSpeedFactor(parseFloat(tempSpeed));
  };

  return (
    <div>
      <h2>Time: {time.toLocaleTimeString()} </h2>

      <p className="flex">
        Speed Factor:{" "}
        <select
          onChange={handleSpeedChange}
          className="flex justify-center items-center m-auto text-black disabled:opacity-50 disabled:bg-gray-200 disabled:cursor-not-allowed"
          value={speedFactor}
          disabled={!simulationContext}
        >
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="4">4x</option>
          <option value="8">8x</option>
          <option value="16">16x</option>
          <option value="32">32x</option>
          <option value="64">64x</option>
        </select>
      </p>
    </div>
  );
};

export default Clock;
