import { COLUMN_MAPPING } from '../constants';
import { splitCellCoordinates } from '../helpers';
/**
 * Calculate the health of the ship, aka the length of the ship from its start and end coordinates.
 * @param {String} start the start coordinate of the ship
 * @param {String} end the end coordinate of the ship
 */
const calcLengthFromCoordinates = (start, end) => {
  const startCoordinates = splitCellCoordinates(start);
  const endCoordinates = splitCellCoordinates(end);

  // return the length of the ship (the health)
  if (startCoordinates.col === endCoordinates.col)
    return Math.abs(startCoordinates.row - endCoordinates.row) + 1;
  else if (startCoordinates.row === endCoordinates.row)
    return (
      Math.abs(
        COLUMN_MAPPING[startCoordinates.col] -
          COLUMN_MAPPING[endCoordinates.col]
      ) + 1
    );
  else
    throw new Error('The ship has not been placed horizontally or vertically');
};

const swapStartAndEndCells = (start, end) => {
  let c = start;
  start = end;
  end = c;

  return [start, end];
};

/**
 * Make sure the small well is the start cell and the bigger cell if the end cell
 * @param {*} start
 * @param {*} end
 */
const arrangeCellCoordinates = (start, end) => {
  const startCoordinates = splitCellCoordinates(start);
  const endCoordinates = splitCellCoordinates(end);

  if (startCoordinates.row === endCoordinates.row) {
    if (startCoordinates.col > endCoordinates.col)
      return swapStartAndEndCells(start, end);
  } else if (startCoordinates.col === endCoordinates.col) {
    if (Number(startCoordinates.row) > Number(endCoordinates.row))
      return swapStartAndEndCells(start, end);
  }
  return [start, end];
};

class Ship {
  constructor(coordinates) {
    let splitCoordinates = coordinates.split(' ');

    // make sure start cell < end cell
    let arrangedCoords = arrangeCellCoordinates(
      splitCoordinates[0],
      splitCoordinates[1]
    );

    this.startCell = arrangedCoords[0];
    this.endCell = arrangedCoords[1];
    this.length = calcLengthFromCoordinates(this.startCell, this.endCell);
    this.damage = 0;
  }

  takeDamage() {
    this.damage++;
  }

  stillAlive() {
    if (this.damage >= this.length) return false;
    else return true;
  }
}

export default Ship;
