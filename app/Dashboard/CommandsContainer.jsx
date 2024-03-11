import React, {useState, useEffect} from 'react'
import SHS from '../Modules/SHS'
import axios from 'axios';



export default function CommandsContainer(props) {
    const [activeElement, setActiveElement] = useState(null);
    const handleClick = (e) => {
        setActiveElement(e)
        console.log(activeElement)
    }

const [users, setUsers] = useState([]);

useEffect(()=> {
    const fetchUsers = async () => {
        try{
            const res = await axios.get(`http://localhost:8080/User`); 
            setUsers(res.data)
        }catch(err){
            console.log(err)
        }      
    }
    fetchUsers();
},[localStorage])


const onDelete = userId => {
    console.log(userId);
}

    

  return (
    <div className="flex flex-col w-1/3 h-7/8 mt-12 ml-4 mb-12 rounded-md border-2 border-slate-800 2/1">
      <div>
        <ul className="flex space-x-4 bg-slate-800 py-4">
            <li onClick={() => handleClick('SHS') } 
            className={`cursor-pointer border-2 border-white my-2 mx-1 px-6 py-2 ${activeElement === 'SHS' ? 'bg-white text-bg-slate-800' : 'text-white bg-slate-800'}`}>
                SHS
            </li>
            <li onClick={() => handleClick('SHC') } 
            className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${activeElement === 'SHC' ? 'bg-white text-bg-slate-800' : 'text-white'}`}>
                SHC
            </li>
            <li onClick={() => handleClick('SHP') } 
            className={`cursor-pointer border-2 border-white m-2 px-6 py-2  ${activeElement === 'SHP' ? 'bg-white text-bg-slate-800' : 'text-white'}`}>
                SHP
            </li>
            <li onClick={() => handleClick('SHH') } 
            className={`cursor-pointer border-2 border-white mx-1 my-2 px-6 py-2  ${activeElement === 'SHH' ? 'bg-white text-bg-slate-800' : 'text-white border-1'}`}>
                SHH
            </li>
        </ul>
        </div>

    {activeElement === 'SHS' ? <SHS />:'other element'}
        
{/* <div>
    <p className="text-lg font-semibold mb-2">Profiles</p>
    <table className="w-full border-collapse border">
        <thead className="bg-gray-500 text-white">
            <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Location</th>
                
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                
                <tr key={user.id} className="text-center border">
                    <td className="py-2 px-4 border">{user.id}</td>
                    <td className="py-2 px-4 border">{user.name}</td>
                    <td className="py-2 px-4 border">{user.role}</td>
                    <td className="py-2 px-4 border">{user.location}</td>
                    <td><button onClick={()=>onDelete(user.id)}>Delete</button></td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    <p className="mt-2">Add new profile.</p>
    <div className="flex flex-row rounded-md border-slate-800 border-2">
        
        <input className="m-2 w-1/4" type="text" placeholder="Name"/>
        <select className="w-1/4 m-2">
            <option value="Parent">Parent</option>
            <option value="Child">Child</option>
            <option value="Stranger">Stranger</option>
        </select>
        <select className="w-1/4 m-2">
            <option value="Inside">Inside</option>
            <option value="Outside">Outside</option>
        </select>
        <button className="rounded-md bg-slate-800 text-white my-4 py-2 px-2">Add+</button>
        
    </div> */}






        {/* {props.children} */}
    </div>
    
  )
}
