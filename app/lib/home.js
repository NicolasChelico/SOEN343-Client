import axios from "axios";

const getHomeLayout = async () => {
  return await axios
    .get("http://localhost:8080/HomeController/Home")
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

const toggleLight = async (roomId, elementId) => {
  return await axios
    .post(`http://localhost:8080/HomeController/ToggleSmartElement`, {
      roomId,
      elementId,
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export { getHomeLayout, toggleLight };
