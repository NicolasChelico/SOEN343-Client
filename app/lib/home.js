import axios from "axios";
import { ConsoleLogger } from "../Logger/Console";

// Function to get the home layout data from the server
const getHomeLayout = async () => {
  return await axios
    .get("http://localhost:8080/HomeController/Home")
    .then((response) => {
      return response.data;
    });
};

// Function to toggle a smart element in a room
const toggleSmartElement = async (roomId, elementId, elementType) => {
  return await axios
    .post(`http://localhost:8080/SmartElementController/ToggleSmartElement`, {
      roomId,
      elementId,
    })
    .then((response) => {
      const element = response.data;
      // If the element is a window and it's blocked, log a message
      if (element.elementType === "Window" && element.isBlocked === true) {
        ConsoleLogger(
          "Blocked Smart Element",
          `${elementType} ${elementId} in room ${roomId} is blocked.`,
          {
            previousState: response.data.isOpen ? "On" : "Off",
            currentState: response.data.isOpen ? "On" : "Off",
            reason: "User Interaction",
            user: localStorage.getItem("userName"),
          }
        );
      } else {
        // Otherwise, log a message that the element was toggled
        ConsoleLogger(
          "Toggled Smart Element",
          `${elementType} ${elementId} in room ${roomId} was toggled.`,
          {
            previousState: !response.data.isOpen ? "On" : "Off",
            currentState: response.data.isOpen ? "On" : "Off",
            reason: "User Interaction",
            user: localStorage.getItem("userName"),
          }
        );
      }

      return response.data;
    });
};

// Function to toggle all lights in the home
const toggleAllLights = async (isOpen) => {
  return await axios
    .post(`http://localhost:8080/HomeController/SetAllElements`, {
      elementType: "Light",
      isOpen,
    })
    .then((response) => {
      // Log a message that all lights were toggled
      ConsoleLogger(
        "Toggled All Lights",
        `All lights were toggled ${isOpen ? "on" : "off"}.`,
        {
          previousState: !response.data.isOpen ? "On" : "Off",
          currentState: response.data.isOpen ? "On" : "Off",
          reason: "User Interaction",
          user: localStorage.getItem("userName"),
        }
      );
      return response.data;
    });
};

// Function to toggle all lights in a room
const toggleRoomLights = async (roomId) => {
  return await axios
    .post("http://localhost:8080/RoomController/ToggleRoom", {
      roomId,
      elementType: "Light",
    })
    .then((response) => {
      // Log a message that all lights in the room were toggled
      ConsoleLogger(
        "Toggled Room Lights",
        `All lights in ${response.data.roomType} were toggled.`,
        {
          previousState: !response.data.isOpen ? "On" : "Off",
          currentState: response.data.isOpen ? "On" : "Off",
          reason: "User Interaction",
          user: localStorage.getItem("userName"),
        }
      );
      return response.data;
    });
};

export { getHomeLayout, toggleSmartElement, toggleAllLights, toggleRoomLights };
