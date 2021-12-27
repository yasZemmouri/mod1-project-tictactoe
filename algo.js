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
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//========================= Global Variables ============================
let turn = 1;
const boardSituation = new Array(9).fill(0);
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
    // console.log("remove");
  }
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

const checkWin = function (player) {
  // let winner = 3 - turn; //since turns are inversed before making the call. we inverse them back
  if (
    (boardSituation[0] === player &&
      boardSituation[1] === player &&
      boardSituation[2] === player) ||
    (boardSituation[0] === player &&
      boardSituation[3] === player &&
      boardSituation[6] === player) ||
    (boardSituation[0] === player &&
      boardSituation[4] === player &&
      boardSituation[8] === player) ||
    (boardSituation[1] === player &&
      boardSituation[4] === player &&
      boardSituation[7] === player) ||
    (boardSituation[2] === player &&
      boardSituation[5] === player &&
      boardSituation[8] === player) ||
    (boardSituation[2] === player &&
      boardSituation[4] === player &&
      boardSituation[6] === player) ||
    (boardSituation[3] === player &&
      boardSituation[4] === player &&
      boardSituation[5] === player) ||
    (boardSituation[6] === player &&
      boardSituation[7] === player &&
      boardSituation[8] === player)
  ) {
    console.log("checkWinner stopped the game");
    if (player === 1) {
      //maybe I should have one gameOver and call it once.
      console.log("You Win");
      xScoreEl.textContent = ++xScore;
      console.log("checkWinner called gameOver");
      // gameOver(player);
      return true;
    } else if (player === 2) {
      console.log("You Lose");
      oScoreEl.textContent = ++oScore;
      console.log("checkWinner called gameOver");
      // gameOver(player);
      return true;
    }
  } else {
    console.log("No Winner");
    return false;
  }
};
const gameOver = function () {};
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
    checkWin(player);

    //can we make update board do the parseInt part???
    setTimeout(function () {
      //use classes and a function with toggle. the 1st move border is not with this function.
      dlLastEl.style.borderLeftColor = "orangered";
      dlFirstEl.style.borderLeftColor = "transparent";

      turn = 2;
    }, 400);
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
    checkWin(player);

    //can we make update board do the parseInt part???
    setTimeout(function () {
      //use classes and a function with toggle. the 1st move border is not with this function.
      dlLastEl.style.borderLeftColor = "transparent";
      dlFirstEl.style.borderLeftColor = "blue";

      turn = 1;
    }, 400);
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
