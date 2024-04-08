import axios from "axios";

const getOutdoorTemp = async () => {
    return await axios.get('http://localhost:8080/TemperatureController/GetOutdoorTemp')
    .then(res => {
        return res.data
    }).catch(err => {
        console.log(err)
    })
}

export { getOutdoorTemp }