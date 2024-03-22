import React, { useState, useEffect, useRef } from 'react';

const Clock = (props) => {
  const [time, setTime] = useState(new Date());
  const [speedFactor, setSpeedFactor] = useState(1); // Default speed factor
  const [simulationContext, setSimulationContext] = useState(props.simulation)


  useEffect(() => {
    setSimulationContext(props.simulation);
  }, [props.simulation]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        if(!simulationContext){
          console.log('im here')
          return prevTime;
        }
        const currentTime = new Date(prevTime.getTime() + speedFactor * 1000); // Increase time based on speed factor
        return currentTime;
      });
    }, 1000); // Update time every second
    return () => clearInterval(intervalId);
   // Clean up the interval
  }, [simulationContext, speedFactor]); // Re-run effect when speed factor changes
  
  
  const handleSpeedChange = e => {
    let tempSpeed = parseFloat(e.target.value);
    if(tempSpeed < 0){
        tempSpeed = ((-1)/tempSpeed);
    }
    tempSpeed = tempSpeed.toString().slice(0,4)
    setSpeedFactor(parseFloat(tempSpeed))
    console.log(tempSpeed)
  }

  return (
    <div>
        
        <p>Speed Multiplier.</p>
        <input 
            type="range" 
            min="-5" 
            max ="100" 
            onChange={handleSpeedChange}
            value={speedFactor}
        />
       
      <h2>Time: { time.toLocaleTimeString() }  </h2>
      <p>Speed Factor: x{speedFactor}</p>
    </div>
  );
}

export default Clock;
