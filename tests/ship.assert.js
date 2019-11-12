import Ship from '../src/classes/ship';

describe('Assign ship coordinates', () => {
  it('should split the a start cell coordinates we provide it', () => {
    expect(new Ship('A1 A4').startCell).toBe('A1');
  });
});

describe('Assign ship coordinates', () => {
  it('should split the end cell coordinates we provide it', () => {
    expect(new Ship('A1 A4').endCell).toBe('A4');
  });
});

describe('Calculate valid ship health', () => {
  it('should calculate a valid ship health of 3', () => {
    expect(new Ship('A1 A3').length).toBe(3);
  });
});

describe('Calculate valid ship health', () => {
  it('should calculate a valid ship health of 2', () => {
    expect(new Ship('A1 B1').length).toBe(2);
  });
});

describe('Calculate invalid ship health', () => {
  it('should throw an error', () => {
    expect(() => {
      new Ship('A1 B3');
    }).toThrowError(
      new Error('The ship has not been placed horizontally or vertically')
    );
  });
});

describe('Swap coordinates', () => {
  it('should return the same coordinates', () => {
    let s1 = new Ship('J8 J10');

    expect(s1.startCell).toBe('J8');
  });
});

describe('Swap coordinates', () => {
  it('should return swapped coordinates', () => {
    let s1 = new Ship('J10 J8');

    expect(s1.startCell).toBe('J8');
  });
});

describe('Swap coordinates', () => {
  it('should return swapped coordinates', () => {
    let s1 = new Ship('C1 A1');

    expect(s1.startCell).toBe('A1');
  });
});

describe('Swap coordinates', () => {
  it('should return swapped coordinates', () => {
    let s1 = new Ship('C5 C3');

    expect(s1.startCell).toBe('C3');
  });
});

describe('Take damage', () => {
  it('should increment damage counter', () => {
    let s1 = new Ship('C5 C3');
    s1.takeDamage();

    expect(s1.damage).toBe(1);
  });
});

describe('Health status', () => {
  it('should show alive', () => {
    let s1 = new Ship('C5 C3');
    s1.takeDamage();

    expect(s1.stillAlive()).toBe(true);
  });
});

describe('Health status', () => {
  it('should show dead', () => {
    let s1 = new Ship('C5 C3');
    s1.takeDamage();
    s1.takeDamage();
    s1.takeDamage();

    expect(s1.stillAlive()).toBe(false);
  });
});
