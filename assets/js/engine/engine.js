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
};

const offEngineRemoveKey = (carAudio) => {
  carAudio.attr("src", "../assets/audio/car-off.mp3");
  carAudio.attr("loop", false);
  carAudio[0].play();
};

export default engine;
