let instance;
class Engine {
  constructor() {
    if (instance) {
      return instance;
    }
    this.state = {
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

export default Engine;
