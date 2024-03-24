import React, {useState, useEffect} from 'react'
import { getHomeLayout } from '../lib/home'
import SimulationOff from '../Dashboard/SimulationOff'

export default function SHH() {
  const [roomList, setRoomList] = useState([])
  const [active, setActive] = useState(true)
  const [newZone, setNewZone] = useState({
    zone:0,
    AM:0,
    PM: 0,
    NIGHT: 0
  })

  useEffect(()=> {
    getHomeLayout()
    .then(res => {
      
      setRoomList(res.roomList)
    }).catch(err => {
      console.log(err)
    })
  },[])

  const onClickSetActive = e => {
    e.preventDefault();
    setActive(!active)
  }



  console.log(' this is Home layout ', roomList)

  const onZoneChange = e => {
    setNewZone(prev => ({...prev, [e.target.name]: e.target.value}))
    console.log(newZone)
  }

  const handleNewZone = e => {
    e.preventDefault();

    

  }


  return (
    <div>
        {active ? 
          <div>
            <div className="mx-4 my-4">
          <button onClick={onClickSetActive}>
              <span>
                <p className='bg-slate-800 text-white border px-8 py-2'>SHH: {active ? 'ON':'OFF'}</p>
              </span>
            </button>
            </div>
            <div>
           
              <table className="w-3/4 border-2 my-4">
                <thead className="bg-gray-500 text-white">
                
                  <tr>
                    <th>Zone #</th>
                    <th>AM</th>
                    <th>PM</th>
                    <th>NIGHT</th>
                  </tr>
                </thead>
                <tbody >
                    {roomList.map(room => {
                      return(
                        <tr className="border-2" key={room.roomId}>
                            <td className="border-2">Zone {room.roomType}</td>
                            <td className="border-2">{room.zone}</td>
                            <td className="border-2">{room.zone}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
    
        <p className="font-bold ml-4">Create Zone:</p>
        <table className="w-full my-4 ">
          <thead>
            <tr >
                    <th>Zone #</th>
                    <th>AM</th>
                    <th>PM</th>
                    <th>NIGHT</th>
                    <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td><input name="zone" type="number" onChange={onZoneChange} className="w-2/4 border-2 border-md"/></td>
              <td><input name="AM" type="number" onChange={onZoneChange} className="w-2/4 border-2 border-md"/>°C </td>
              <td><input name="PM" type="number" onChange={onZoneChange} className="w-2/4 border-2 border-md"/>°C </td>
              <td><input name="NIGHT" type="number" onChange={onZoneChange} className="w-2/4 border-2 border-md"/>°C </td>
              <td> 
                <button className="rounded-md bg-slate-800 text-white ml-4 px-8" onClick={()=>onAddZone(newZone)}>
                  SET
                </button>
            </td>
            </tr>
          </tbody>
        </table>
       
        <p className="mt-2 font-bold">Set Zone Settings</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              
              <select className="h-7 w-1/5 border-2" name="role" placeholder="zone#">               
                  <option min='1' value="">1</option>
              </select>
              <select onChange={onZoneChange} className="h-7 border-2 w-1/4" name="role">
                <option name="AM" value="AM">AM</option>
                <option name="PM"value="PM">PM</option>
                <option name="NIGHT" value="NIGHT">NIGHT</option>
              </select>
              <input className="h-7 w-2/5 border-2" type="text" placeholder="Temperature" name="temperature" />
            </div>
            <button className="w-1/5 rounded-md bg-slate-800 text-white ml-4" onClick={()=> onAddUser(newProfile)}>
              SET
            </button>
          </div>
          <p className="mt-2 font-bold">Set Room Temperature</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              
              <select  className="h-7 border-2" name="role">
                {roomList.map(room => {
                  return(
                  <option value={room.roomId}>{room.roomType}</option>
                  )
                })}
              </select>
              <input className="h-7 w-2/5 border-2" type="text" placeholder="Temperature" name="temperature" />
            </div>
            <button className="w-1/5 rounded-md bg-slate-800 text-white ml-4" onClick={()=> onAddUser(newProfile)}>
              SET
            </button>
          </div>
          <p className="mt-2 font-bold">Assign Room to Zone</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              
              <select  className="h-7 border-2" name="role">
                {roomList.map(room => {
                  return(
                  <option value={room.roomId}>{room.roomType}</option>
                  )
                })}
              </select>
              <input className="h-7 w-2/5 border-2" type="text" placeholder="Zone #" name="temperature" />
            </div>
            <button className="w-1/5 rounded-md bg-slate-800 text-white ml-4" onClick={()=>onAddUser(newProfile)}>
              SET
            </button>
          </div>
        </div> : (
          <SimulationOff title={"SHH MODULE OFF"}>
            <button className="pt-8"onClick={onClickSetActive}>
              <span>
                <p className='bg-slate-800 text-white border px-8 py-2'>SHH: {active ? 'ON':'OFF'}</p>
              </span>
            </button>
          </SimulationOff>
        )}
    </div>
  )
}
