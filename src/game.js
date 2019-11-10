import readline from 'readline';
import Player from './classes/player';

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
  promptUser(`${name}, enter the coordinates for your ship (format A2 A5): `); // TODO: add error checking

const startGame = async () => {
  console.log('Welcome to simplified Battleships!');

  let player1 = new Player(await askName('Player 1'));
  let player2 = new Player(await askName('Player 2'));

  console.log(await askForShipPlacement(player1.name));
  rl.close();
};

startGame();
