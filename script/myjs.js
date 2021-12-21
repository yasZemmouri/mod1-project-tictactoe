"use strict";

// const cases = Array.from(document.querySelectorAll(".case"));
//Access Elements
const caseEl = document.getElementsByClassName("case");
const c0El = caseEl[0];
const c1El = caseEl[1];
const c2El = caseEl[2];
const c3El = caseEl[3];
const c4El = caseEl[4];
const c5El = caseEl[5];
const c6El = caseEl[6];
const c7El = caseEl[7];
const c8El = caseEl[8];

const startEl = document.getElementById("start");

class Player {
  constructor(name, signe) {
    this.name = name;
    this.signe = signe;
  }
}
class Game {
  constructor(
    //global Variables
    casesLeft = 9,
    turn = 0,
    //boardSituation
    boardSituation = new Array(9).fill(0),
    //List of Empty Cases
    casesLeftIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ) {
    this.casesLeft = casesLeft;
    this.turn = turn;
    this.boardSituation = boardSituation;
    this.casesLeftIndexes = this.casesLeftIndexes;
  }
  //randomely select which player moves first
  playerToStart = function () {
    this.turn = Math.floor(Math.random() * 2 + 1);
    console.log(`Player ${this.turn} goes first`);
  };
  player1move = function () {
    console.log("c0");
  };
}

const game = new Game();
game.playerToStart();
// jeu.playerToStart();

// const game = {
//   casesLeft = 9,

//   start: () => {
//     console.log("We are starting a game!");
//   },

//   turn: 0,
//   boardSituation: new Array(9).fill(0),
// };

startEl.addEventListener("click", game.start, false);
c0El.addEventListener("click", game.player1move, false);
