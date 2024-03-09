import React, { Children } from "react";
import HomeWrapper from "../Components/HomeWrapper";

export default function SimulatorLayout({
  children, // will be a page or nested layout
}) {
  return <HomeWrapper>{children}</HomeWrapper>;
}
