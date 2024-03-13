const controls = {
  accelerate: () => accelerate(),
  brake: () => brake(),
  rotateWheelLeft: () => rotateWheelLeft(),
  rotateWheelRight: () => rotateWheelRight(),
  horn: () => horn(),
  stop: () => stop(),
  mirror: () => mirror(),

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
      if (count < 80) {
        $(".warning").css("display", "none");
      }
    }, 1);
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
  $(".speaker-button > img").attr("src", "../assets/icons/volume-2.png");
  $(".speaker-button").addClass("clicked");
  setTimeout(() => {
    $(".speaker-button").removeClass("clicked");
    $(".speaker-button > img").attr("src", "../assets/icons/volume.png");
  }, 1000);
  $("#car-horn")[0].play();
};
var toggle=true;
const mirror = () => {
  const outputCanvas = document.getElementById('output');
  const context = outputCanvas.getContext('2d');
  const container=document.querySelector("#container");
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      toggle=!toggle;
      player.srcObject = stream;
    }).catch(error => {
      console.error('Can not get an access to a camera...', error);
    });
   
  };

export default controls;
