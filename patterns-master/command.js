// Command
class FlipDownCommand {
  constructor(light) {
    this._light = light;
  }

  execute() {
    this._light.turnOff();
  }
}

// Command
class FlipUpCommand {
  constructor(light) {
    this._light = light;
  }

  execute() {
    this._light.turnOn();
  }
}

// Command
const T_ON = 500;
const T_OFF = 500;
const DURATION = 5000;
class BlinkCommand {
  constructor(light) {
    this._light = light;
  }

  execute() {
    const intervalId = setInterval(() => {
      this._light.turnOn();
      setTimeout(() => {
        this._light.turnOff();
      }, T_OFF)
    }, T_ON + T_OFF);

    setTimeout(() => {
      clearInterval(intervalId);
    }, 5000);
  }
}

// Receiver
class Light {
  turnOn() { console.log('turn on') }
  turnOff() { console.log('turn off') }
}

//Invoker
class Switch {
  constructor() {
    this._commands = [];
  }
  
  storeAndExecute(command) {
    this._commands.push(command);
    console.log(`START: ${command.constructor.name}`);
    command.execute();
    console.log(`END: ${command.constructor.name}`);
  }
}

var light = new Light();
var switchUp = new FlipUpCommand(light);
var switchDown = new FlipDownCommand(light);
var blink = new BlinkCommand(light);
var s = new Switch();

s.storeAndExecute(switchUp);
s.storeAndExecute(switchDown);
s.storeAndExecute(switchUp);
s.storeAndExecute(blink);


