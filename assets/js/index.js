$(document).ready(() => {
  $("body").keyup(function () {});

  var lastKeyPressTime = 0;
  var lastKeyCode = null;
  var timeout = 300;

  const keyActions = {
    s: startEngine,
    e: offEngineRemoveKey,
  };

  const doubleInputKeys = ["e"];

  $(document).on("keydown", function (e) {
    const carAudio = $("#car-audio");
    var currentTime = new Date().getTime();
    if (
      e.which == lastKeyCode &&
      currentTime - lastKeyPressTime < timeout &&
      doubleInputKeys.includes(e.key)
    ) {
      keyActions[e.key](carAudio);
    } else {
      keyActions[e.key](carAudio);
    }
    lastKeyPressTime = currentTime;
    lastKeyCode = e.which;
  });
});

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
