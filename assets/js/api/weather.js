import { ajaxCall } from "../utils/apiUtils.js";
import { WEATHER_API_KEY } from "../constants/appConstants.js";
import Car from "../states/car.js";

export const getWeather = () => {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geo location not supported");
    }
  }
  function showPosition(position) {
    let lat;
    let long;
    lat = position.coords.latitude;
    long = position.coords.longitude;
    const data = ajaxCall(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${WEATHER_API_KEY}`
    );
    const response = JSON.parse(data.responseText);
    const type = response.weather[0].description;
    const celcius = (response.main.feels_like - 273.15).toFixed(1);
    const car = new Car({
      temperature: celcius,
      type: type,
    });
    $(".temperature").html(celcius + " &deg;C");
    $(".weather-status").text(type);
  }
  getLocation();
};
