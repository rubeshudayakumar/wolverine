import { getCurrentTime } from "../utils/dateUtils.js";

let instance;
class Car {
  constructor() {
    if (instance) {
      return instance;
    }
    this.state = {
      fuel: 60,
      time: getCurrentTime(),
      speed: 0,
      isEngineOn: false,
    };
    instance = this;
  }

  getState() {
    return this.state;
  }

  setState(value) {
    this.state = value;
  }
}

export default Car;
