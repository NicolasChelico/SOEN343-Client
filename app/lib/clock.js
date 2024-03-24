import axios from "axios";

const getClock = async () => {
  return await axios
    .get("http://localhost:8080/SimClock/")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const setTimeSpeed = async (speed) => {
  return await axios
    .post("http://localhost:8080/SimClock/UpdateTimeSpeed", {
      timeSpeed: speed,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

const toggleClock = async (simulation) => {
  return await axios
    .post("http://localhost:8080/SimClock/UpdateTimeSpeed", {
      timeSpeed: simulation ? 1 : 0,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export { getClock, setTimeSpeed, toggleClock };
