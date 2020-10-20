const events = require('events');

function createObserver () {
    const observable = new events.EventEmitter();
    const OBSERVABLE_LIFE_TIME = 3000;
    const OBSERVABLE_EMIT_PERIOD = 400;

    const observableIntervalId = setInterval(() => {
        observable.emit("message", String(Math.random()*1000));
    }, OBSERVABLE_EMIT_PERIOD);
    setTimeout(() => {
        clearInterval(observableIntervalId);
    }, OBSERVABLE_LIFE_TIME);

    return observable;
}

function log (prefix) {
    return function (text) {
        console.log(prefix + ": " + text);
    }
}

function dropOnDisk (prefix) {
    return function (text) {
        console.log(`${prefix}: `, "Writing file with content", text);
    }
}

const observable1 = createObserver();
const observable2 = createObserver();

observable1.on("message", log("o1"));
observable1.on("message", dropOnDisk("o1"));
observable2.on("message", dropOnDisk("o2"));