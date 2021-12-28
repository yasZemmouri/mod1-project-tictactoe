"use strict";

//throw error???
//=================Reference Elements=============================
//Cases Elements
const caseEl = Array.from(
  document.querySelectorAll(`#container1
 .case`)
);
const pEl = document.getElementsByTagName("p");
const gameOverEl = document.getElementById("gameOver");
const resetEl = document.getElementById("reset");
const dlFirstEl = document.querySelector("dl:first-child");
const dlLastEl = document.querySelector("dl:last-child");
const xScoreEl = document.getElementById("x-score");
const oScoreEl = document.getElementById("o-score");
const fLineEl = document.getElementById("fLine");
const lLineEl = document.getElementById("lLine");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//========================= Global Variables ============================
let turn = 1;
const boardSituation = new Array(9).fill(0);
//number of empty cases. used by checkFullBoard()
let casesLeft = 9;
let xScore = 0,
  oScore = 0;
// const casesLeftIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
//========================== Function Declarations =======================//
const reset = function () {
  for (let i = 0; i < 9; i++) {
    //Reset UI board
    caseEl[i].querySelector("div").removeAttribute("class");
    //Reset board Array
    boardSituation[i] = 0;
    //reset reset
    resetEl.style.display = "none";
    //reset p
    pEl[0].style.top = "-80px";
    //reset cases left
    casesLeft = 9;
  }

  //reset gameOver screen
  //use reverse effect on game over too
  gameOverEl.classList.remove("gameOver-screen");
  fLineEl.removeAttribute("class");
  lLineEl.textContent = "";

  console.log("game reseted");
};

const updateBoard = function (player, caseIndex) {
  boardSituation[caseIndex] = player;
  console.log("board updated");
  //tester
  let myvar = "";
  for (let i = 0; i < 9; i++) {
    myvar = myvar + " " + boardSituation[i];
  }
  console.log("boardSituation: " + myvar);
};

