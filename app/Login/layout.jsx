import React from "react";
import HomeWrapper from "../Components/HomeWrapper";
import Navbar from "../Components/Navbar/Navbar";

export default function LoginLayout({
  children, // will be a page or nested layout
}) {
  return (
    <HomeWrapper>
      <Navbar></Navbar>
      {children}
    </HomeWrapper>
  );
}
