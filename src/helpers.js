/**
 * This function splits coordinates in the form of user input e.g. A5 into their respective row and column. E.g. { row: 5, col: 'A' }
 * @param {String} cellCoordinates coordinates for a cell on the board in the form A5
 */
export const splitCellCoordinates = cellCoordinates => {
  let coordinates = {};
  coordinates.col = cellCoordinates.substring(0, 1);
  coordinates.row = cellCoordinates.substring(1);

  return coordinates;
};
