const controls = {
  accelerate: () => accelerate(),
  brake: () => brake(),
  rotateWheelLeft: () => rotateWheelLeft(),
  rotateWheelRight: () => rotateWheelRight(),
};

const accelerate = () => {};

const brake = () => {};

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
};

export default controls;
