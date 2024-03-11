import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
export default function Light(props) {

    const [lightStatus, setLightStatus] = useState(false);

    const changeLightbulb = e => {
        setLightStatus(!lightStatus)
        console.log('Lightbulb ' , props.id,' is now ' , lightStatus)
    }

  return (
    <div key={props.id} onClick={changeLightbulb} className="">
        {props.isOn ? <LuLightbulb size={30} /> : <LuLightbulbOff size={30}/>}
    </div>
  )
}
