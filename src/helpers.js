export const splitCellCoordinates = cellCoordinates => {
  let coordinates = {};
  coordinates.col = cellCoordinates.substring(0, 1);
  coordinates.row = cellCoordinates.substring(1);

  return coordinates;
};
