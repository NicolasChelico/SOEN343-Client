import React from 'react'
import LoginCard from './Login/LoginCard';
import Navbar from './Navbar/Navbar';


export default function Home() {

  return (
    <div className="flex gap-9 justify-center flex-col bg-cover bg-no-repeat bg-center h-screen bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]" >
        <Navbar />
         <LoginCard />
    </div>
  );
}
