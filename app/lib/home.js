import axios from "axios";
import { ConsoleLogger } from "../Logger/Console";

const getHomeLayout = async () => {
  return await axios
    .get("http://localhost:8080/HomeController/Home")
    .then((response) => {
      return response.data;
    });
};

const toggleSmartElement = async (roomId, elementId, elementType) => {
  return await axios
    .post(`http://localhost:8080/SmartElementController/ToggleSmartElement`, {
      roomId,
      elementId,
    })
    .then((response) => {
      ConsoleLogger(
        `Toggled ${elementType}: ${elementId} in room: ${roomId} - ${
          response.data.isOpen ? "open" : "close"
        }`
      );
      return response.data;
    });
};

const toggleAllLights = async (isOpen) => {
  return await axios
    .post(`http://localhost:8080/HomeController/SetAllElements`, {
      elementType: "Light",
      isOpen,
    })
    .then((response) => {
      return response.data;
    });
};

const toggleRoomLights = async (roomId) => {
  return await axios
    .post("http://localhost:8080/RoomController/ToggleRoom", {
      roomId,
      elementType: "Light",
    })
    .then((response) => {
      return response.data;
    });
};

export { getHomeLayout, toggleSmartElement, toggleAllLights, toggleRoomLights };
