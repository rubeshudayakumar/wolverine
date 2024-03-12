import engine from "./engine/engine.js";
import { DOUBLE_INPUT_KEYS } from "./constants/appConstants.js";
import Car from "./states/car.js";
import { getWeather } from "./api/weather.js";

$(document).ready(async () => {
  const weatherData = await getWeather();

  var lastKeyPressTime = 0;
  var lastKeyCode = null;
  const timeout = 300;

  const keyActions = {
    s: engine.start,
    e: engine.off,
  };

  $(document).on("keydown", function (e) {
    const carAudio = $("#car-audio");
    var currentTime = new Date().getTime();
    if (
      e.which == lastKeyCode &&
      currentTime - lastKeyPressTime < timeout &&
      DOUBLE_INPUT_KEYS.includes(e.key)
    ) {
      keyActions[e.key](carAudio);
    } else if (!DOUBLE_INPUT_KEYS.includes(e.key)) {
      keyActions[e.key](carAudio);
    }
    lastKeyPressTime = currentTime;
    lastKeyCode = e.which;
  });
});
