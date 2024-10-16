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
// declare points
let points = 0;
// wumpus coordinate declaration
let wumpusY;
let wumpusX;
// pit coordinate declaration
let pitY;
let pitX;
// gold coordinate declaration
let goldY;
let goldX;

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

// function create gold
function createGold() {
  let isDuplicate;
  do {
    goldX = Math.floor(Math.random() * 4) + 1;
    goldY = Math.floor(Math.random() * 4) + 1;
    isDuplicate = prevPitY.some((y, i) => y == goldY && prevPitX[i] == goldX);
  } while (
    (goldY == wumpusY && goldX == wumpusX) ||
    (goldY == yCoordinate && goldX == xCoordinate) ||
    isDuplicate
  );
  document.getElementById("recty" + goldY + "x" + goldX).classList.add("gold");
}

// creating pits
function startCreatePit() {
  for (let i = 0; i < 2; i++) {
    createPit();
  }
}
// function start the game
function startGame() {
  createAgent();
  createWumpus();
  startCreatePit();
  createGold();
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
function isAdjacentToPit(newX, newY) {
  for (let i = 0; i < prevPitX.length; i++) {
    if (
      (newX === prevPitX[i] &&
        (newY === prevPitY[i] - 1 || newY === prevPitY[i] + 1)) ||
      (newY === prevPitY[i] &&
        (newX === prevPitX[i] - 1 || newX === prevPitX[i] + 1))
    ) {
      return true;
    }
  }
  return false;
}

// is pitAdjacent declaration
let isPitAdjacent = [];
// text declaration
let stench = document.getElementById("text_stench");
let breeze = document.getElementById("text_breeze");
// to check all
function pitChecker(newX, newY) {
  if (isAdjacentToPit(newX, newY)) {
    breeze.style.opacity = 1;
  } else {
    breeze.style.opacity = 0;
  }
}

// function to check
function checker(newX, newY) {
  if (isAdjacentToWumpus(newX, newY)) {
    stench.style.opacity = 1;
  } else {
    stench.style.opacity = 0;
  }
}

// check if the user went into pit
function checkWumpus(newX, newY) {
  if (newX === wumpusX && newY === wumpusY) {
    console.log("You have died to Wumpus!");
  }
}
// check if the user went into pit
function checkPit(newX, newY) {
  for (let i = 0; i < 2; i++) {
    if (newX === prevPitX[i] && newY === prevPitY[i]) {
      console.log("You have died to Pit!");
    }
  }
}

let i = 0;
function checkGold(newX, newY) {
  if (newX === goldX && newY === goldY && i == 0) {
    points += 1000;
    let textPoints = (document.getElementById("points_text").innerHTML =
      points);
    console.log("You have obtained Gold!");
    i = 1;
  }
}

// direction variable declaration
let facingX;
let facingY;
// function checking direction
function checkDirection(newX, newY) {
  console.log("Your direction is now on X " + newX + " and Y " + newY);
}

// function to shoot
function shoot(targetX, targetY) {
  if (targetX === wumpusX && targetY === wumpusY) {
    console.log("You have shot the Wumpus!");
  } else {
    console.log("You have missed!");
  }
}

// check early game
pitChecker(xCoordinate, yCoordinate);
checker(xCoordinate, yCoordinate);

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
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingX = xCoordinate;
    facingY = yCoordinate - 1;
    checkDirection(facingX, facingY);
  } else if (num == 2 && xCoordinate > 1) {
    xCoordinate--;
    checker(xCoordinate, yCoordinate);
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingX = xCoordinate - 1;
    facingY = yCoordinate;
    checkDirection(facingX, facingY);
  } else if (num == 3 && xCoordinate < 4) {
    xCoordinate++;
    checker(xCoordinate, yCoordinate);
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingX = xCoordinate + 1;
    facingY = yCoordinate;
    checkDirection(facingX, facingY);
  } else if (num == 4 && yCoordinate < 4) {
    yCoordinate++;
    checker(xCoordinate, yCoordinate);
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingX = xCoordinate;
    facingY = yCoordinate + 1;
    checkDirection(facingX, facingY);
  }
  const newSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  if (newSquare.classList.contains("passed")) {
    newSquare.classList.remove("passed");
  }
  newSquare.classList.add("active");
}

function shootButton() {
  shoot(facingX, facingY);
}
