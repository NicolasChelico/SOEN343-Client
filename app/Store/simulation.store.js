const { create } = require("zustand");

export const useSimlulationStore = create((set) => ({
  date: localStorage.getItem("date") || "",
  outdoorTemp: localStorage.getItem("outdoorTemp") || "",
  insideTemp: localStorage.getItem("insideTemp") || "",
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
}));
