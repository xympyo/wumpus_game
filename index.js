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
// arrow declaration
let arrow;

// function create agent
function createAgent() {
  arrow = 1;
  let arrows = (document.getElementById("arrowText").innerHTML = arrow);
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
    let container = (document.getElementById(
      "announceContainer"
    ).style.display = "block");
    let text = (document.getElementById("announceText").innerHTML =
      "You have died to Wumpus!");
    points -= 1000;
  } else {
    let pointText = (document.getElementById("pointsText").innerHTML = points);
  }
}
// check if the user went into pit
function checkPit(newX, newY) {
  for (let i = 0; i < 2; i++) {
    if (newX === prevPitX[i] && newY === prevPitY[i]) {
      let container = (document.getElementById(
        "announceContainer"
      ).style.display = "block");
      let text = (document.getElementById("announceText").innerHTML =
        "You have died to Pit!");
      points -= 1000;
    } else {
      let pointText = (document.getElementById("pointsText").innerHTML =
        points);
    }
  }
}

let i = 0;
function checkGold(newX, newY) {
  if (newX === goldX && newY === goldY && i == 0) {
    points += 1000;
    let container = (document.getElementById(
      "announceContainer"
    ).style.display = "block");
    let text = (document.getElementById("announceText").innerHTML =
      "You have obtained Gold!");
    let pointText = (document.getElementById("pointsText").innerHTML = points);
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
  if (arrow != 0) {
    if (targetX === wumpusX && targetY === wumpusY) {
      let container = (document.getElementById(
        "announceContainer"
      ).style.display = "block");
      let text = (document.getElementById("announceText").innerHTML =
        "You have shot the Wumpus!");
    } else {
      console.log("You have missed!");
    }
  } else {
    let arrowInfo = (document.getElementById("arrowInfo").innerHTML =
      "You have no arrow left!");
  }
  let arrowInfo = (document.getElementById("arrowInfo").innerHTML =
    "You have ran out of arrow!");
  points -= 10;
  if (arrow == 1) {
    arrow -= 1;
  }
  let arrows = (document.getElementById("arrowText").innerHTML = arrow);
}

// check early game
pitChecker(xCoordinate, yCoordinate);
checker(xCoordinate, yCoordinate);

// declare move arrow
// moving function
let moveDirection;
function move(num) {
  // moving
  const currentSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  currentSquare.innerHTML = "";
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
    if (facingY == 0) {
    } else {
      facingY = yCoordinate - 1;
    }
    moveDirection = 1;
    points--;
    checkDirection(facingX, facingY);
  } else if (num == 2 && xCoordinate > 1) {
    xCoordinate--;
    checker(xCoordinate, yCoordinate);
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingY = yCoordinate;
    if (facingX == 0) {
    } else {
      facingX = xCoordinate - 1;
    }
    moveDirection = 2;
    points--;
    checkDirection(facingX, facingY);
  } else if (num == 3 && xCoordinate < 4) {
    xCoordinate++;
    checker(xCoordinate, yCoordinate);
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingY = yCoordinate;
    if (facingX == 5) {
    } else {
      facingX = xCoordinate + 1;
    }
    moveDirection = 3;
    points--;
    checkDirection(facingX, facingY);
  } else if (num == 4 && yCoordinate < 4) {
    yCoordinate++;
    checker(xCoordinate, yCoordinate);
    pitChecker(xCoordinate, yCoordinate);
    checkWumpus(xCoordinate, yCoordinate);
    checkPit(xCoordinate, yCoordinate);
    checkGold(xCoordinate, yCoordinate);
    facingX = xCoordinate;
    if (yCoordinate == 5) {
    } else {
      facingY = yCoordinate + 1;
    }
    moveDirection = 4;
    points--;
    checkDirection(facingX, facingY);
  }
  const newSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  if (newSquare.classList.contains("passed")) {
    newSquare.classList.remove("passed");
  } else {
    newSquare.classList.add("active");
  }
  if (moveDirection == 1) {
    newSquare.innerHTML = "↑";
  } else if (moveDirection == 2) {
    newSquare.innerHTML = "←";
  } else if (moveDirection == 3) {
    newSquare.innerHTML = "→";
  } else if (moveDirection == 4) {
    newSquare.innerHTML = "↓";
  }
}

function shootButton() {
  shoot(facingX, facingY);
}

function retry() {
  // agent coordinate declaration
  let SpawnRandomX = 0;
  let SpawnRandomY = 0;
  let xCoordinate = 0;
  let yCoordinate = 0;
  // wumpus coordinate declaration
  let wumpusY = 0;
  let wumpusX = 0;
  // pit coordinate declaration
  let pitY = 0;
  let pitX = 0;
  // gold coordinate declaration
  let goldY = 0;
  let goldX = 0;
  let squares = document.querySelectorAll(".square");

  squares.forEach((square) => {
    square.classList.remove("wumpus");
    square.classList.remove("pit");
    square.classList.remove("gold");
    square.classList.remove("passed");
    square.classList.remove("active");
    square.innerHTML = "";
  });

  prevPitX.length = 0;
  prevPitY.length = 0;

  let container = (document.getElementById("announceContainer").style.display =
    "none");
  let text = (document.getElementById("announceText").innerHTML = "");
  i = 0;
  startGame();
}

function aiStart() {}
