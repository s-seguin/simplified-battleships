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
      resolve(response.toUpperCase());
    });
  });
};

/**
 * Get the name of the player
 * @param {*} player the player we are prompting, i.e. Player 1
 */
const askName = player => promptUser(`${player}, enter your name: `); // TODO: add error checking

const askForShipPlacement = (name, shipDescriber) =>
  promptUser(
    `${name}, enter the coordinates for your ${shipDescriber} ship (format A2 A4): `
  ); // TODO: add error checking

const askForShot = name =>
  promptUser(`${name} enter a location for you shot (format B7): `);

const startGame = async () => {
  console.log('\nWelcome to simplified Battleships!\n\n');

  let player1 = new Player(await askName('Player 1'));
  let player2 = new Player(await askName('Player 2'));
  console.log('\n');
  console.log(
    'Players prepare to place your ships. Use the format A2 A4, see board below as reference.'
  );
  console.log('Empty board:');
  player1.printBoard();
  console.log('\n');

  try {
    player1.placeShipOnBoard(
      new Ship(await askForShipPlacement(player1.name, 'first'))
    );
    player1.placeShipOnBoard(
      new Ship(await askForShipPlacement(player1.name, 'second'))
    );
    console.log(`${player1.name}'s ships:`);
    player1.printBoard();
    console.log('\n');

    player2.placeShipOnBoard(
      new Ship(await askForShipPlacement(player2.name, 'first'))
    );
    player2.placeShipOnBoard(
      new Ship(await askForShipPlacement(player2.name, 'second'))
    );
    console.log(`${player2.name}'s ships:`);
    player2.printBoard();
  } catch (e) {
    console.log(e.message);
  }

  let p1Turn = true;

  while (player1.alive && player2.alive) {
    if (p1Turn) {
      player2.placeShotOnBoard(await askForShot(player1.name));
      if (!player2.alive) {
        console.log(`\n\n${player2.name} has died. ${player1.name} wins`);
        break;
      }
      console.log(`${player1.name} your shots so far:`);
      player2.printBoardHideShips();
      console.log('\n');
    } else {
      player1.placeShotOnBoard(await askForShot(player2.name));
      if (!player1.alive) {
        console.log(`\n${player1.name} has died. ${player2.name} wins`);
        break;
      }
      console.log(`${player2.name} your shots so far:`);
      player1.printBoardHideShips();
      console.log('\n');
    }

    //switch turn
    p1Turn = !p1Turn;
  }
  console.log(`\n${player1.name}'s board:`);
  player1.printBoard();
  console.log('\n');
  console.log(`\n${player2.name}'s board:`);
  player2.printBoard();
  rl.close();
};

startGame();
