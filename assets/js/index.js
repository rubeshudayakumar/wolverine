import engine from "./engine/engine.js";
import { DOUBLE_INPUT_KEYS } from "./constants/appConstants.js";
import Car from "./states/car.js";
import { getWeather } from "./api/weather.js";
import controls from "./car/controls.js";

$(document).ready(async () => {
  const weatherData = await getWeather();

  var lastKeyPressTime = 0;
  var lastKeyCode = null;
  const timeout = 300;

  const keyActions = {
    s: engine.start,
    e: engine.off,
  };

  var rotateInterval;

  $(document).on("keydown", function (e) {
    if (e.keyCode == 37) {
      rotateInterval = setInterval(controls.rotateWheelLeft, 500);
      console.log("hii");
    }
  });

  $(document).on("keyup", function (e) {
    if (e.keyCode == 37) {
      clearInterval(rotateInterval);
    }
  });

  $(document).on("keydown", function (e) {
    if (e.keyCode == 39) {
      rotateInterval = setInterval(controls.rotateWheelRight, 500);
    }
  });

  $(document).on("keyup", function (e) {
    if (e.keyCode == 39) {
      clearInterval(rotateInterval);
    }
  });

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
      if (keyActions[e.key]) keyActions[e.key](carAudio);
    }
    lastKeyPressTime = currentTime;
    lastKeyCode = e.which;
  });
});
