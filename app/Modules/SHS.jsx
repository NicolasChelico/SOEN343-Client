import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function SHS() {

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




  return (
    <>
        <div>
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
            
        </div>
    </>
  )
}
