import { create } from "zustand";
import { addRoomToZone, addZone, getZones } from "../lib/zones";

export const useZoneStore = create((set, get) => ({
  zones: [],
  selectedZone: null,
  initZone: async () => {
    const zonesData = await getZones();
    set({ zones: zonesData });
  },
  getZones: () => get().zones,
  getSelectedZone: () => get().selectedZone,
  setSelectedZone: (zone) => {
    set({ selectedZone: zone });
  },
  addZone: async (zone) => {
    const newZone = await addZone(zone);
    set({ zones: [...get().zones, newZone] });
  },
  addRoomToZone: async (zoneId, roomId) => {
    const updatedZone = await addRoomToZone(zoneId, roomId);
    set({
      zones: get().zones.map((zone) =>
        zone.id === zoneId ? updatedZone : zone
      ),
    });
  },
}));
