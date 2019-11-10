import Ship from '../src/classes/ship';

describe('Assign ship a start cell', () => {
  it('should split the coordinates we provide it', () => {
    expect(new Ship('A1 A4').startCell).toBe('A1');
  });
});

describe('Assign ship an end cell', () => {
  it('should split the coordinates we provide it', () => {
    expect(new Ship('A1 A4').endCell).toBe('A4');
  });
});

describe('Calculate valid ship health', () => {
  it('should calculate a valid ship health of 3', () => {
    expect(new Ship('A1 A3').health).toBe(3);
  });
});

describe('Calculate valid ship health', () => {
  it('should calculate a valid ship health of 2', () => {
    expect(new Ship('A1 B1').health).toBe(2);
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
