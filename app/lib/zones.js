import axios from "axios";

const getZones = async () => {
  return await axios
    .get("http://localhost:8080/ZoneController/GetZones")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addZone = async (zone) => {
  return await axios
    .post("http://localhost:8080/ZoneController/CreateZone", zone)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

const addRoomToZone = async (zoneId, roomId) => {
  return await axios
    .post("http://localhost:8080/ZoneController/AddRoomToZone", {
      zoneId,
      roomId,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};


export { getZones, addZone, addRoomToZone };
