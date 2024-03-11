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
