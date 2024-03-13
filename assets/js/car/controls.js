const controls = {
  accelerate: () => accelerate(),
  brake: () => brake(),
  rotateWheelLeft: () => rotateWheelLeft(),
  rotateWheelRight: () => rotateWheelRight(),
  horn: () => horn(),
};

let $speed = 0.9;
let roadAnimation;
let $con = 0;
let playbackRate = 1;
let isAccelerated = false;
let $carSpeed = 40;
const accelerate = () => {
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
      count++;
      $(".speedometer").text(count);
      if (count >= $carSpeed) {
        clearInterval(countdownInterval);
      }
    }, 50);
  }
};

const brake = () => {
  if (roadAnimation) {
    TweenMax.killTweensOf(".line div");
    TweenMax.set(".line div", { clearProps: "all" });
    $speed = 0.9;
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
      }
    }, 1);
  }
  $(".break-button").addClass("clicked");
};

const rotateWheelLeft = () => {
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
  $("#car-horn")[0].play();
};

export default controls;