const checkWin = function (winner) {
  // let winner = 3 - turn; //since turns are inversed before making the call. we inverse them back
  if (
    (boardSituation[0] === winner &&
      boardSituation[1] === winner &&
      boardSituation[2] === winner) ||
    (boardSituation[0] === winner &&
      boardSituation[3] === winner &&
      boardSituation[6] === winner) ||
    (boardSituation[0] === winner &&
      boardSituation[4] === winner &&
      boardSituation[8] === winner) ||
    (boardSituation[1] === winner &&
      boardSituation[4] === winner &&
      boardSituation[7] === winner) ||
    (boardSituation[2] === winner &&
      boardSituation[5] === winner &&
      boardSituation[8] === winner) ||
    (boardSituation[2] === winner &&
      boardSituation[4] === winner &&
      boardSituation[6] === winner) ||
    (boardSituation[3] === winner &&
      boardSituation[4] === winner &&
      boardSituation[5] === winner) ||
    (boardSituation[6] === winner &&
      boardSituation[7] === winner &&
      boardSituation[8] === winner)
  ) {
    console.log("checkWinner stopped the game");
    if (winner === 1) {
      //maybe I should have one gameOver and call it once.
      console.log("You Win");
      xScoreEl.textContent = ++xScore;
      console.log("checkWinner called gameOver");
      gameOver(winner);
      return true;
    } else if (winner === 2) {
      console.log("You Lose");
      oScoreEl.textContent = ++oScore;
      console.log("checkWinner called gameOver");
      gameOver(winner);
      return true;
    }
  } else {
    console.log("No Winner");
    return false;
  }
};
//decrement cases left
//if no more cases left call game over.
const checkFullBoard = function () {
  console.log("checkFullBoard was called");
  casesLeft--;
  console.log("cases left: " + casesLeft); //test
  if (casesLeft === 0) {
    console.log("checkFullBoard stopped the game");
    console.log("No more moves");
    console.log("checkFullBoard called gameOver");
    gameOver(casesLeft);
  }
};
const gameOver = function (winner) {
  console.log("game over says hi");
  if (winner === 1) {
    // pEl[0].querySelector("div").classList.add("x");
    console.log("fLineEl: " + fLineEl);
    fLineEl.classList.add("x");
    lLineEl.textContent = "You win";
  } else if (winner === 2) {
    // pEl[0].querySelector("div").classList.add("o");
    // pEl[1].textContent = "You lose";
    // gameOverEl.classList.add("stroke-txt");
    fLineEl.classList.add("o");
    lLineEl.textContent = "You lose";
  } else if (winner === 0) {
    // how to change style for multiple elements at once???
    //1st paragraph
    // pEl[0].textContent = "X";
    // let half0 = document.createElement("SPAN");
    // half0.textContent = "O";
    // half0.classList.add("stroke-txt");
    // pEl[0].prepend(half0);
    //second paragraph
    // pEl[1].textContent = "Dr"; //give o and x different colors
    // let half1 = document.createElement("SPAN");
    // half1.textContent = "aw";
    // half1.classList.add("stroke-txt");
    // pEl[1].appendChild(half1);
    fLineEl.classList.add("o");
    fLineEl.classList.add("x");
    lLineEl.textContent = "Draw";
  }
  console.log("turn at gameOve: " + turn);
  turn = 0; //game stopped
  // document.getElementById("gameOver").style.display = "flex";
  gameOverEl.classList.add("gameOver-screen");
  resetEl.style.display = "block";
  // pEl[0].style.visibility = "visible";
  pEl[0].style.top = "0";
};
const player1move = function () {
  //   this.textContent = "X";
  if (turn === 1 && !this.querySelector("div").hasAttribute("class")) {
    const player = 1;
    let clickedEl = this;
    //draw move
    clickedEl.querySelector("div").classList.add("x");
    turn = 0;
    let caseIndex = parseInt(clickedEl.id[1]);
    //update board
    updateBoard(player, caseIndex);
    //check if Win
    checkWin(player) || checkFullBoard();

    //can we make update board do the parseInt part???
    setTimeout(function () {
      //use classes and a function with toggle. the 1st move border is not with this function.
      dlLastEl.style.borderLeftColor = "orangered";
      dlFirstEl.style.borderLeftColor = "transparent";

      turn = 2;
    }, 350);
  }
};
const player2move = function () {
  //   this.textContent = "X";
  if (turn === 2 && !this.querySelector("div").hasAttribute("class")) {
    const player = 2;
    let clickedEl = this;
    //draw move
    clickedEl.querySelector("div").classList.add("o");
    turn = 0;
    let caseIndex = parseInt(clickedEl.id[1]);
    //update board
    updateBoard(player, caseIndex);
    //check if Win
    checkWin(player) || checkFullBoard();

    //can we make update board do the parseInt part???
    setTimeout(function () {
      //use classes and a function with toggle. the 1st move border is not with this function.
      dlLastEl.style.borderLeftColor = "transparent";
      dlFirstEl.style.borderLeftColor = "blue";

      turn = 1;
    }, 350);
  }
};

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//==========================Event Listners=============================
//Click on cases Listners

caseEl[0].addEventListener("click", player1move);
caseEl[1].addEventListener("click", player1move);
caseEl[2].addEventListener("click", player1move);
caseEl[3].addEventListener("click", player1move);
caseEl[4].addEventListener("click", player1move);
caseEl[5].addEventListener("click", player1move);
caseEl[6].addEventListener("click", player1move);
caseEl[7].addEventListener("click", player1move);
caseEl[8].addEventListener("click", player1move);
//------------- Player 2 listerns --------------------
caseEl[0].addEventListener("click", player2move);
caseEl[1].addEventListener("click", player2move);
caseEl[2].addEventListener("click", player2move);
caseEl[3].addEventListener("click", player2move);
caseEl[4].addEventListener("click", player2move);
caseEl[5].addEventListener("click", player2move);
caseEl[6].addEventListener("click", player2move);
caseEl[7].addEventListener("click", player2move);
caseEl[8].addEventListener("click", player2move);
resetEl.addEventListener("click", reset);

// why the function handling the event doens't have parenthecsis
// how can we pass parameters to it??
// //ways to declare array
// //ways to declare functions

// //function player win.
// //function initial state.
// //function move.
// //use class as arrays better than using id.

//study this

//shortcut for the for loop
//different color for circle
//prevent player from playing before computer make move
//...Operator
//pass array to a funciton???
