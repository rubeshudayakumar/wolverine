import { ajaxCall } from "../utils/apiUtils.js";
import { WEATHER_API_KEY } from "../constants/appConstants.js";

export const getWeather = () => {
  // const data = ajaxCall(
  //   `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${WEATHER_API_KEY}`
  // );
  return {
    temperature: "34",
    type: "Partly Cloudy",
  };
};
