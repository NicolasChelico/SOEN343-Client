import React from "react";

export default function FormHolder(props) {
  return (
    <div className="flex  justify-center h-fit">
      <div className="flex flex-col gap-4 self-center h-96 w-2/5 bg-slate-50 rounded-lg border border-gray-300 px-16 py-4">
        {props.children}
      </div>
    </div>
  );
}
