const controls = {
  accelerate: () => accelerate(),
  brake: () => brake(),
  rotateWheelLeft: () => rotateWheelLeft(),
  rotateWheelRight: () => rotateWheelRight(),
};
let $speed=0.9;
let roadAnimation;
let $con=0;
const accelerate = () => {
  if($speed>0.2){
    $speed-=0.1;
    }
    TweenMax.killTweensOf('.line div');
    TweenMax.set('.line div', { clearProps: 'all' });
     roadAnimation = TweenMax.to('.line div', $speed, {
        y: 230,
        repeat: -1,
        ease: Power0.easeInOut
});   
};

const brake = () => {
  if (roadAnimation) {
    TweenMax.killTweensOf('.line div');
  TweenMax.set('.line div', { clearProps: 'all' });
      $speed=0.9;
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
  $con+=2;
  TweenMax.to('.line', 2, {
    rotationY: $con,
    yoyo: true,
    ease: Power2.easeInOut
})
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
  $con-=2;
  TweenMax.to('.line', 2, {
    rotationY: $con,
    yoyo: true,
    ease: Power2.easeInOut
})
};

export default controls;
