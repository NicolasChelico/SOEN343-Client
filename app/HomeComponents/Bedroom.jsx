import React from 'react'
import Light from '../SmartElements/light'
export default function Bedroom(props) {

  console.log(props.smartElements)
  return (
    <div key={props.id} className="flex flex-col w-1/4 h-1/4  border-2 border-black bg-white ">
      <div className="flex flex-row justify-between">    
          <Light onClick={props.onClick} isOn={props.lightStatus}/>      
      </div>
      <div className="flex justify-center">
        <h1 className="">{props.title} {props.roomId}</h1>
        
      </div>
    </div>
  )
}
