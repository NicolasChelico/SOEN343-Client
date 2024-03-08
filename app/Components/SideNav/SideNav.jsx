import React from 'react';
import Link from 'next/link';
export default function SideNav(props){
  return (
    <div className="flex h-screen">
      <div className="w-36 bg-gray-800 text-white pt-6 p-2">
        {/* Your side navigation content goes here */}
        <h2 className="text-xl font-bold mb-16 text-center">Modules</h2>
        <ul>
          <li className="mb-4 py-8 rounded-md border-white border-2 text-center hover:text-gray-800 hover:bg-white">
            SHC
          </li>
          <li className="mb-4 py-8 rounded-md border-white border-2 text-center hover:text-gray-800 hover:bg-white">
            SHS
          </li>
          <li className="mb-4 py-8 rounded-md border-white border-2 text-center hover:text-gray-800 hover:bg-white">
            SHH
          </li>
        </ul>
      </div>
      <div className='bottom-0 fixed mb-12 w-28 ml-4 text-center bg-white rounded py-2'>
        <Link href="/">
            <button> Log out</button>
          </Link>
      </div>
    </div>
  );
};



