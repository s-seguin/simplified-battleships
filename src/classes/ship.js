import { COLUMN_MAPPING } from '../constants';
import { splitCellCoordinates } from '../helpers';
/**
 * Calculate the health of the ship, aka the length of the ship from its start and end coordinates.
 * @param {*} start the start coordinate of the ship
 * @param {*} end the end coordinate of the ship
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

class Ship {
  constructor(coordinates) {
    let splitCoordinates = coordinates.split(' ');

    // TODO: make the start cell the smaller cell and end cell the larger one
    this.startCell = splitCoordinates[0];
    this.endCell = splitCoordinates[1];
    this.length = calcLengthFromCoordinates(this.startCell, this.endCell);
    this.damage = 0;
  }
}

export default Ship;
