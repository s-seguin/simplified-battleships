import Player from '../src/classes/player';
import Ship from '../src/classes/ship';

describe('Assign player a name', () => {
  it('should have the name we assigned it', () => {
    expect(new Player('Bob').name).toBe('Bob');
  });
});

describe('Place ship on board', () => {
  it('should add valid ship to board horizontally', () => {
    let ship1 = new Ship('A1 C1');
    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    expect(JSON.stringify(player.board)).toBe(
      JSON.stringify([
        [0, 0, 0, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      ])
    );
  });
});

describe('Place ship on board', () => {
  it('should add valid ship to board vertically', () => {
    let ship1 = new Ship('J8 J10');
    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    expect(JSON.stringify(player.board)).toBe(
      JSON.stringify([
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
      ])
    );
  });
});

describe('Place 2 ships on board', () => {
  it('should add valid ship indexes to board', () => {
    let ship1 = new Ship('A1 C1');
    let ship2 = new Ship('A2 B2');

    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    player.placeShipOnBoard(ship2);
    expect(JSON.stringify(player.board)).toBe(
      JSON.stringify([
        [0, 0, 0, -1, -1, -1, -1, -1, -1, -1],
        [1, 1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      ])
    );
  });
});

describe('Place ship on board', () => {
  it('should throw an error if the cell is not empty', () => {
    expect(() => {
      let ship1 = new Ship('A2 C2');
      let ship2 = new Ship('B1 B2');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
      player.placeShipOnBoard(ship2);
    }).toThrowError(
      new Error('Cannot place ship there. That space is occupied.')
    );
  });
});

describe('Place ship on board', () => {
  it('should throw an error if we try and create another ship of the same size and place it on the board', () => {
    expect(() => {
      let ship1 = new Ship('A1 C1');
      let ship2 = new Ship('A2 C2');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
      player.placeShipOnBoard(ship2);
    }).toThrowError(
      new Error(
        'Your ships cannot be the same size. One must be length 2, the other length 3'
      )
    );
  });
});

describe('Place ship on board', () => {
  it('should throw an error if we try and create too small of ship', () => {
    expect(() => {
      let ship1 = new Ship('A1 A1');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
    }).toThrowError(new Error('Ship must have a length of 2 or 3'));
  });
});

describe('Place ship on board', () => {
  it('should throw an error if we try and create too big of ship', () => {
    expect(() => {
      let ship1 = new Ship('A1 F1');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
    }).toThrowError(new Error('Ship must have a length of 2 or 3'));
  });
});

describe('Place ship on board', () => {
  it('should throw an error if we try and place ship outside of board (min range row)', () => {
    expect(() => {
      let ship1 = new Ship('A0 C0');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
    }).toThrowError(new Error('Ship must be placed on the board'));
  });
});

describe('Place ship on board', () => {
  it('should throw an error if we try and place ship outside of board (max range row)', () => {
    expect(() => {
      let ship1 = new Ship('A11 C11');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
    }).toThrowError(new Error('Ship must be placed on the board'));
  });
});

describe('Place ship on board', () => {
  it('should throw an error if we try and place ship outside of board (max range col)', () => {
    expect(() => {
      let ship1 = new Ship('K5 K7');
      let player = new Player('test');
      player.placeShipOnBoard(ship1);
    }).toThrowError(new Error('Ship must be placed on the board'));
  });
});

describe('Place shot on board', () => {
  it('should throw an error if we try and place shot outside of board (max range col)', () => {
    expect(() => {
      let player = new Player('test');
      player.placeShotOnBoard('K1');
    }).toThrowError(new Error('Shot must be placed on board.'));
  });
});

describe('Place shot on board', () => {
  it('should throw an error if we try and place shot outside of board (min range row)', () => {
    expect(() => {
      let player = new Player('test');
      player.placeShotOnBoard('A0');
    }).toThrowError(new Error('Shot must be placed on board.'));
  });
});

describe('Place shot on board', () => {
  it('should throw an error if we try and place shot outside of board (max range row)', () => {
    expect(() => {
      let player = new Player('test');
      player.placeShotOnBoard('A11');
    }).toThrowError(new Error('Shot must be placed on board.'));
  });
});

describe('Place shot on board', () => {
  it('should mark it as a miss', () => {
    let ship1 = new Ship('J8 J10');
    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    player.placeShotOnBoard('A1');

    expect(JSON.stringify(player.board)).toBe(
      JSON.stringify([
        ['X', -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
      ])
    );
  });
});

describe('Place shot on board', () => {
  it('should mark it as a hit', () => {
    let ship1 = new Ship('J8 J10');
    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    player.placeShotOnBoard('J8');

    expect(JSON.stringify(player.board)).toBe(
      JSON.stringify([
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 'H'],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
      ])
    );
  });
});

describe('Update alive status', () => {
  it('should mark player as dead after last ship is sunk', () => {
    let ship1 = new Ship('J8 J10');
    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    player.placeShotOnBoard('J8');
    player.placeShotOnBoard('J9');
    player.placeShotOnBoard('J10');

    expect(player.alive).toBe(false);
  });
});

describe('Update alive status', () => {
  it('should mark player as dead after last ship is sunk', () => {
    let ship1 = new Ship('J8 J10');
    let player = new Player('test');
    player.placeShipOnBoard(ship1);
    player.placeShotOnBoard('J8');
    player.placeShotOnBoard('J10');

    expect(player.alive).toBe(true);
  });
});
