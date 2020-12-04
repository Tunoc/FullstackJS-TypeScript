import { SERVER_URL } from "./settings";

ServerFacade = () => {
  /*
  async function fetchGameArea() {
    const res = await fetch(`${SERVER_URL}/geoapi/gamearea`).then(res => res.json());
    return res.coordinates;
  }

  async function isUserInArea(lon, lat) {
    const status = await fetch(`${SERVER_URL}/geoapi/isuserinarea/${lon}/${lat}`).
                    then(res => res.json())
    return status;
  }
  */

  async function nearByPlayers(userName, password, lon, lat, distance) {
    const newPosition = {
      "userName": userName,
      "password": password,
      "lat": lat,
      "lon": lon,
      "distance": Number(distance)
    }
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPosition)
    }
    const result = await fetch(`${SERVER_URL}/api/gameapi/nearbyplayers`, config).then(r => r.json());
    return result;
  }

  return {
    nearByPlayers,
  }
}

export default ServerFacade();