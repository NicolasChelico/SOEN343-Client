import React, { useState, useEffect } from "react";
import { deleteUser, generateRandomStrings, onAddUser } from "../lib/users";
import axios from "axios";
import PermissionModal from "../Permissions/PermissionModal";
import { useAuthStore } from "../Store/user.store";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

export default function SHS() {
  const [users, setUsers] = useState([]);
  const [randomUsername, randomPassword] = generateRandomStrings(8);
  const [indoorTemp, setIndoorTemp] = useState(""); // State variable to store the value of the input field
  const [outdoorTemp, setOutdoorTemp] = useState("");
  const { role } = useAuthStore();

  const handleIndoorChange = (e) => {
    setIndoorTemp(e.target.value); // Update the state variable with the input field value
  };

  const handleOutDoorChange = (e) => {
    setOutdoorTemp(e.target.value); // Update the state variable with the input field value
  };

  useEffect(() => {}, []);
  const handleSetIndoorTemp = () => {
    localStorage.setItem("indoorTemp", indoorTemp); // Access the value of the input field from the state variable
  };

  const handleSetOutdoorTemp = () => {
    localStorage.setItem("outdoorTemp", outdoorTemp); // Access the value of the input field from the state variable
  };

  const [newProfile, setNewProfile] = useState({
    name: "",
    userName: "",
    password: "",
    role: "",
    location: "",
  });

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
  }, [localStorage, users]);

  const onUserChange = (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    // console.log(newProfile)
  }, [newProfile]);

  return (
    <>
      <div>
        <p className="text-lg font-semibold m-4">Profiles</p>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Role</Th>
                <Th>Location</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>{user.role}</Td>
                  <Td>{user.location}</Td>
                  <Td>
                    {role === "Parent" ? (
                      <button
                        className="px-2 py-2 bg-red-300"
                        onClick={() => deleteUser(user)}
                      >
                        Delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
      {role === "Parent" ? (
        <>
          <div>
            <p className="text-lg font-semibold m-4">Add User</p>
            <div className="flex flex-row px-4">
              <div className="flex justify-between gap-4 rounded-md border-slate-800 ">
                <input
                  className="h-7 w-24 border-2"
                  type="text"
                  placeholder="Username"
                  name="name"
                  onChange={onUserChange}
                />
                <input
                  className="h-7 w-24 border-2"
                  type="text"
                  placeholder="Name"
                  name="userName"
                  onChange={onUserChange}
                />
                <input
                  className="h-7 w-24 border-2"
                  type="text"
                  placeholder="Password"
                  name="password"
                  onChange={onUserChange}
                />
                <select
                  onChange={onUserChange}
                  className="h-7 w-1/5"
                  name="role"
                >
                  <option value="">--</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Guest">Guest</option>
                  <option value="Stranger">Stranger</option>
                </select>
                <select
                  className="h-7 w-1/5"
                  name="location"
                  onChange={onUserChange}
                >
                  <option value="">--</option>
                  <option name="LivingRoom" value="LivingRoom">
                    {" "}
                    Living Room
                  </option>
                  <option name="Kitchen" value="Kitchen">
                    {" "}
                    Kitchen
                  </option>
                  <option name="Garage" value="Garage">
                    {" "}
                    Garage
                  </option>
                  <option name="Bedroom" value="Bedroom">
                    {" "}
                    Bedroom
                  </option>
                  <option name="BuildingEntrance" value="BuildingEntrance">
                    {" "}
                    Building Entrance
                  </option>
                  <option name="Outdoor" value="Outdoor">
                    {" "}
                    Outdoor
                  </option>
                  <option name="Backyard" value="Backyard">
                    {" "}
                    Backyard
                  </option>
                </select>
              </div>
              <button
                className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
                onClick={() => onAddUser(newProfile)}
              >
                Add+
              </button>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold m-4">Change Outdoor temp</p>
            <div className="flex flex-row px-4">
              <div className="flex justify-between rounded-md border-slate-800 ">
                <input
                  type="number"
                  name="outdoorTemp"
                  className="w-16 text-center border-slate-800 border-2"
                  onChange={handleOutDoorChange}
                />
                °C
              </div>
              <button
                className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
                onClick={handleSetOutdoorTemp}
              >
                SET
              </button>
            </div>

            <p className="text-lg font-semibold m-4">Change Indoor temp</p>
            <div className="flex flex-row px-4">
              <div className="flex justify-between rounded-md border-slate-800 ">
                <input
                  type="number"
                  name="outdoorTemp"
                  className="w-16 text-center border-slate-800 border-2"
                  onChange={handleIndoorChange}
                />
                °C
              </div>
              <button
                className="w-1/5 rounded-md bg-slate-800 text-white ml-4"
                onClick={handleSetIndoorTemp}
              >
                SET
              </button>
            </div>
          </div>{" "}
        </>
      ) : (
        <></>
      )}

      <div className="h-full relative">
        <PermissionModal
          module={"SHS"}
          parents={"Full access"}
          // eslint-disable-next-line react/no-children-prop
          children={"Half"}
          guest={"guest"}
          stranger={"stranger"}
        />
      </div>
    </>
  );
}
