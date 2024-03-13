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

const toggleAllLights = async () => {
  return await axios
    .post(`http://localhost:8080/HomeController/toggleAllElements`, {
      elementType: "Light",
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
export { getHomeLayout, toggleSmartElement, toggleAllLights };
