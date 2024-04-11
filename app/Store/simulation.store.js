const { create } = require("zustand");
import { toggleAwayModeOn, toggleAwayModeOff } from "../lib/simulation";

export const useSimlulationStore = create((set, get) => ({
  date: localStorage.getItem("date") || "",
  outdoorTemp: localStorage.getItem("outdoorTemp") || "",
  insideTemp: localStorage.getItem("insideTemp") || "",
  awayMode: localStorage.getItem("awayMode") || "OFF",
  setDate: (date) => {
    localStorage.setItem("date", date);
    set({ date });
  },
  setOutdoorTemp: (outdoorTemp) => {
    localStorage.setItem("outdoorTemp", outdoorTemp);
    set({ outdoorTemp }); // Ensure the variable name matches exactly
  },
  setInsideTemp: (insideTemp) => {
    localStorage.setItem("insideTemp", insideTemp);
    set({ insideTemp });
  },
  setAwayMode: async (awayMode) => {
    if (awayMode === "ON") await toggleAwayModeOn(); //
    else if (awayMode === "OFF") await toggleAwayModeOff(); //
    localStorage.setItem("awayMode", awayMode);
    set({ awayMode });
  },
  toggleAwayMode: async () => {
    const currentAwayMode = get().awayMode;
    const newAwayMode = currentAwayMode === "ON" ? "OFF" : "ON";
    if (newAwayMode === "ON") await toggleAwayModeOn();
    else if (newAwayMode === "OFF") await toggleAwayModeOff();
    localStorage.setItem("awayMode", newAwayMode);
    set({ awayMode: newAwayMode });
    console.log(newAwayMode);
  },
}));
