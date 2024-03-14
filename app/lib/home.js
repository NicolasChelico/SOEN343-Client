import axios from "axios";

const getHomeLayout = async () => {
  return await axios
    .get("http://localhost:8080/HomeController/Home")
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

const toggleSmartElement = async (roomId, elementId) => {
  return await axios
    .post(`http://localhost:8080/SmartElementController/ToggleSmartElement`, {
      roomId,
      elementId,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

const toggleAllLights = async (isOpen) => {
  return await axios
    .post(`http://localhost:8080/HomeController/setAllElements`, {
      elementType: "Light",
      isOpen,
    })
    .then((response) => {
      console.log(response.data);
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
      console.log(response.data);
      return response.data;
    });
};
export { getHomeLayout, toggleSmartElement, toggleAllLights, toggleRoomLights };
