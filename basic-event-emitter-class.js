class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => {
                listener(...args);
            });
        }
    }

    off(eventName, listener) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(l => l !== listener);
        }
    }

    once(eventName, listener) {
        const onceWrapper = (...args) => {
            listener(...args);
            this.off(eventName, onceWrapper);
        };
        this.on(eventName, onceWrapper);
    }
}

// Example usage
const myEmitter = new EventEmitter();

function c1(arg) {
    console.log('c1', arg);
}
function c2(arg) {
    console.log('c2', arg);
}

myEmitter.on('event', c1);
myEmitter.on('event', c2);

console.log("First emit:");
myEmitter.emit('event', 'event with 2 listeners');

myEmitter.off('event', c1);

console.log("Second emit:");
myEmitter.emit('event', 'event with 1 listener');

myEmitter.once('eventOnce', (msg) => console.log(msg));

console.log("First eventOnce emit:");
myEmitter.emit('eventOnce', 'eventOnce fired');

console.log("Second eventOnce emit (should not fire):");
myEmitter.emit('eventOnce', 'eventOnce will not fire again');
