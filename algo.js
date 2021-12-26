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
    caseEl[i].querySelector("div").classList.remove("x");
    caseEl[i].querySelector("div").classList.remove("o");
    console.log("remove");
  }
};
const player1move = function () {
  //   this.textContent = "X";
  if (
    turn === 1 &&
    !this.querySelector("div").classList.contains("o") &&
    !this.querySelector("div").classList.contains("x")
  )
    this.querySelector("div").classList.add("x");
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
