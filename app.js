'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

let hasFlipped = false;
let lock = false;
let firstCard;
let secondCard;
let timeLeft = 5;

const startBtn = document.getElementById('start-btn')

document.getElementById('timer').textContent = timeLeft

startBtn.addEventListener('click', () => {

  let gameTimer = setInterval(() => {
    // decrement timer
    timeLeft--;

    //update DOM
    document.getElementById('timer').textContent = timeLeft

    //check if 0

    if (timeLeft === 0) {
      alert('Time is up!')
      clearInterval(gameTimer);
    }

  }, 1000);

})
cards.forEach(card => {
  card.addEventListener('click', flip)
});

function flip() {
  if (lock === true) return;
  if (this === firstCard) return;
  this.classList.toggle('flip')

  if (!hasFlipped) {

    hasFlipped = true;
    firstCard = this;

  } else {
    secondCard = this;
    checkMatch();
  }
};


function checkMatch() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) { //match
    cardDisable()

  } else { //NOT match
    unflip();
  }
}

function cardDisable() {

  firstCard.removeEventListener('click', flip)
  secondCard.removeEventListener('click', flip)
  reset();
}

let unflip = () => {

  lock = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // lock = false;
    reset();
  }, 1500);

}

function reset() {
  [hasFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
  timeLeft = 60
}

function resetBoard() {

  cards.forEach(card => {
    card.classList.remove('flip')
  }); //removes flip class to 'clear' the board

  reset();

}

(function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  })
})(); // invoked right after definition

