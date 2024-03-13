import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SHS() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/User`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUsers();
  }, [localStorage]);

  console.log(users);

  return (
    <>
      <div>
        <p className="text-lg font-semibold mb-2">Profiles</p>
        <table className="w-full border-collapse border-none">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Location</th>
              <th className="bg-white"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center border">
                <td className="border">{user.name}</td>
                <td className="border">{user.role}</td>
                <td className="border">{user.location}</td>
                <td className="border-none">
                  <button
                    className="px-2 py-2 bg-red-300"
                    onClick={() => onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 border-2">
        <div>
          <p className="mt-2">Add new profile.</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              <input className="h-7 border-2" type="text" placeholder="Name" />
              <select className="h-7 w-1/5">
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Stranger">Stranger</option>
              </select>
              <select className="h-7 w-1/5">
                <option value="Inside">Inside</option>
                <option value="Outside">Outside</option>
              </select>
            </div>
            <button className="w-1/5 rounded-md bg-slate-800 text-white ml-4">
              Add+
            </button>
          </div>
        </div>
        <div>
          <p className="mt-2">Change Outdoor temp.</p>
          <div className="flex flex-row ">
            <div className="flex justify-between rounded-md border-slate-800 ">
              <input className="h-7 border-2" type="text" placeholder="Name" />
              <select className="h-7 w-1/5">
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Stranger">Stranger</option>
              </select>
              <select className="h-7 w-1/5">
                <option value="Inside">Inside</option>
                <option value="Outside">Outside</option>
              </select>
            </div>
            <button className="w-1/5 rounded-md bg-slate-800 text-white ml-4">
              Add+
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
