// prepare an html element to represent a 10x10 board
function getSymbol(cell) {
  // no shot yet, no ship
  if (!cell.hit && !cell.miss && !cell.ship) { return 'O'; }
  // missed shot
  if (cell.miss) { return '.'; }
  // hit and sunk
  if (cell.hit && cell.ship.isSunk()) { return 'X'; }
  // only a hit
  if (cell.hit) { return 'x'; }
  // a ship
  return 'T';
}

function createBoardElem(board) {
  const parent = document.createElement('div');
  const table = document.createElement('table');
  parent.appendChild(table);
  const width = board.getWidth();
  const height = board.getHeight();

  for (let row = 0; row < height; row += 1) {
    const tRow = document.createElement('tr');
    table.appendChild(tRow);
    for (let col = 0; col < width; col += 1) {
      const tDiv = document.createElement('td');
      tRow.appendChild(tDiv);
      tDiv.innerText = getSymbol(board.getTile(row, col));
      // add event listener to cell for inputs
    }
  }
  return parent;
}

function drawBoard(container, board) {
  console.log('drawing borad');
  const boardElem = createBoardElem(board);
  if (container.firstChild) { container.replaceChild(boardElem, container.firstChild); } else { container.appendChild(boardElem); }
}

export default { createBoardElem, drawBoard };
