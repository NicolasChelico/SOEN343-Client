import axios from "axios";

const toggleAwayModeOn = async () => {
  return await axios
    .post("http://localhost:8080/Security/TurnAwayOn")
    .then((response) => {
      return response.data;
    });
};

const toggleAwayModeOff = async () => {
  return await axios
    .post("http://localhost:8080/Security/TurnAwayOff")
    .then((response) => {
      return response.data;
    });
};

export { toggleAwayModeOn, toggleAwayModeOff };
