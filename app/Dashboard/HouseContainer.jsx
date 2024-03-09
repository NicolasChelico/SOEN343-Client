import React, {useState, useEffect} from 'react'
import HouseLayout from '../HouseLayoutFile/HouseLayout';

// This class is the giant div that will hold the floor plan
export default function HouseContainer(props) {






  return (
    <div className='flex w-2/3 h-96 mt-12 ml-4 mb-12 mr-4 bg-[url("https://t4.ftcdn.net/jpg/01/01/78/03/360_F_101780352_I3bDsI4PGZ8hSOYxnknHS1vNp5cWokfw.jpg")]'>
            {props.children}
    </div>
  )
}
