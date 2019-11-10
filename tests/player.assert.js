import Player from '../src/classes/player';

describe('Assign player a name', () => {
  it('should have the name we assigned it', () => {
    expect(new Player('Bob').name).toBe('Bob');
  });
});
