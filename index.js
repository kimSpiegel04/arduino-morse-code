const five = require('johnny-five');
// const board = new five.Board();
const morse = require('morse');
const word = process.argv.slice(2);

var encoded = morse.encode(word);
console.log(encoded);

// board.on('ready', ()=>{

// });

