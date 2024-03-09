import React from "react";

export default function FormHolder(props) {
  return (
    <div className="flex justify-center h-3/6 ">
      <div className="self-center h-full w-2/5 bg-slate-50 bg-opacity-80">
        {props.children}
      </div>
    </div>
  );
}
