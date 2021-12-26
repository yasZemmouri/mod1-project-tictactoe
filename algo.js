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
const startEl = document.getElementById("start");
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//========================= Global Variables ============================
let turn = 1;
//========================== Function Declarations =======================//
const reset = function () {
  for (let i = 0; i < 9; i++) {
    caseEl[i].querySelector("div").removeAttribute("class");
    console.log("remove");
  }
};
const player1move = function () {
  //   this.textContent = "X";
  if (turn === 1 && !this.querySelector("div").hasAttribute("class")) {
    this.querySelector("div").classList.add("x");
    turn = 2;
  }
};
const player2move = function () {
  if (turn === 2 && !this.querySelector("div").hasAttribute("class")) {
    this.querySelector("div").classList.add("o");
    turn = 1;
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
startEl.addEventListener("click", reset);

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
