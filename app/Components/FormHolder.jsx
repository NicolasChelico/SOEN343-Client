import React from "react";

export default function FormHolder(props) {
  return (
    <div className="flex justify-center h-fit ">
      <div className="flex flex-col gap-4 self-center h-full w-2/5 bg-slate-50 bg-opacity-80 px-16">
        {props.children}
      </div>
    </div>
  );
}
