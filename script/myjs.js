"use strict";

// console.log(c8El);
// const caseEl = document.getElementsByClassName("case");
// console.log("global caseEl: " + caseEl);
// const c0El = caseEl[0];
// const c1El = caseEl[1];
// const c2El = caseEl[2];
// const c3El = caseEl[3];
// const c4El = caseEl[4];
// const c5El = caseEl[5];
// const c6El = caseEl[6];
// const c7El = caseEl[7];
// const c8El = caseEl[8];

// const startEl = document.getElementById("start");

class Player {
  constructor(name, signe) {
    this.name = name;
    this.signe = signe;
  }
}
class Game {
  constructor(
    name
    //global Variables

    // casesLeft = 9,
    // turn = 1,
    //boardSituation
    // boardSituation = new Array(9).fill(0),
    //List of Empty Cases
    // casesLeftIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  ) {
    let self = this;
    this.name = name;
    //Access Elements
    const caseEl = Array.from(
      document.querySelectorAll(`#container${self.name} .case`)
    );
    // const caseEl = document.querySelectorAll(`${self.name} .case`);
    // const caseEl = document.querySelectorAll(`#container1 .case`);
    console.log(caseEl);
    //------------------------------------------------------------------------------
    const c0El = caseEl[0];
    // console.log("caseEl[0] content: " + (caseEl[0].textContent = "OK"));
    // console.log("c0El: " + c1El.textContent);
    const c1El = caseEl[1];
    console.log(c0El);
    const c2El = caseEl[2];
    const c3El = caseEl[3];
    const c4El = caseEl[4];
    const c5El = caseEl[5];
    const c6El = caseEl[6];
    const c7El = caseEl[7];
    const c8El = caseEl[8];
    // startEl.addEventListener("click", game1.start, false);
    // event listners

    // // console.log(c0El);
    // // board2 event listners
    // c0El.addEventListener("click", game2.player1move, false);
    // c1El.addEventListener("click", game2.player1move, false);
    // c2El.addEventListener("click", game2.player1move, false);
    // c3El.addEventListener("click", game2.player1move, false);
    // c4El.addEventListener("click", game2.player1move, false);
    // c5El.addEventListener("click", game2.player1move, false);
    // c6El.addEventListener("click", game2.player1move, false);
    // c7El.addEventListener("click", game2.player1move, false);
    // c8El.addEventListener("click", game2.player1move, false);
    // c1El.textContent = "O";
    this.casesLeft = 9;
    this.turn = 1;
    this.boardSituation = new Array(9).fill(0);
    this.casesLeftIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // this.player1move = this.player1move.bind(this);
    this.updateBoard = function (caseIndex) {
      self.boardSituation[caseIndex] = self.turn;
      console.log("board updated");
      //tester
      let myvar = "";
      for (let i = 0; i < 9; i++) {
        myvar = myvar + " " + self.boardSituation[i];
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
      [self.casesLeftIndexes[m], self.casesLeftIndexes[self.casesLeft - 1]] = [
        self.casesLeftIndexes[self.casesLeft - 1],
        [self.casesLeftIndexes[m]],
      ];
      self.casesLeftIndexes.pop();
      //   why not splice to remove the played element instead of swap and pop
      //   var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

      // for( var i = 0; i < arr.length; i++){

      //     if ( arr[i] === 5) {

      //         arr.splice(i, 1);
      //     }/
      //test swap
      let myvar = "";
      for (let i = 0; i < self.casesLeftIndexes.length; i++) {
        myvar = myvar + " " + self.casesLeftIndexes[i];
      }
      console.log("casesLeftIndexes: " + myvar);
    };

    self.checkWin = function () {
      console.log("checkWin says Hello!");
      let winner = 3 - self.turn; //since turns are inversed before making the call. we inverse them back
      if (
        (self.boardSituation[0] === winner &&
          self.boardSituation[1] === winner &&
          self.boardSituation[2] === winner) ||
        (self.boardSituation[0] === winner &&
          self.boardSituation[3] === winner &&
          self.boardSituation[6] === winner) ||
        (self.boardSituation[0] === winner &&
          self.boardSituation[4] === winner &&
          self.boardSituation[8] === winner) ||
        (self.boardSituation[1] === winner &&
          self.boardSituation[4] === winner &&
          self.boardSituation[7] === winner) ||
        (self.boardSituation[2] === winner &&
          self.boardSituation[5] === winner &&
          self.boardSituation[8] === winner) ||
        (self.boardSituation[2] === winner &&
          self.boardSituation[4] === winner &&
          self.boardSituation[6] === winner) ||
        (self.boardSituation[3] === winner &&
          self.boardSituation[4] === winner &&
          self.boardSituation[5] === winner) ||
        (self.boardSituation[6] === winner &&
          self.boardSituation[7] === winner &&
          self.boardSituation[8] === winner)
      ) {
        console.log("checkWinner stopped the game");
        if (winner === 2) {
          //maybe I should have one gameOver and call it once.
          console.log("You Lose");
          console.log("checkWinner called gameOver");
          gameOver(winner);
          return true;
        } else if (winner === 1) {
          console.log("You Win");
          console.log("checkWinner called gameOver");
          gameOver(winner);
          return true;
        }
      } else {
        console.log("No Winner");
        return false;
      }
    };

    this.player1move = function () {
      if (self.turn === 1 && this.textContent === "") {
        this.textContent = "X";
        let caseIndex = parseInt(this.id[1]);
        // console.log("caseIndex is: " + caseIndex);
        console.log("player 1 moved");
        // console.log("player1move says self is: " + self);
        // console.log(`player1move self: ${self.turn}`);
        //--------------------------------------------------------------
        self.updateBoard(caseIndex); //before changing the turn
        self.updatecasesLeftIndexes(caseIndex);
        self.turn = 2; //removed for testing reasons
        self.checkWin(); //|| checkFullBoard(); //change turn to 0 if board full. should be after turn change
        self.player2move();
      }
    };
    c0El.addEventListener("click", this.player1move, false);
    c1El.addEventListener("click", this.player1move, false);
    c2El.addEventListener("click", this.player1move, false);
    c3El.addEventListener("click", this.player1move, false);
    c4El.addEventListener("click", this.player1move, false);
    c5El.addEventListener("click", this.player1move, false);
    c6El.addEventListener("click", this.player1move, false);
    c7El.addEventListener("click", this.player1move, false);
    c8El.addEventListener("click", this.player1move, false);
    c0El.addEventListener("click", function () {
      c0El.style.backgroundColor = "red";
    });
    this.player2move = function () {
      if (self.turn === 2) {
        // let caseIndex = null;
        console.log("player 2 thinking");
        // if (level === 1) {
        //   caseIndex = level1();
        // } else if (level === 2) {
        //   caseIndex = level2();
        // } else if (level === 3) {
        //   caseIndex = level3();
        // }
        setTimeout(function () {
          let caseRandom = Math.floor(Math.random() * self.casesLeft);
          let caseIndex = self.casesLeftIndexes[caseRandom];
          console.log("player 2 moved");
          self.updateBoard(caseIndex); //before changing turn
          self.updatecasesLeftIndexes(caseIndex);
          caseEl[caseIndex].classList.add("stroke-txt");
          caseEl[caseIndex].textContent = "O";
          // turn = 0;//didn't work why??/
          self.turn = 1;
          self.checkWin(); // || checkFullBoard(); //must be executed after turn = 1; or we can use a condition. or maybe turn = check@in()||checkFullBoard()
        }, 600); //doesn't stop player 1 from playing

        //why not use turn 0 to stop player1 from playing somehow
        // // gameOver();
      }
    };
    this.greating = function () {
      console.log(`game${self.name} is initialized!`);
    };
    //randomely select which player moves first
    this.playerToStart = function () {
      this.turn = Math.floor(Math.random() * 2 + 1);
      console.log(`Player ${this.turn} goes first`);
    };
  }
}
// console.log(document.querySelectorAll("#container1 .case"));
const game1 = new Game(1);
game1.greating();

// // game1.playerToStart();
const game2 = new Game(2);
console.log(game2.name);
game2.greating();
// game2.playerToStart();
// // jeu.playerToStart();

// startEl.addEventListener("click", game1.start, false);
// // bord1 event listners
// c0El.addEventListener("click", game1.player1move, false);
// c1El.addEventListener("click", game1.player1move, false);
// c2El.addEventListener("click", game1.player1move, false);
// c3El.addEventListener("click", game1.player1move, false);
// c4El.addEventListener("click", game1.player1move, false);
// c5El.addEventListener("click", game1.player1move, false);
// c6El.addEventListener("click", game1.player1move, false);
// c7El.addEventListener("click", game1.player1move, false);
// c8El.addEventListener("click", game1.player1move, false);
// c0El.addEventListener("click", function () {
//   c0El.style.backgroundColor = "red";
// });
// // console.log(c0El);
// // board2 event listners
// c0El.addEventListener("click", game2.player1move, false);
// c1El.addEventListener("click", game2.player1move, false);
// c2El.addEventListener("click", game2.player1move, false);
// c3El.addEventListener("click", game2.player1move, false);
// c4El.addEventListener("click", game2.player1move, false);
// c5El.addEventListener("click", game2.player1move, false);
// c6El.addEventListener("click", game2.player1move, false);
// c7El.addEventListener("click", game2.player1move, false);
// c8El.addEventListener("click", game2.player1move, false);
