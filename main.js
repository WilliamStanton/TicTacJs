import Game from './game.js';

// load player names
const playerOneName = document.getElementById('player1'); // p1 name
const playerTwoName = document.getElementById('player2'); // p2 name

// instantiate game
let game = new Game(playerOneName.value, playerTwoName.value);

// restart game functionality
document.getElementById('restart').addEventListener('click', () => {game = new Game(playerOneName.value, playerTwoName.value)});

// open settings
document.getElementById('settings').addEventListener('click', () => {document.getElementById('settingsDialog').showModal()});

// close settings
document.getElementById('close').addEventListener('click', () => {
    document.getElementById('settingsDialog').close();

    // implicitly update player names
    game.playerOne.name = playerOneName.value;
    game.playerTwo.name = playerTwoName.value;
});