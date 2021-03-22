'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //ide o element
const score1El = document.getElementById('score--1'); //je to toiste ako predtym ale "rychlejsie"
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEL.classList.add('hidden');

let score = [0, 0]; //pre prveho a druheho playera
let currentScore = 0;
let activePlayer = 0;  //
let playing = true;


//function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); //toggle ak tam je prida ak je odstrani classu
  player1El.classList.toggle('player--active'); 
}


//rolling functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //rolling random
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;   //mozeme pouzit src

    //check for 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

      //current0EL.textContent = currentScore;
    } else {
      //document.getElementById( `score--${activePlayer}`).textContent = currentScore;
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0El.classList.toggle('player--active');    //toggle ak tam je prida ak je odstrani classu
      // player1El.classList.toggle('player--active');    //toggle ak tam nie je prida ak  je odstrani classu

      switchPlayer();

    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {

    //pridat cuurent score do aktivneho playera
    score[activePlayer] += currentScore;
    //score[1] = score[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    //score is >= 100
    //finish game
    if (score[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      switchPlayer();
    }
    //switch to next player 
  }
});


btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  playing = true;
  currentScore = 0;
  score = [0, 0];
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
});

