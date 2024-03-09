'use client';
import React, {useEffect, useState} from 'react'
import SideNav from '../Components/SideNav/SideNav'
import CommandsContainer from './CommandsContainer';
import HouseContainer from './HouseContainer';

export default function SmartHomeSimulator() {
  return (
    <div className="flex flex-row">
      {/* // This is the sidebar holding all the modules // */}
        <SideNav />
        <CommandsContainer>
            here are the commands
        </CommandsContainer>
        
          <HouseContainer>
            
          </HouseContainer>
    </div>
  )
}
