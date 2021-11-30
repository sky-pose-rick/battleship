import gameboardFactory from './gameboard';

const playerFactory = () => {
  const board = gameboardFactory();

  const hitStack = [];
  let searchCount = 0;
  const searchOffsets = [[0, -1], [-1, 0], [0, 1], [1, 0]];

  const getBoard = () => board;

  const takeTurn = async function takeTurn(otherPlayer, targetFunc) {
    let validTarget = false;
    let row;
    let col;
    const otherBoard = otherPlayer.getBoard();
    while (!validTarget) {
      // eslint-disable-next-line no-await-in-loop
      [row, col] = await targetFunc();
      validTarget = otherBoard.isValidTarget(row, col);
    }

    const hit = otherBoard.receiveAttack(row, col);
    if (hit) {
      hitStack.push([row, col]);
      searchCount = 0;
    }
    // console.log('targeted', row, col);

    return Promise.resolve({ row, col, hit });
  };

  const randomTarget = () => {
    const row = Math.random(0, 10);
    const col = Math.random(0, 10);
    return Promise.resolve([row, col]);
  };

  const aiTarget = () => {
    if (searchCount === 4) {
      hitStack.pop();
      searchCount = 0;
    }
    if (hitStack.length === 0) {
      return Promise.resolve(randomTarget);
    }
    let row;
    let col;
    [row, col] = hitStack[hitStack.length - 1];
    const offset = searchOffsets[searchCount];
    row += offset[0];
    col += offset[1];
    searchCount += 1;
    return Promise.resolve([row, col]);
  };

  return {
    getBoard, takeTurn, randomTarget, aiTarget,
  };
};

export default playerFactory;
