import controls from "../car/controls.js";
import Car from "../states/car.js";

const engine = {
  start: (key) => startEngine(key),
  off: (key) => offEngineRemoveKey(key),
  refill: () => refill(),
};

let currentMinute = 0;
let currentPercentage = 100;
let fuelConsumption;

const startEngine = (carAudio) => {
  carAudio.attr("src", "../assets/audio/car-start.mp3");
  carAudio[0].play();
  setTimeout(() => {
    carAudio.attr("src", "../assets/audio/car-idle.mp3");
    carAudio.attr("loop", true);
    carAudio[0].play();
  }, 2500);
  $(".gas-bar").css("width", currentPercentage + "%");
  const powerBtn = $(".power-on-btn");
  powerBtn.addClass("clicked");
  setTimeout(() => {
    powerBtn.removeClass("clicked");
  }, 2000);

  const car = new Car();
  $(".speaker-button").attr("src", "../assets/audio/volume-2.png");

  $(".current-time").text(car.getState().time);
  $(".gas-litre-count").text(car.getState().fuel);
  $(".speedometer").text(car.getState().speed);

  setTimeout(() => {
    $(".dash-board-initial").css("display", "none");
    $(".dash-board-display").css("display", "block");
    $(".car-controls").css("display", "block");
  }, 3000);

  fuelConsumption = setInterval(() => {
    if (currentPercentage > 0) {
      currentMinute += 1;
      currentPercentage -= 20;
      $(".gas-bar").css("width", currentPercentage + "%");
      if (currentPercentage <= 80 && currentPercentage >= 60) {
        $(".nitro-button > img").attr(
          "src",
          "../assets/icons/nitro-power-orange.png"
        );
        $(".gas-bar").css("background-color", "#F9F88D");
      } else if (currentPercentage <= 60 && currentPercentage >= 40) {
        $(".gas-bar").css("background-color", "#F59538");
      } else if (currentPercentage < 40) {
        $(".gas-bar").css("background-color", "#CC3336");
      }
      $(".gas-litre-count").text((currentPercentage / 100) * 60);
      if ((currentPercentage / 100) * 60 == 0) {
        offEngineRemoveKey($("#car-audio"));
        clearInterval(fuelConsumption);
      }
    }
  }, 1000 * 60);
};

const offEngineRemoveKey = (carAudio) => {
  carAudio.attr("src", "../assets/audio/car-off.mp3");
  carAudio.attr("loop", false);
  carAudio[0].play();
  $(".power-button").addClass("clicked");
  setTimeout(() => {
    $(".dash-board-initial").css("display", "block");
    $(".dash-board-display").css("display", "none");
    $(".car-controls").css("display", "none");
    $(".power-button").removeClass("clicked");
    controls.stop();
  }, 2000);
  clearInterval(fuelConsumption);
};

const refill = () => {
  currentPercentage = 100;
  currentMinute = 0;
  $(".nitro-button").addClass("clicked");
  $(".gas-bar").css("background-color", "#61A943");
  $(".gas-bar").css("width", "100%");
  $(".gas-litre-count").text(60);
  $(".nitro-button > img").attr("src", "../assets/icons/nitro-power-green.png");
  setTimeout(() => {
    $(".nitro-button").removeClass("clicked");
  }, 1000);
};

export default engine;
