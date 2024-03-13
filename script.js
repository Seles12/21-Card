"use strict";
const player0Ele = document.querySelector(".player--0");
const player1Ele = document.querySelector(".player--1");
const score0ele = document.getElementById("scoreativo0");
const score1ele = document.getElementById("scoreativo1");
const current0ele = document.getElementById("current--0");
const current1ele = document.getElementById("current--1");
const cardele = document.querySelector(".card");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnhold = document.querySelector(".btn-hold");

const startGame = function () {
  let maximo = 10;

  let scores = [0, 0];
  let currentScore = 0;
  let activePlayer = 0;
  let playing = true;
  //mudanca de current
  const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Ele.classList.toggle("player--active");
    player1Ele.classList.toggle("player--active");
  };

  // //Starting conditions
  score0ele.textContent = 0; // retirou valor 43
  score1ele.textContent = 0; // retirou valor 24
  cardele.classList.add("hidden"); // retirou carta do dislplay

  const restartGame = function () {
    startGame();
  };

  // ROOLING CARD //

  btnRoll.addEventListener("click", function () {
    if (playing) {
      const card = Math.trunc(Math.random() * 13) + 1;

      // removendo hidden e mostrando as cartas
      cardele.classList.remove("hidden");
      cardele.src = `card-${card}.png`;
      // condicao para matematica das cartas
      if (card <= 10) {
        currentScore = currentScore + card;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else if (card > 10) {
        //   // currentScore = currentScore + card;
        //   // current0ele.textContent = currentScore;

        currentScore = currentScore + maximo;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
        //   // document.getElementById(`current--${activePlayer}`).textContent =
        //   //   activePlayer;
      } else {
        switchPlayer();
      }
    }
  });
  btnhold.addEventListener("click", function () {
    if (playing) {
      scores[activePlayer] += currentScore;
      document.getElementById(`scoreativo${activePlayer}`).textContent =
        scores[activePlayer];

      if (scores[activePlayer] >= 21) {
        playing = false;
        cardele.classList.add("hidden");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("player--lost");

        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player--active");
      } else {
        switchPlayer();
      }
    }
  });

  btnNew.addEventListener("click", function () {
    let scores = [0, 0];
    let currentScore = 0;
    let activePlayer = 0;
    let playing = true;

    score0ele.textContent = 0;
    score1ele.textContent = 0;
    current0ele.textContent = 0;
    current1ele.textContent = 0;
    player0Ele.classList.remove("player--lost");
    player1Ele.classList.remove("player--lost");
    player0Ele.classList.add("player--active");
    player1Ele.classList.remove("player--active");
  });

  btnNew.addEventListener("click", function () {
    restartGame();
  });
};

startGame();
