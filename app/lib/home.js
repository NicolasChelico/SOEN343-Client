import axios from "axios";

// Function to get the home layout data from the server
const getHomeLayout = async () => {
  return await axios
    .get("http://localhost:8080/HomeController/Home")
    .then((response) => {
      return response.data;
    });
};

const getOutsideTemp = async () => {
  return await axios
    .get("http://localhost:8080/TemperatureController/GetOutdoorTemp")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const setRoomTemp = async (roomId, temp) => {
  return await axios
    .post("http://localhost:8080/RoomController/OverrideRoomTemp", {
      roomId,
      roomTemp: temp,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const resetRoomTemp = async (roomId) => {
  return await axios
    .post("http://localhost:8080/RoomController/ResetOverride", {
      roomId,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getHomeLayout, getOutsideTemp, setRoomTemp, resetRoomTemp };
