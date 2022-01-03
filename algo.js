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
const selectLevelEl = document.getElementById("select-level");
const suggestionEl = document.getElementById("suggestion");

//========================= Global Variables ============================
let turn = 1;
let player = turn; // I made it globale so I can use it inside checkCompliments to compare the winner
let gamesCounter = 0;
const boardSituation = new Array(9).fill(0);
//number of empty cases. used by checkFullBoard()
let caseIndex = -1; //made it globale because I needed checkCompliment to return true or false and change caseIndex at the same time.
let casesLeft = 9;
let xScore = 0,
  oScore = 0;
let level = 0;
const casesLeftIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];

//========================== Function Declarations =======================//
const reset = function () {
  for (let i = 0; i < 9; i++) {
    //Reset UI board
    caseEl[i].querySelector("div").removeAttribute("class");
    //Reset board Array
    boardSituation[i] = 0;
    //reset casesLeftIndexes
    casesLeftIndexes[i] = i;
    //reset reset
    resetEl.style.display = "none";
    //reset p
    pEl[0].style.top = "-90px";
    pEl[0].style.visibility = "hidden";
    //reset cases left
    casesLeft = 9;
  }

  //reset gameOver screen
  //use reverse effect on game over too
  gameOverEl.classList.remove("gameOver-screen");
  fLineEl.removeAttribute("class");
  lLineEl.textContent = "";
  //reset turn (alternate between 1 and 2)
  turn = 1 + (gamesCounter % 2);
  //reset caseIndex
  caseIndex = -1;

  // console.log("game reseted");
  setTimeout(function () {
    console.log("reset calling compMove()");
    compMove();
  }, 400);
};

const updateBoard = function (player, caseIndex) {
  boardSituation[caseIndex] = player;
  // console.log("board updated");
  //tester
  let myvar = "";
  for (let i = 0; i < 9; i++) {
    myvar = myvar + " " + boardSituation[i];
  }
  console.log("boardSituation: " + myvar);
};
const updateCasesLeftIndexes = function (caseIndex) {
  //Precondition: takes caseIndex as number between 0 and 8
  //looks for caseIndex amongs caseIndexesLeft elements
  //if it finds return it's index.

  let m = casesLeftIndexes.indexOf(caseIndex);
  // //swap
  // [casesLeftIndexes[m], casesLeftIndexes[casesLeft - 1]] = [
  //   casesLeftIndexes[casesLeft - 1],
  //   [casesLeftIndexes[m]],
  // ];
  // casesLeftIndexes.pop();
  let k = casesLeftIndexes.splice(m, 1);
  console.log("cseIndex: " + caseIndex);
  console.log("element removed: " + k);
  //test swap
  let myvar = "";
  for (let i = 0; i < casesLeftIndexes.length; i++) {
    myvar = myvar + " " + casesLeftIndexes[i];
  }
  console.log("casesLeftIndexes: " + myvar);
  console.log(casesLeftIndexes);
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
      // console.log("checkWinner called gameOver");
      gameOver(winner);
      return true;
    } else if (winner == 2) {
      console.log("You Lose");
      oScoreEl.textContent = ++oScore;
      // console.log("checkWinner called gameOver");
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
  // console.log("checkFullBoard was called");
  casesLeft--;
  console.log("cases left: " + casesLeft); //test
  if (casesLeft === 0) {
    // console.log("checkFullBoard stopped the game");
    // console.log("No more moves");
    // console.log("checkFullBoard called gameOver");
    gameOver(casesLeft);
    return true;
  } else return false;
};

