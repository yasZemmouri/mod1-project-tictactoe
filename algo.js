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
    turn = 0;
    setTimeout(function () {
      //use classes and a function with toggle. the 1st move border is not with this function.
      dlLastEl.style.borderLeftColor = "orangered";
      dlFirstEl.style.borderLeftColor = "transparent";
      turn = 2;
    }, 500);
  }
};
const player2move = function () {
  if (turn === 2 && !this.querySelector("div").hasAttribute("class")) {
    this.querySelector("div").classList.add("o");
    turn = 0;
    setTimeout(function () {
      dlLastEl.style.borderLeftColor = "transparent";
      dlFirstEl.style.borderLeftColor = "blue";
      turn = 1;
    }, 500);
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
