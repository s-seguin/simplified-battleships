import Ship from './ship';
import { NUM_ROWS, NUM_COL, COLUMN_MAPPING } from '../constants';
import { splitCellCoordinates } from '../helpers';

/**
 * Fill the board with -1
 */
const instantiateBoard = () => {
  let board = new Array(NUM_ROWS);
  for (let i = 0; i < board.length; i++) {
    board[i] = Array(NUM_COL).fill(-1);
  }

  return board;
};

/**
 * Given a cell on the board return the value we want to display to the console
 * @param {*} cell
 */
const getCellRepresentation = cell => {
  if (cell === -1) return '-';
  else if (typeof cell === 'number' && cell !== -1) return 'S';
  else return cell;
};

class Player {
  constructor(name) {
    this.name = name;
    this.hasShipsRemaining = true;
    this.board = instantiateBoard();
    this.ships = [];
    this.alive = true;
  }

  /**
   * Checks if the given board cell is an empty space
   * @param {Number} row
   * @param {Number} col
   */
  boardCellIsEmpty(row, col) {
    if (this.board[row][col] === -1) return true;
    else return false;
  }

  /**
   * Checks if cell at the given row and column is a reference (index of the ship in the ship array) to a ship (numbers >= 0)
   * @param {Number} row
   * @param {Number} col
   */
  boardCellContainsShip(row, col) {
    if (
      typeof this.board[row][col] === 'number' &&
      Number(this.board[row][col]) >= 0
    )
      return true;
    else return false;
  }

  /**
   * This method places a reference to a ship on the board, so that we can keep track of which ship got hit.
   * @param {String} ship
   */
  placeShipOnBoard(ship) {
    // the only allowed ship size are 2 and 3
    if (ship.length < 2 || ship.length > 3)
      throw new Error('Ship must have a length of 2 or 3');

    // do we have other ships on our board?
    if (this.ships.length > 0) {
      this.ships.forEach(existingShip => {
        // we do, then make sure they aren't the same size
        if (existingShip.length === ship.length)
          throw new Error(
            'Your ships cannot be the same size. One must be length 2, the other length 3'
          );
      });
    }

    // get the coordinates for our ship's start and end position
    const startCoords = splitCellCoordinates(ship.startCell);
    const endCoords = splitCellCoordinates(ship.endCell);

    if (
      startCoords.row <= 0 || // row corresponds to the row entered by the player indexed at 1
      startCoords.row > this.board.length ||
      endCoords.row <= 0 || // row corresponds to the row entered by the player indexed at 1
      endCoords.row > this.board.length ||
      !COLUMN_MAPPING[endCoords.col]
    )
      throw new Error('Ship must be placed on the board');

    // check that the start and end cells are empty
    if (
      !(
        this.boardCellIsEmpty(
          startCoords.row - 1,
          COLUMN_MAPPING[startCoords.col] - 1
        ) &&
        this.boardCellIsEmpty(
          endCoords.row - 1,
          COLUMN_MAPPING[endCoords.col] - 1
        )
      )
    )
      throw new Error('Cannot place ship there. That space is occupied.');

    // add the ship to our array of ships
    this.ships.push(ship);
    const shipIndex = this.ships.length - 1;

    // the cells were empty so place the ship
    this.board[startCoords.row - 1][
      COLUMN_MAPPING[startCoords.col] - 1
    ] = shipIndex;
    this.board[endCoords.row - 1][
      COLUMN_MAPPING[endCoords.col] - 1
    ] = shipIndex;

    // if the ship has a middle cell
    if (ship.length > 2) {
      // if the ship is vertical
      if (startCoords.col === endCoords.col) {
        for (let i = startCoords.row; i < endCoords.row - 1; i++) {
          if (!this.boardCellIsEmpty(i, COLUMN_MAPPING[startCoords.col] - 1))
            throw new Error('Cannot place ship there. That space is occupied.');
          // otherwise place the ship there
          else this.board[i][COLUMN_MAPPING[startCoords.col] - 1] = shipIndex;
        }
      }
      // if the ship is horizontal
      else if (startCoords.row == endCoords.row) {
        for (
          let i = COLUMN_MAPPING[startCoords.col];
          i < COLUMN_MAPPING[endCoords.col] - 1;
          i++
        ) {
          if (!this.boardCellIsEmpty(startCoords.row - 1, i))
            throw new Error('Cannot place ship there. That space is occupied.');
          // otherwise place the ship there
          else this.board[startCoords.row - 1][i] = shipIndex;
        }
      }
    }
  }

  /**
   * This method places a shot from the opponent on the player's board. It checks whether it hit a ship and responds accordingly.
   * @param {String} shot
   */
  placeShotOnBoard(shot) {
    const shotCoords = splitCellCoordinates(shot);
    if (
      shotCoords.row <= 0 || // row corresponds to the row entered by the player indexed at 1
      shotCoords.row > this.board.length ||
      !COLUMN_MAPPING[shotCoords.col]
    )
      throw new Error('Shot must be placed on board.');

    if (
      this.boardCellContainsShip(
        shotCoords.row - 1,
        COLUMN_MAPPING[shotCoords.col] - 1
      )
    ) {
      console.log('HIT!');
      const shipIndex = this.board[shotCoords.row - 1][
        COLUMN_MAPPING[shotCoords.col] - 1
      ];

      this.ships[shipIndex].takeDamage();
      if (!this.ships[shipIndex].stillAlive()) console.log('SHIP SUNK!');

      // check if all our ships have sunken
      this.alive = this.ships
        .map(s => s.stillAlive())
        .reduce((prev, cur) => prev || cur);

      this.board[shotCoords.row - 1][COLUMN_MAPPING[shotCoords.col] - 1] = 'H';
    } else if (
      this.boardCellIsEmpty(
        shotCoords.row - 1,
        COLUMN_MAPPING[shotCoords.col] - 1
      )
    ) {
      console.log('MISS!');
      this.board[shotCoords.row - 1][COLUMN_MAPPING[shotCoords.col] - 1] = 'X';
    } else {
      console.log('What are you doing? You already shot there...');
    }
  }

  /**
   * This method is used to print the board in its entirety
   */
  printBoard() {
    console.log('   A B C D E F G H I J');
    for (let i = 0; i < this.board.length; i++) {
      let rowStr = i + 1 < 10 ? `${i + 1}  ` : `${i + 1} `;
      for (let j = 0; j < this.board[i].length; j++) {
        rowStr += `${getCellRepresentation(this.board[i][j])} `;
      }
      console.log(rowStr);
    }
  }

  /**
   * This method prints the players board but hides the ships positions.
   * This is used to show the other player where they have shot, hit and missed.
   */
  printBoardHideShips() {
    console.log('   A B C D E F G H I J');
    for (let i = 0; i < this.board.length; i++) {
      let rowStr = i + 1 < 10 ? `${i + 1}  ` : `${i + 1} `;
      for (let j = 0; j < this.board[i].length; j++) {
        let cell = getCellRepresentation(this.board[i][j]);
        rowStr += `${cell === 'S' ? '-' : cell} `;
      }
      console.log(rowStr);
    }
  }
}

export default Player;