const gameOver = function (winner) {
  console.log("game over says hi");
  // turn = 0;
  if (winner === 1) {
    // pEl[0].querySelector("div").classList.add("x");
    // console.log("fLineEl: " + fLineEl);
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
  gamesCounter++;
  // document.getElementById("gameOver").style.display = "flex";
  gameOverEl.classList.add("gameOver-screen");
  resetEl.style.display = "block";
  // pEl[0].style.visibility = "visible";
  pEl[0].style.top = "0";
  pEl[0].style.visibility = "visible";
};
const removeSuggest = function () {
  const caseSuggest = document.querySelector(".suggestion");
  if (caseSuggest) {
    caseSuggest.classList.remove("suggestion");
    return true;
  } else return false;
};
const player1move = function () {
  //   this.textContent = "X";
  if (turn === 1 && !this.querySelector("div").hasAttribute("class")) {
    player = 1;
    let clickedEl = this;
    //draw move
    clickedEl.querySelector("div").classList.add("x");
    //remove blinking suggestion if activated
    removeSuggest();

    turn = 0;
    caseIndex = parseInt(clickedEl.id[1]);
    //update board
    updateBoard(player, caseIndex);
    updateCasesLeftIndexes(caseIndex);
    //check if Win

    //can we make update board do the parseInt part???
    checkWin(player) || checkFullBoard() || (turn = 2);
    setTimeout(function () {
      //use classes and a function with toggle. the 1st move border is not with this function.
      dlLastEl.style.borderLeftColor = "orangered";
      dlFirstEl.style.borderLeftColor = "transparent";
      console.log("player1 calling compMove()");
      compMove();
    }, 350);
  }
};
const player2move = function () {
  //   this.textContent = "X";
  if (
    turn === 2 &&
    level === 0 &&
    !this.querySelector("div").hasAttribute("class")
  ) {
    player = turn;
    turn = 0; //to prevent player2 from clicking twice
    //remove suggestion if activated
    removeSuggest();
    caseIndex = -1;
    let clickedEl = this;
    //draw move
    clickedEl.querySelector("div").classList.add("o");
    //why is turn = 0???
    // turn = 0;
    caseIndex = parseInt(clickedEl.id[1]);
    //update board
    updateBoard(player, caseIndex);
    updateCasesLeftIndexes(caseIndex); //In case we switch to computer while in middle of the game.
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
const checkCompliments = function (playerNum) {
  //think about a math formula
  //========================================================================
  //console.log(`playerNum: ${playerNum}`);
  if (
    boardSituation[0] === playerNum &&
    boardSituation[1] === playerNum &&
    boardSituation[2] === 0
  ) {
    caseIndex = 2;
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    return true;
  } else if (
    boardSituation[0] === playerNum &&
    boardSituation[2] === playerNum &&
    boardSituation[1] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 1;
    return true;
  } else if (
    boardSituation[1] === playerNum &&
    boardSituation[2] === playerNum &&
    boardSituation[0] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 0;
    return true;
  }
  //-------------------------------------------------------------------------
  else if (
    boardSituation[3] === playerNum &&
    boardSituation[4] === playerNum &&
    boardSituation[5] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 5;
    return true;
  } else if (
    boardSituation[3] === playerNum &&
    boardSituation[5] === playerNum &&
    boardSituation[4] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 4;
    return true;
  } else if (
    boardSituation[4] === playerNum &&
    boardSituation[5] === playerNum &&
    boardSituation[3] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 3;
    return true;
  }
  //-------------------------------------------------------------------------
  else if (
    boardSituation[6] === playerNum &&
    boardSituation[7] === playerNum &&
    boardSituation[8] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 8;
    return true;
  } else if (
    boardSituation[6] === playerNum &&
    boardSituation[8] === playerNum &&
    boardSituation[7] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 7;
    return true;
  } else if (
    boardSituation[7] === playerNum &&
    boardSituation[8] === playerNum &&
    boardSituation[6] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 6;
    return true;
  }
  //====================================================================================
  else if (
    boardSituation[0] === playerNum &&
    boardSituation[3] === playerNum &&
    boardSituation[6] === 0
  ) {
    caseIndex = 6;
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    return true;
  } else if (
    boardSituation[0] === playerNum &&
    boardSituation[6] === playerNum &&
    boardSituation[3] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 3;
    return true;
  } else if (
    boardSituation[3] === playerNum &&
    boardSituation[6] === playerNum &&
    boardSituation[0] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 0;
    return true;
  }
  //-------------------------------------------------------------------------
  else if (
    boardSituation[1] === playerNum &&
    boardSituation[4] === playerNum &&
    boardSituation[7] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 7;
    return true;
  } else if (
    boardSituation[1] === playerNum &&
    boardSituation[7] === playerNum &&
    boardSituation[4] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 4;
    return true;
  } else if (
    boardSituation[4] === playerNum &&
    boardSituation[7] === playerNum &&
    boardSituation[1] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 1;
    return true;
  }
  //-------------------------------------------------------------------------
  else if (
    boardSituation[2] === playerNum &&
    boardSituation[5] === playerNum &&
    boardSituation[8] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 8;
    return true;
  } else if (
    boardSituation[5] === playerNum &&
    boardSituation[8] === playerNum &&
    boardSituation[2] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 2;
    return true;
  } else if (
    boardSituation[2] === playerNum &&
    boardSituation[8] === playerNum &&
    boardSituation[5] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 5;
    return true;
  }
  //=============================================================
  //-------------------------------------------------------------------------
  else if (
    boardSituation[0] === playerNum &&
    boardSituation[4] === playerNum &&
    boardSituation[8] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 8;
    return true;
  } else if (
    boardSituation[0] === playerNum &&
    boardSituation[8] === playerNum &&
    boardSituation[4] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 4;
    return true;
  } else if (
    boardSituation[4] === playerNum &&
    boardSituation[8] === playerNum &&
    boardSituation[0] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 0;
    return true;
  }
  //-------------------------------------------------------------------------
  else if (
    boardSituation[2] === playerNum &&
    boardSituation[4] === playerNum &&
    boardSituation[6] === 0
  ) {
    playerNum === player
      ? console.log(
          `playerNum: ${playerNum} and turn: ${turn}. checkCompliments found win`
        )
      : console.log(
          `playerNum: ${playerNum} and turn: ${turn}. checkCompliments prevented a loss`
        );
    caseIndex = 6;
    return true;
  } else if (
    boardSituation[2] === playerNum &&
    boardSituation[6] === playerNum &&
    boardSituation[4] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 4;
    return true;
  } else if (
    boardSituation[4] === playerNum &&
    boardSituation[6] === playerNum &&
    boardSituation[2] === 0
  ) {
    playerNum === player
      ? console.log("checkCompliments found win")
      : console.log("checkCompliments prevented a loss");
    caseIndex = 2;
    return true;
  } else {
    console.log("couldn't find anything");
    return false;
  }
};

const strategy1 = function () {
  //1st move
  //if side you can play middle aleatory
  if (casesLeft === 9) {
    caseIndex = 0;
    console.log("level3 played strategy");
    return true;
  }

  //2nd move
  else if (casesLeft === 7) {
    if (boardSituation[1] === 3 - player) {
      caseIndex = 6;
      console.log("level3 played strategy");
      return true;
    } else if (boardSituation[3] === 3 - player) {
      caseIndex = 2;
      console.log("level3 played strategy");
      return true; //
    } else if (boardSituation[4] === 3 - player) {
      caseIndex = 8;
      console.log("level3 played strategy");
      return true; //
    } else if (
      boardSituation[7] === 3 - player ||
      boardSituation[5] === 3 - player
    ) {
      caseIndex = 4;
      console.log("level3 played stratgy");
      return true; //
    } else if (
      boardSituation[6] === 3 - player ||
      boardSituation[2] === 3 - player
    ) {
      caseIndex = 8;
      console.log("level3 played stratgy");
      return true; //
    } else if (boardSituation[8] === 3 - player) {
      console.log("level3 played stratgy");
      caseIndex = 6;
      return true;
    }

    //2nd to play
    else {
      console.log("level3 didn't find strategy");
      return false;
    }
  }
  //3rd move
  else if (casesLeft === 5) {
    if (boardSituation[8] === 0) caseIndex = 8;
    // else if (boardSituation[2] === 0) caseIndex = 2;
    else {
      caseIndex = 2;
      console.log("level3 played strategy");
    }
    return true;
  }
  //2nd to start
  else if (casesLeft === 8) {
    if (boardSituation[4] === 0) {
      caseIndex = 4;
      console.log("level3 played case 4");
      return true;
    }
  } else if (casesLeft === 6) {
    if (
      (boardSituation[0] === 3 - player && boardSituation[8] === 3 - player) ||
      (boardSituation[2] === 3 - player && boardSituation[6] === 3 - player)
    ) {
      caseIndex = 2 * Math.floor(Math.random() * 4) + 1; //Play randomely 1 or 3 or 5 or 7
      console.log("level3 played strategy");
      return true;
    }
  } else {
    console.log("level3 couldn't find strategy");
    return false;
  }
};
const suggestion = function () {
  player = turn;
  console.log("casesLeft: " + casesLeft);
  console.log("player: " + player);
  console.log("turn: " + turn);
  console.log(boardSituation[4] === 3 - turn);
  console.log(boardSituation[4] === 3 - player);

  level3(player);
  console.log("caseIndex: " + caseIndex);
  caseEl[caseIndex].classList.add("suggestion");
  caseIndex = -1;
};
const level3 = function (player) {
  //check if player is about to win
  console.log(player);
  console.log("level3 called checkCompliments(player)");
  checkCompliments(player) ||
    //check if opponent is about to win (3 - turn is the opponent number)
    checkCompliments(3 - player) ||
    strategy1(player) ||
    level1();
};

const level2 = function (player) {
  //level2 doens't recognize occupied cases.
  //why not use the same function and pass turn the first time and 3-turn the second time.
  console.log("level2 said turn is : " + player);
  checkCompliments(player) || checkCompliments(3 - player) || level1(); //lookForLoses()
};
//activate only when its called by player1?
//how can I make it go first??
//should I put the whole function inside settimeout???
const level1 = function () {
  console.log("level1 to play");
  let caseRandom = Math.floor(Math.random() * casesLeft);
  console.log("level1 played random");
  caseIndex = casesLeftIndexes[caseRandom];
};
const compMove = function () {
  if (turn === 2 && level !== 0) {
    console.log("turn at computer: " + turn);
    removeSuggest();
    player = turn; //why did I created player? so I can make turn = 0 early at the call. and I don't need to use 3-turn
    turn = 0; //why???

    caseIndex = -1; //just to make sure I'm not getting an old caseIndex value.
    //use switch case instead???
    if (level === 1) {
      level1();
    } else if (level === 2) {
      level2(player);
    } else if (level === 3) {
      level3(player);
    }
    caseEl[caseIndex].querySelector("div").classList.add("o");
    //update casesLeftIndex
    updateCasesLeftIndexes(caseIndex);

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
suggestionEl.addEventListener("click", suggestion);
selectLevelEl.addEventListener("change", function () {
  level = parseInt(selectLevelEl.value);
  console.log("Level: " + level);
  console.log("level change calling compMove()");
  compMove();
});

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
