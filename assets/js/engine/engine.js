import Car from "../states/car.js";

const engine = {
  start: (key) => startEngine(key),
  off: (key) => offEngineRemoveKey(key),
};

const startEngine = (carAudio) => {
  carAudio.attr("src", "../assets/audio/car-start.mp3");
  carAudio[0].play();
  setTimeout(() => {
    carAudio.attr("src", "../assets/audio/car-idle.mp3");
    carAudio.attr("loop", true);
    carAudio[0].play();
  }, 2500);
  const powerBtn = $(".power-on-btn");
  powerBtn.addClass("clicked");
  setTimeout(() => {
    powerBtn.removeClass("clicked");
  }, 2000);

  const car = new Car();
  setFuel(car.getState().fuel);

  $(".current-time").text(car.getState().time);
  $(".gas-litre-count").text(car.getState().fuel);
  $(".speedometer").text(car.getState().speed);

  setTimeout(() => {
    $(".dash-board-initial").css("display", "none");
    $(".dash-board-display").css("display", "block");
    $(".car-controls").css("display", "block");
  }, 3000);
};

const offEngineRemoveKey = (carAudio) => {
  carAudio.attr("src", "../assets/audio/car-off.mp3");
  carAudio.attr("loop", false);
  carAudio[0].play();
};

const setFuel = (fuel) => {
  $(".gas-bar").css("width", `${(fuel / 60) * 100}%`);
};

export default engine;