import Ship from './ship';
import { NUM_ROWS, NUM_COL, COLUMN_MAPPING } from '../constants';
import { splitCellCoordinates } from '../helpers';

const instantiateBoard = () => {
  let board = new Array(NUM_ROWS);

  for (let i = 0; i < board.length; i++) board[i] = new Array(NUM_COL);

  return board;
};

const getCellRepresentation = cell =>
  ({
    null: '-',
    undefined: '-',
    X: 'X',
    S: 'S',
  }[cell] || '-');

class Player {
  constructor(name) {
    this.name = name;
    this.hasShipsRemaining = true;
    this.board = instantiateBoard();
    this.ships = [];
  }

  boardCellIsEmpty(row, col) {
    if (this.board[row][col]) return false;
    else return true;
  }

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
      startCoords.row >= this.board.length ||
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

    // the cells were empty so place the ship
    this.board[startCoords.row - 1][COLUMN_MAPPING[startCoords.col] - 1] = 'S';
    this.board[endCoords.row - 1][COLUMN_MAPPING[endCoords.col] - 1] = 'S';

    // if the ship has a middle cell
    if (ship.length > 2) {
      // if the ship is vertical
      if (startCoords.col === endCoords.col) {
        for (let i = startCoords.row; i < endCoords.row - 1; i++) {
          if (!this.boardCellIsEmpty(i, COLUMN_MAPPING[startCoords.col] - 1))
            throw new Error('Cannot place ship there. That space is occupied.');
          // otherwise place the ship there
          else this.board[i][COLUMN_MAPPING[startCoords.col] - 1] = 'S';
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
          else this.board[startCoords.row - 1][i] = 'S';
        }
      }
    }

    // add the ship to our array of ships
    this.ships.push(ship);
  }

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
}

export default Player;
