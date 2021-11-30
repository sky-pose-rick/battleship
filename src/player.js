import gameboardFactory from './gameboard';

const playerFactory = () => {
  const board = gameboardFactory();

  const getBoard = () => board;

  async function takeTurn(targetFunc) {
    let validTarget = false;
    let row;
    let col;
    while (!validTarget) {
      // eslint-disable-next-line no-await-in-loop
      [row, col] = await targetFunc();
      validTarget = board.isValidTarget(row, col);
    }

    return Promise.resolve('good turn');
  }

  const randomTarget = () => {
    const row = Math.random(0, 10);
    const col = Math.random(0, 10);
    return Promise.resolve([row, col]);
  };

  return { getBoard, takeTurn, randomTarget };
};

export default playerFactory;
