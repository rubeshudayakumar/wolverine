import engine from "./engine/engine.js";
import { DOUBLE_INPUT_KEYS } from "./constants/appConstants.js";
import { getWeather } from "./api/weather.js";
import controls from "./car/controls.js";
import { getCurrentTime, getGreetMessage } from "./utils/dateUtils.js";
import Engine from "./states/engineState.js";

$(document).ready(async () => {
  getWeather();
  var lastKeyPressTime = 0;
  var lastKeyCode = null;
  const timeout = 1000;

  const keyActions = {
    s: engine.start,
    e: engine.off,
    a: controls.accelerate,
    b: controls.brake,
    h: controls.horn,
    r: engine.refill,
    c: controls.mirror,
    m: controls.music,
    l: controls.light,
  };

  TweenMax.set(".road", {
    perspective: 300,
  });

  TweenMax.set(".line", {
    transformOrigin: "center top",
    rotationX: 58,
    scale: 0.25,
  });
  TweenMax.to(".line", 2, {
    rotationY: 0,
    yoyo: true,
    ease: Power2.easeInOut,
  });

  var rotateInterval = false;
  var leftInterval;
  var rightInterval;

  setInterval(() => {
    $(".current-time").text(getCurrentTime());
  }, 1000 * 60);

  getGreetMessage();

  setInterval(() => getGreetMessage(), 1000 * 60 * 60);

  $(document).on("keydown", function (e) {
    if (e.keyCode == 37 && !rotateInterval) {
      leftInterval = setInterval(controls.rotateWheelLeft, 50);
      rotateInterval = true;
      $(".left-button").addClass("clicked");
    }
  });

  $(document).on("keyup", function (e) {
    if (e.keyCode == 37) {
      clearInterval(leftInterval);
      rotateInterval = false;
      $(".left-button").removeClass("clicked");
    }
    if (e.keyCode == 65) {
      $(".accelator-button").removeClass("clicked");
    }
    if (e.keyCode == 66) {
      $(".break-button").removeClass("clicked");
    }
  });

  $(document).on("keydown", function (e) {
    if (e.keyCode == 39 && !rotateInterval) {
      rightInterval = setInterval(controls.rotateWheelRight, 50);
      rotateInterval = true;
      $(".right-button").addClass("clicked");
    }
  });
  const engineState = new Engine();

  $(document).on("keyup", function (e) {
    if (e.keyCode == 39) {
      clearInterval(rightInterval);
      rotateInterval = false;
      $(".right-button").removeClass("clicked");
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
