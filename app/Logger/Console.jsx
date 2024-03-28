import React, { useState, useEffect, useRef } from "react";
import { Console, Hook, Unhook } from "console-feed";
import { getClock } from "../lib/clock";

const ConsoleLogger = async (eventType, eventDescription, details) => {
  const timestamp = await getClock();
  const deviceId = "Thermostat-001"; // Assuming this is fixed for this example

  const logEntry = {
    timestamp,
    deviceId,
    eventType,
    eventDescription,
    details,
  };

  console.log(JSON.stringify(logEntry));
};

function LogsContainer() {
  const [logs, setLogs] = useState(() => {
    const logHistoryStr = localStorage.getItem("logHistory");
    return logHistoryStr ? JSON.parse(logHistoryStr) : [];
  });

  const logsEndRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false
    );
    return () => Unhook(hookedConsole);
  }, []);

  useEffect(() => {
    localStorage.setItem("logHistory", JSON.stringify(logs));
    scrollToBottom();
  }, [logs]);

  const onClearLogs = () => {
    setLogs([]);
    localStorage.removeItem("logHistory");
  };

  return (
    <div className="bg-white mx-4 border border-black rounded">
      <div className="w-full bg-slate-300 text-center sticky top-0 flex justify-between px-2">
        <button disabled className="text-slate-300">
          Clear
        </button>
        <p> Console </p>
        <button onClick={onClearLogs}>Clear</button>
      </div>

      <div className="overflow-scroll h-64">
        <Console logs={logs} variant="light" filter={["log"]} />
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}

export { LogsContainer, ConsoleLogger };
