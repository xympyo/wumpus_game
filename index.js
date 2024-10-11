let arrUp = document.getElementById(" arrUp");
let arrLeft = document.getElementById("arrLeft");
let arrRight = document.getElementById("arrRight");
let arrDown = document.getElementById("arrDown");
let SpawnRandomX = Math.floor(Math.random() * 4) + 1;
let SpawnRandomY = Math.floor(Math.random() * 4) + 1;
let xCoordinate = SpawnRandomX;
let yCoordinate = SpawnRandomY;
document
  .getElementById("recty" + yCoordinate + "x" + xCoordinate)
  .classList.add("active");
function move(num) {
  const currentSquare = document.getElementById(
    "recty" + yCoordinate + "x" + xCoordinate
  );
  currentSquare.classList.remove("active");
  currentSquare.classList.add("passed");
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
