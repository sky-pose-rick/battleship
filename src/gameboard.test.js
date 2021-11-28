import gameboardFactory from './gameboard';

let board;

describe('start with an empty board', () => {
  beforeEach(() => {
    board = gameboardFactory();
  });

  it('create a gameboard', () => {
    expect(board.getTile(0, 0)).toEqual({});
  });

  it('place a ship hozizontally', () => {
    const shipDesc = {
      length: 4,
      row: 2,
      col: 3,
      isVertical: false,
    };

    board.placeShip(shipDesc);
    expect(board.getTile(2, 3).ship).toBeTruthy();
    expect(board.getTile(2, 6).ship).toBeTruthy();
  });

  it('place a ship vertically', () => {
    const shipDesc = {
      length: 2,
      row: 3,
      col: 4,
      isVertical: true,
    };

    board.placeShip(shipDesc);
    expect(board.getTile(3, 4).ship).toBeTruthy();
    expect(board.getTile(4, 4).ship).toBeTruthy();
  });
});

describe('put two ships on the board', () => {
  beforeEach(() => {
    board = gameboardFactory();
    board.placeShip({
      length: 4,
      row: 2,
      col: 3,
      isVertical: false,
    });
    board.placeShip({
      length: 2,
      row: 8,
      col: 7,
      isVertical: true,
    });
  });

  it('declare an attack that hits a ship', () => {
    const result = board.receiveAttack(2, 4);
    expect(result).toBe(true);
    const hitPos = board.getTile(2, 4);
    const notHitPos = board.getTile(1, 1);
    expect(hitPos.hit).toBeTruthy();
    expect(notHitPos.hit).toBeFalsy();
  });

  it('declare an attack that misses', () => {
    const result = board.receiveAttack(5, 5);
    expect(result).toBe(false);
    const missPos = board.getTile(5, 5);
    const notMissPos = board.getTile(5, 6);
    expect(missPos.miss).toBeTruthy();
    expect(notMissPos.miss).toBeFalsy();
  });

  it('sink all ships', () => {
    // sink small ship first
    board.receiveAttack(8, 7);
    board.receiveAttack(9, 7);
    expect(board.isAllSunk()).toBe(false);
    // sink other ship
    board.receiveAttack(2, 3);
    board.receiveAttack(2, 4);
    board.receiveAttack(2, 5);
    board.receiveAttack(2, 6);
    expect(board.isAllSunk()).toBe(true);
  });
});
