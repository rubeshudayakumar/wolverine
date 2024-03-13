export const getCurrentTime = () => {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var currentTimeString = hours + ":" + minutes + " " + ampm;
  return currentTimeString;
};

export const getGreetMessage = () => {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();

  if (hours >= 5 && hours <= 12) {
    if (hours == 12 && minutes == 0) {
      $(".time-wish").text("Good Morning");
    } else {
      $(".time-wish").text("Good Afternoon");
    }
  } else if (hours >= 12 && hours <= 18) {
    if (hours == 18 && minutes == 0) {
      $(".time-wish").text("Good Afternoon");
    } else {
      $(".time-wish").text("Good Evening");
    }
  } else {
    $(".time-wish").text("Good Evening");
  }
};
