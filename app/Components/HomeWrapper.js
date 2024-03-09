import React from "react";

export default function HomeWrapper(props) {
  return (
    <div className="flex gap-9 justify-center flex-col bg-cover bg-no-repeat bg-center h-dvh bg-[url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
      {props.children}
    </div>
  );
}
