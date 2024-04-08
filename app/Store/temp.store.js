import { create } from "zustand";
import { getOutsideTemp } from "../lib/home";

export const useTempStore = create((set, get) => ({
  temp: 0,
  initTemp: async () => {
    const temp = await getOutsideTemp();
    set({ temp });
    const intervalId = setInterval(async () => {
      const updatedTemp = await getOutsideTemp();
      set({ temp: updatedTemp });
    }, 3000);
    set({ intervalId });
  },
  setTemp: (temp) => set({ temp }),
  getTemp: () => get().temp,
}));
