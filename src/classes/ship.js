import { COLUMN_MAPPING } from '../constants';

/**
 * Calculate the health of the ship, aka the length of the ship from its start and end coordinates.
 * @param {*} start the start coordinate of the ship
 * @param {*} end the end coordinate of the ship
 */
const calcHealthFromCoordinates = (start, end) => {
  const startCol = start.substring(0, 1);
  const startRow = start.substring(1);

  const endCol = end.substring(0, 1);
  const endRow = end.substring(1);

  // return the length of the ship (the health)
  if (startCol === endCol) return Math.abs(startRow - endRow) + 1;
  else if (startRow === endRow)
    return Math.abs(COLUMN_MAPPING[startCol] - COLUMN_MAPPING[endCol]) + 1;
  else
    throw new Error('The ship has not been placed horizontally or vertically');
};

class Ship {
  constructor(coordinates) {
    let splitCoordinates = coordinates.split(' ');

    this.startCell = splitCoordinates[0];
    this.endCell = splitCoordinates[1];
    this.health = calcHealthFromCoordinates(this.startCell, this.endCell);
    this.damage = 0;
  }
}

export default Ship;
