// declaration
let arrUp = document.getElementById(" arrUp");
let arrLeft = document.getElementById("arrLeft");
let arrRight = document.getElementById("arrRight");
let arrDown = document.getElementById("arrDown");
// agent coordinate declaration
let SpawnRandomX;
let SpawnRandomY;
let xCoordinate;
let yCoordinate;
// wumpus coordinate declaration
let wumpusY;
let wumpusX;
// pit coordinate declaration
let pitY;
let pitX;
// function create agent
function createAgent() {
  SpawnRandomX = Math.floor(Math.random() * 4) + 1;
  SpawnRandomY = Math.floor(Math.random() * 4) + 1;
  xCoordinate = SpawnRandomX;
  yCoordinate = SpawnRandomY;
  // spawning
  document
    .getElementById("recty" + yCoordinate + "x" + xCoordinate)
    .classList.add("active");
}
// function create wumpus
function createWumpus() {
  // do until not the same as agent coordinate
  do {
    wumpusY = Math.floor(Math.random() * 4) + 1;
    wumpusX = Math.floor(Math.random() * 4) + 1;
  } while (wumpusY == yCoordinate && wumpusX == xCoordinate);
  // spawning
  document
    .getElementById("recty" + wumpusY + "x" + wumpusX)
    .classList.add("wumpus");
}
let prevPitY = [];
let prevPitX = [];
// function create pit
function createPit() {
  let pitY, pitX;
  let isDuplicate;
  do {
    pitY = Math.floor(Math.random() * 4) + 1;
    pitX = Math.floor(Math.random() * 4) + 1;
    // check if the pit exists or not
    isDuplicate = prevPitY.some((y, i) => y == pitY && prevPitX[i] == pitX);
  } while (
    (pitY == wumpusY && pitX == wumpusX) ||
    (pitY == yCoordinate && pitX == xCoordinate) ||
    isDuplicate
  );
  // store new pit coordinate
  prevPitY.push(pitY);
  prevPitX.push(pitX);
  // spawn pit
  document.getElementById("recty" + pitY + "x" + pitX).classList.add("pit");
}
function startCreatePit() {
  for (let i = 0; i < 3; i++) {
    createPit();
  }
}
// function start the game
function startGame() {
  createAgent();
  createWumpus();
  startCreatePit();
}
// game start
startGame();
// function to see if adjacent to wumpus
function isAdjacentToWumpus(newX, newY) {
  return (
    (newX === wumpusX && (newY === wumpusY - 1 || newY === wumpusY + 1)) ||
    (newY === wumpusY && (newX === wumpusX - 1 || newX === wumpusX + 1)) 
  );
}
// function to see if adjacent to pit
// function isAdjacentToPit(newX,newY) {
//   return (
//     (newX === )
//   )
// }
checker(xCoordinate, yCoordinate);
// function to check
function checker(newX, newY) {
  if (isAdjacentToWumpus(newX, newY)) {
    console.log("You feel a breeze");
  }
}
// moving function
function move(num) {
  // moving
  const currentSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  currentSquare.classList.remove("active");
  currentSquare.classList.add("passed");
  // movement
  if (num == 1 && yCoordinate > 1) {
    yCoordinate--;
    checker(xCoordinate, yCoordinate);
  } else if (num == 2 && xCoordinate > 1) {
    xCoordinate--;
    checker(xCoordinate, yCoordinate);
  } else if (num == 3 && xCoordinate < 4) {
    xCoordinate++;
    checker(xCoordinate, yCoordinate);
  } else if (num == 4 && yCoordinate < 4) {
    yCoordinate++;
    checker(xCoordinate, yCoordinate);
  }
  const newSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  if (newSquare.classList.contains("passed")) {
    newSquare.classList.remove("passed");
  }
  newSquare.classList.add("active");
}
