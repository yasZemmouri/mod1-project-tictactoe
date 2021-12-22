"use strict";

// const cases = Array.from(document.querySelectorAll(".case"));
//Access Elements
const caseOneEl = document.getElementsByClassName("caseOne");
// console.log(caseOneEl);
const cOne0El = caseOneEl[0];
const cOne1El = caseOneEl[1];
const cOne2El = caseOneEl[2];
const cOne3El = caseOneEl[3];
const cOne4El = caseOneEl[4];
const cOne5El = caseOneEl[5];
const cOne6El = caseOneEl[6];
const cOne7El = caseOneEl[7];
const cOne8El = caseOneEl[8];
cOne1El.textContent = "O";
// console.log(cOne8El);
const caseTwoEl = document.getElementsByClassName("caseTwo");
const cTwo0El = caseTwoEl[0];
const cTwo1El = caseTwoEl[1];
const cTwo2El = caseTwoEl[2];
const cTwo3El = caseTwoEl[3];
const cTwo4El = caseTwoEl[4];
const cTwo5El = caseTwoEl[5];
const cTwo6El = caseTwoEl[6];
const cTwo7El = caseTwoEl[7];
const cTwo8El = caseTwoEl[8];

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
    turn = 1,
    //boardSituation
    boardSituation = new Array(9).fill(0),
    //List of Empty Cases
    casesLeftIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ) {
    let self = this;
    this.casesLeft = casesLeft;
    this.turn = turn;
    this.boardSituation = boardSituation;
    this.casesLeftIndexes = casesLeftIndexes;
    // this.player1move = this.player1move.bind(this);
    this.updateBoard = function (caseIndex) {
      self.boardSituation[caseIndex] = self.turn;
      console.log("board updated");
      //tester
      let myvar = "";
      for (let i = 0; i < 9; i++) {
        myvar = myvar + " " + boardSituation[i];
      }
      console.log("boardSituation: " + myvar);
    };
    //should be used on player 1 too??
    this.updatecasesLeftIndexes = function (caseIndex) {
      //Precondition: takes caseIndex as number between 0 and 8
      //looks for caseIndex amongs emtyCaseTracker elements
      //if it finds return it's index.s
      let m = self.casesLeftIndexes.indexOf(caseIndex);
      //swap
      [self.casesLeftIndexes[m], self.casesLeftIndexes[casesLeft - 1]] = [
        self.casesLeftIndexes[casesLeft - 1],
        [self.casesLeftIndexes[m]],
      ];
      self.casesLeftIndexes.pop();
      //test swap
      let myvar = "";
      for (let i = 0; i < self.casesLeftIndexes.length; i++) {
        myvar = myvar + " " + self.casesLeftIndexes[i];
      }
      console.log("casesLeftIndexes: " + myvar);
    };

    this.player1move = function () {
      if (self.turn === 1 && this.textContent === "") {
        this.textContent = "M";
        let caseIndex = parseInt(this.id[1]);
        // console.log("caseIndex is: " + caseIndex);
        console.log("player 1 moved");
        // console.log("player1move says self is: " + self);
        // console.log(`player1move self: ${self.turn}`);
        //--------------------------------------------------------------
        self.updateBoard(caseIndex); //before changing the turn
        self.updatecasesLeftIndexes(caseIndex);
        self.turn = 2;
        //checkWin() || checkFullBoard(); //change turn to 0 if board full. should be after turn change
        //self.player2move();
      }
    };
  }
  greating() {
    return "is initialized!";
  }

  //randomely select which player moves first
  // playerToStart = function () {
  //   this.turn = Math.floor(Math.random() * 2 + 1);
  //   console.log(`Player ${this.turn} goes first`);
  // };
}

const game1 = new Game();
console.log("game1 " + game1.greating());
// game1.playerToStart();
const game2 = new Game();
// game2.playerToStart();
// jeu.playerToStart();

// const game = {
//   casesLeft = 9,

//   start: () => {
//     console.log("We are starting a game!");
//   },

//   turn: 0,
//   boardSituation: new Array(9).fill(0),
// };

startEl.addEventListener("click", game1.start, false);
// bord1 event listners
cOne0El.addEventListener("click", game1.player1move, false);
cOne1El.addEventListener("click", game1.player1move, false);
cOne2El.addEventListener("click", game1.player1move, false);
cOne3El.addEventListener("click", game1.player1move, false);
cOne4El.addEventListener("click", game1.player1move, false);
cOne5El.addEventListener("click", game1.player1move, false);
cOne6El.addEventListener("click", game1.player1move, false);
cOne7El.addEventListener("click", game1.player1move, false);
cOne8El.addEventListener("click", game1.player1move, false);
cOne0El.addEventListener("click", function () {
  cOne0El.style.backgroundColor = "red";
});
// console.log(cOne0El);
// board2 event listners
cTwo0El.addEventListener("click", game2.player1move, false);
cTwo1El.addEventListener("click", game2.player1move, false);
cTwo2El.addEventListener("click", game2.player1move, false);
cTwo3El.addEventListener("click", game2.player1move, false);
cTwo4El.addEventListener("click", game2.player1move, false);
cTwo5El.addEventListener("click", game2.player1move, false);
cTwo6El.addEventListener("click", game2.player1move, false);
cTwo7El.addEventListener("click", game2.player1move, false);
cTwo8El.addEventListener("click", game2.player1move, false);
