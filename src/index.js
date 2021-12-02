import gameLoop from './gameLoop';

// test that webpack works
console.log('webpack compiled to main.js');

const waitForPage = Promise.resolve('loaded');
waitForPage.then(() => {
  gameLoop.runGame();
});

console.log('end of main.js');
