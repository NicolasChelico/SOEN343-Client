import React, { useState, useEffect, useRef } from "react";
import { Console, Hook, Unhook } from "console-feed";

const ConsoleLogger = (message) => {
  var date = new Date();
  date = date.toLocaleString("en-US");
  console.log(`${date} - ${message}`);
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

  return (
    <div className="bg-white mx-4 border border-black rounded">
      <p className="w-full bg-slate-300 text-center sticky top-0"> Console </p>
      <div className="overflow-scroll h-64">
        <Console logs={logs} variant="light" filter={["log"]} />
        <div ref={logsEndRef} />
      </div>
    </div>
  );
}

export { LogsContainer, ConsoleLogger };
