import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [speedFactor, setSpeedFactor] = useState(1); // Default speed factor
    

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const currentTime = new Date(prevTime.getTime() + speedFactor * 1000); // Increase time based on speed factor
        return currentTime;
      });
    }, 1000); // Update time every second

    return () => clearInterval(intervalId); // Clean up the interval
  }, [speedFactor]); // Re-run effect when speed factor changes

  
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
            onChange={handleSpeedChange }
            value={speedFactor}
        />
       
      <h2>Time: {time.toLocaleTimeString()}</h2>
      <p>Speed Factor: x{speedFactor}</p>
    </div>
  );
}

export default Clock;
