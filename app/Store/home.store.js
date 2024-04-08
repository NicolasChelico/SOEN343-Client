import { create } from "zustand";
import { getHomeLayout } from "../lib/home";

export const useHomeStore = create((set, get) => ({
  home: {
    roomList: [],
    selectedRoom: null,
    // Add other properties as needed
  },
  init: async () => {
    const homeData = await getHomeLayout();
    set({ home: homeData });
    // Start the interval to update home every 3 seconds
    const intervalId = setInterval(async () => {
      const updatedHomeData = await getHomeLayout();
      set({ home: updatedHomeData });
    }, 3000);
    // Store the interval ID so it can be cleared later
    set({ intervalId });
  },
  getHome: () => get().home,
  getRooms: () => get().home.roomList,
  clearUpdateInterval: () => {
    clearInterval(get().intervalId);
  },
  setSelectedRoom: (room) => {
    set({ home: { ...get().home, selectedRoom: room } });
  },
  setRooms: (rooms) => {
    set({ home: { ...get().home, roomList: rooms } });
  },
}));
