import React, { useState, useEffect } from "react";
import HouseLayout from "../HouseLayoutFile/HouseLayout";

// This class is the giant div that will hold the floor plan
export default function HouseContainer(props) {
  return (
    <div className='grid grid-cols-2 gap-4 p-4 w-2/3 h-7/8 my-12 mx-4 bg-[url("https://t4.ftcdn.net/jpg/01/01/78/03/360_F_101780352_I3bDsI4PGZ8hSOYxnknHS1vNp5cWokfw.jpg")]'>
    
      {props.children}
      <div className="w-full items-center">
        <p className="text-white font-bold text-800">Outside</p>
      </div>
      
    </div>
  );
}
