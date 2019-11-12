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
 * @param {String} prompt The prompt we want to give the user.
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
 * @param {Player} player the player we are prompting, i.e. Player 1
 */
const askName = player => promptUser(`${player}, enter your name: `);

/**
 * Get the user input for their ship placement
 * @param {String} name the name we address the player by
 * @param {String} shipDescriber the words we use to describe the ship
 */
const askForShipPlacement = (name, shipDescriber) =>
  promptUser(
    `${name}, enter the coordinates for your ${shipDescriber} ship (format A2 A4): `
  );

/**
 * Get the user input for their shot placement
 * @param {String} name the name we want to address the player with
 */
const askForShot = name =>
  promptUser(`${name} enter a location for you shot (format B7): `);

/**
 * Handle any errors from player input and let them retry indefinitely
 * @param {Player} player the player we are getting the input from
 * @param {String} shipDescriber a string to describe the ship
 */
const placeShip = async (player, shipDescriber) => {
  let placedShipWithNoErrors = false;

  while (!placedShipWithNoErrors) {
    try {
      player.placeShipOnBoard(
        new Ship(await askForShipPlacement(player.name, shipDescriber))
      );
      placedShipWithNoErrors = true;
    } catch (e) {
      console.log(`* Error: ${e.message}`);
      console.log(`* Try again:\n`);
    }
  }
};

/**
 * Handle any errors with invalid shots and let the user try again till they get it right
 * @param {Player} playerShooting the player whose turn it is
 * @param {Player} playerReceiving the player who just got shot at
 */
const placeShot = async (playerShooting, playerReceiving) => {
  let placedShotWithNoErrors = false;

  while (!placedShotWithNoErrors) {
    try {
      playerReceiving.placeShotOnBoard(await askForShot(playerShooting.name));
      placedShotWithNoErrors = true;
    } catch (e) {
      console.log(`* Error: ${e.message}`);
      console.log(`* Try again:\n`);
    }
  }
};

/**
 * Print out the shots the player whose turn it is has taken so far
 * @param {Player} playerShooting the player whose turn it is
 * @param {Player} playerReceiving the player who just got shot at
 */
const displayShotsSoFar = (playerShooting, playerReceiving) => {
  console.log(`\n${playerShooting.name} your shots so far:`);
  playerReceiving.printBoardHideShips();
  console.log('\n');
};

/**
 * Print each players boards with the shots their opponent took on them
 * @param {Player} player1
 * @param {Player} player2
 */
const printEndMessages = (player1, player2) => {
  console.log('FINAL BOARD STATES:');
  console.log(`\n${player1.name}'s board:`);
  player1.printBoard();
  console.log('\n');
  console.log(`\n${player2.name}'s board:`);
  player2.printBoard();
  console.log(
    '\n=====================================================\n=====================================================\n'
  );
  console.log('GAME OVER - scroll up to see winner and final board states');
  console.log(
    '\n=====================================================\n=====================================================\n'
  );
};

/**
 * Our main game loop
 */
const startGame = async () => {
  console.log(
    '\n==================================\nWelcome to simplified Battleships!\n=================================='
  );

  let player1 = new Player(await askName('Player 1'));
  let player2 = new Player(await askName('Player 2'));
  console.log('\n');
  console.log(
    'Players prepare to place your ships. One must be length 2, the other length 3. They can be placed horizontally or vertically, not diagonally. Use the format A2 A4, see board below as reference.'
  );
  console.log('\nEMPTY BOARD:');
  player1.printBoard();
  console.log('\n');

  // Get player 1 ships
  await placeShip(player1, 'first');
  await placeShip(player1, 'second');
  console.log(`\n${player1.name}'s ships:`);
  player1.printBoard();

  console.log(
    '\n#=====================================================#\n#=====================================================#\n'
  );

  // Get player 2 ships
  await placeShip(player2, 'first');
  await placeShip(player2, 'second');
  console.log(`${player2.name}'s ships:`);
  player2.printBoard();

  console.log(
    '\n#=====================================================#\n#=====================================================#\n'
  );
  console.log('Time to play Battleships! Try and sink the opponents ship!');
  console.log(
    '\n#=====================================================#\n#=====================================================#\n'
  );
  let p1Turn = true;

  while (player1.alive && player2.alive) {
    if (p1Turn) {
      await placeShot(player1, player2);
      if (!player2.alive) {
        console.log(
          '\n=====================================================\n=====================================================\n'
        );
        console.log(`${player2.name} has died. ${player1.name} wins`);
        console.log(
          '\n=====================================================\n=====================================================\n'
        );
        break;
      }
      displayShotsSoFar(player1, player2);
    } else {
      await placeShot(player2, player1);
      if (!player1.alive) {
        console.log(
          '\n=====================================================\n=====================================================\n'
        );
        console.log(`${player1.name} has died. ${player2.name} wins`);
        console.log(
          '\n=====================================================\n=====================================================\n'
        );
        break;
      }
      displayShotsSoFar(player2, player1);
    }

    // switch turn
    p1Turn = !p1Turn;
  }

  printEndMessages(player1, player2);

  rl.close();
};

startGame();
