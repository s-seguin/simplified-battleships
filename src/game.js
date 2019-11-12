import readline from 'readline';
import Player from './classes/player';
import Ship from './classes/ship';

// Set up readline to get console input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * A function to prompt user for input and return it, wrapped in a promise.
 * @param {*} prompt The prompt we want to give the user.
 */
const promptUser = prompt => {
  return new Promise(resolve => {
    rl.question(prompt, response => {
      resolve(response);
    });
  });
};

/**
 * Get the name of the player
 * @param {*} player the player we are prompting, i.e. Player 1
 */
const askName = player => promptUser(`${player}, enter your name: `); // TODO: add error checking

const askForShipPlacement = name =>
  promptUser(`${name}, enter the coordinates for your ship (format A2 A4): `); // TODO: add error checking

const startGame = async () => {
  console.log('Welcome to simplified Battleships!');

  let player1 = new Player(await askName('Player 1'));
  let player2 = new Player(await askName('Player 2'));

  let p1Ship1 = new Ship(await askForShipPlacement(player1.name));
  if (p1Ship1.length === 2 || p1Ship1.length === 3) {
    player1.placeShipOnBoard(p1Ship1);
    player1.printBoard();
    player1.placeShipOnBoard(new Ship(await askForShipPlacement(player1.name)));
    player1.printBoard();
  } else {
    console.log(
      `One of your ships can have a length of 2, the other can have a length of 3.`
    );
  }

  rl.close();
};

startGame();
