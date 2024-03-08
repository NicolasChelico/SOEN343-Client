import React from 'react'
import LoginCard from './Login/LoginCard';
import Navbar from './Components/Navbar/Navbar';
import HomeWrapper from './Components/HomeWrapper';


export default function Home() {

  return (
    
    // Home Wrapper is the background div that has the background Image
    <HomeWrapper>
        <Navbar />
         <LoginCard />
    </HomeWrapper> 
   
  );
}
