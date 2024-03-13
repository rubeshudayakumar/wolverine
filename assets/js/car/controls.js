import Engine from "../states/engineState.js";

const controls = {
  accelerate: () => accelerate(),
  brake: () => brake(),
  rotateWheelLeft: () => rotateWheelLeft(),
  rotateWheelRight: () => rotateWheelRight(),
  horn: () => horn(),
  stop: () => stop(),
  mirror: () => mirror(),
  music: () => music(),
};

let $speed = 0.9;
let roadAnimation;
let $con = 0;
let playbackRate = 1;
let isAccelerated = false;
let $carSpeed = 40;
let isMusicOn = false;

const accelerate = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }
  if ($speed > 0.2) {
    $speed -= 0.1;
  }
  TweenMax.killTweensOf(".line div");
  TweenMax.set(".line div", { clearProps: "all" });
  roadAnimation = TweenMax.to(".line div", $speed, {
    y: 230,
    repeat: -1,
    ease: Power0.easeInOut,
  });
  $(".accelator-button").addClass("clicked");
  let carAudio = document.getElementById("car-audio");
  if (!isAccelerated) {
    carAudio.setAttribute("src", "../assets/audio/car-acceleration.mp3");
    carAudio.loop = true;
    carAudio.playbackRate = playbackRate;
    isAccelerated = true;
    carAudio.play();
    let count = 0;
    const countdownInterval = setInterval(function () {
      count++;
      $(".speedometer").text(count);
      if (count >= $carSpeed) {
        clearInterval(countdownInterval);
      }
    }, 50);
  } else {
    let count = $carSpeed;
    $carSpeed += 30;
    if ($carSpeed > 280) {
      $carSpeed = 280;
    }
    const countdownInterval = setInterval(function () {
      $(".speedometer").text(count);
      if (count > 80) {
        $(".warning").css("display", "block");
      }
      if (count >= $carSpeed) {
        clearInterval(countdownInterval);
      }
      count++;
    }, 50);
  }
};

const brake = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }

  if (isAccelerated) {
    isAccelerated = false;
    let carAudio = document.getElementById("car-audio");
    carAudio.setAttribute("src", "../assets/audio/car-brake.mp3");
    carAudio.loop = false;
    carAudio.play();
    let count = $carSpeed;

    const countdownInterval = setInterval(function () {
      count--;
      $(".speedometer").text(count);
      if (count <= 0) {
        clearInterval(countdownInterval);
        if (roadAnimation) {
          TweenMax.killTweensOf(".line div");
          TweenMax.set(".line div", { clearProps: "all" });
          $speed = 0.9;
        }
      }
      if (count < 80) {
        $(".warning").css("display", "none");
      }
    }, 20);
    $carSpeed = 40;
  }
  $(".break-button").addClass("clicked");
  const carAudio = $("#car-audio");
  setTimeout(() => {
    carAudio.attr("src", "../assets/audio/car-idle.mp3").attr("loop", true);
    carAudio[0].play();
  }, 1000);
};

const stop = () => {
  if (roadAnimation) {
    TweenMax.killTweensOf(".line div");
    TweenMax.set(".line div", { clearProps: "all" });
    $speed = 0.9;
  }
};

const rotateWheelLeft = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }
  const rotationSpeed = 5;
  var carWheel = $(".steering-wheel");
  var currentRotation = parseInt(carWheel.data("rotation"));
  if (isNaN(currentRotation)) {
    currentRotation = 0;
  }
  var newRotation;
  newRotation = currentRotation - rotationSpeed;
  carWheel.css("transform", "rotate(" + newRotation + "deg)");
  carWheel.data("rotation", newRotation);
  $con += 2;
  TweenMax.to(".line", 2, {
    rotationY: $con,
    yoyo: true,
    ease: Power2.easeInOut,
  });
};

const rotateWheelRight = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }
  const rotationSpeed = 5;
  var carWheel = $(".steering-wheel");
  var currentRotation = parseInt(carWheel.data("rotation"));
  if (isNaN(currentRotation)) {
    currentRotation = 0;
  }
  var newRotation;
  newRotation = currentRotation + rotationSpeed;
  carWheel.css("transform", "rotate(" + newRotation + "deg)");
  carWheel.data("rotation", newRotation);
  $con -= 2;
  TweenMax.to(".line", 2, {
    rotationY: $con,
    yoyo: true,
    ease: Power2.easeInOut,
  });
};

const horn = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }
  $(".speaker-button > img").attr("src", "../assets/icons/volume-2.png");
  $(".speaker-button").addClass("clicked");
  setTimeout(() => {
    $(".speaker-button").removeClass("clicked");
    $(".speaker-button > img").attr("src", "../assets/icons/volume.png");
  }, 1000);
  $("#car-horn")[0].play();
};
var toggle = true;
const mirror = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }
  const outputCanvas = document.getElementById("output");
  const context = outputCanvas.getContext("2d");
  const container = document.querySelector("#container");
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (!toggle) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        const mediaStream = player.srcObject;
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        container.style.display = "none";
        $(".camera-button").removeClass("camera-button-active");
        $(".camera-button > img").attr(
          "src",
          "../assets/icons/camera-grey.png"
        );
      } else {
        container.style.display = "block";
        $(".camera-button").addClass("camera-button-active");
        $(".camera-button > img").attr(
          "src",
          "../assets/icons/camera-navy.png"
        );
      }
      toggle = !toggle;
      player.srcObject = stream;
    })
    .catch((error) => {
      console.error("Can not get an access to a camera...", error);
    });
};

const music = () => {
  const engine = new Engine();
  if (!engine.getState().isEngineOn) {
    return;
  }
  if (isMusicOn) {
    $(".music-button > img").attr("src", "../assets/icons/song-disabled.png");
    $(".music-button").removeClass("clicked");
    $("#car-music").attr("src", "");
    $("#car-music")[0].play();
    isMusicOn = false;
  } else {
    $(".music-button > img").attr("src", "../assets/icons/song.png");
    $(".music-button").addClass("clicked");
    $("#car-music").attr("src", "./assets/audio/car-music.mp3");
    $("#car-music")[0].play();
    isMusicOn = true;
  }
};

export default controls;
