import React, { useState, useEffect } from "react";
import SHS from "../Modules/SHS";
import axios from "axios";
import SHC from "../Modules/SHC";

export default function CommandsContainer(props) {
  const [activeElement, setActiveElement] = useState("SHC");

  const handleClick = (element) => {
    setActiveElement(element);
  };

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
  }, []);

  const onDelete = (userId) => {
    console.log(userId);
  };

  return (
    <div className="flex flex-col w-2/4 h-7/8 mt-12 ml-4 mb-12 rounded-md border-2 border-slate-800">
        

      {props.children}
    </div>
  );
}
