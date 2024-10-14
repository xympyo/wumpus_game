// declaration
let arrUp = document.getElementById(" arrUp");
let arrLeft = document.getElementById("arrLeft");
let arrRight = document.getElementById("arrRight");
let arrDown = document.getElementById("arrDown");
// agent coordinate declaration
let wumpusY;
let wumpusX;
let xCoordinate;
let yCoordinate;
// wumpus coordinate declaration
let SpawnRandomX;
let SpawnRandomY;
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
let prevPitY = null;
let prevPitX = null;
// function create pit
function createPit() {
  let pitY, pitX;

  do {
    pitY = Math.floor(Math.random() * 4) + 1;
    pitX = Math.floor(Math.random() * 4) + 1;
  } while (
    (pitY == wumpusY && pitX == wumpusX) ||
    (pitY == yCoordinate && pitX == xCoordinate) ||
    (pitY == prevPitY && pitX == prevPitX)
  );

  // Update previous pit coordinates
  prevPitY = pitY;
  prevPitX = pitX;

  // Spawn the pit
  document.getElementById("recty" + pitY + "x" + pitX).classList.add("pit");
}

// function start game create pit
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
  } else if (num == 2 && xCoordinate > 1) {
    xCoordinate--;
  } else if (num == 3 && xCoordinate < 4) {
    xCoordinate++;
  } else if (num == 4 && yCoordinate < 4) {
    yCoordinate++;
  }
  const newSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  if (newSquare.classList.contains("passed")) {
    newSquare.classList.remove("passed");
  }
  newSquare.classList.add("active");
}
