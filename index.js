const { Board, Led } = require("johnny-five");
const board = new Board();
let led;
// morse code info
const morse = require('morse');
const word = process.argv.slice(2); //take phrase from node
const dotDash = []; //dots and dashes array
const litLed = []; //methods array for loop

var encoded = morse.encode(word);
for(var i=0; i<word.length; i++){
    dotDash.push(encoded[i].split(''), 'space');
}

const final = dotDash.flat(); //flatten encoded array


for(var i=0; i<final.length; i++){
    if(final[i]=='.'){
        litLed.push({
            method: "fadeIn",
            args: [
                500,
                () => {
                console.log(final[i]);
                }
            ],
            duration: 500
        }, {
            method: "fadeOut",
            args: [
                500
            ],
            duration: 500
        })
    } else if (final[i]=='-'){
        litLed.push({
            method: "fadeIn",
            args: [
                1000
            ],
            duration: 1000,
        }, {
            method: "fadeOut",
            args: [
                1000
            ],
            duration: 1000
        })
    } else if (final[i]==' '){
        litLed.push({
            method: "brightness",
            args: [00],
            duration: 500
        })
    } else if (final[i]=='space'){
        litLed.push({
            method: "brightness",
            args: [00],
            duration: 1000
        })
    }
}

// console.log(litLed);

// Do we want the sequence to loop?
const loop = true;

// Execute a method in the demo sequence
function execute(step) {

// Grab everything we need for this step
const method = litLed[step].method;
const args = litLed[step].args;
const duration = litLed[step].duration || 3000;

// Make the actual call to the LED
Led.prototype[method].apply(led, args);

// Increment the step
step++;

// If we're at the end, start over (loop==true) or exit
if (step === litLed.length) {
    if (loop) {
    step = 0;
    } else {
    // We're done!
    process.exit(0);
    }
}

// Recursively call the next step after specified duration
board.wait(duration, () => {
    execute(step);
});
}

board.on("ready", () => {
    // Defaults to pin 11 (must be PWM)
    led = new Led(11);

    // Kick off the first step
    execute(0);
});