'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

let hasFlipped = false;
let lock = false;
let firstCard;
let secondCard;
let timeLeft = 60;
let score = 0;

const startBtn = document.getElementById('start-btn')
const resetBtn = document.getElementById('reset');

document.getElementById('timer').textContent = `Timer: ${timeLeft} seconds`;

startBtn.addEventListener('click', () => {
  cards.forEach(card => {
    card.addEventListener('click', flip)
  });

  //check if timer is 0
  if(timeLeft === 0) {
    alert('press reset before starting new game!')
    return;
  }
  // shuffle()
  let gameTimer = setInterval(() => {


    // decrement timer
    timeLeft--;

    //update DOM
    document.getElementById('timer').textContent = timeLeft

    
    //check if 0
    
    if (timeLeft === 0) {
      alert('Time is up!')
      clearInterval(gameTimer);
      
      cards.forEach(card => {
        card.removeEventListener('click', flip)
      });
    }
    
    return timeLeft;
    
  }, 1000);
  
});


// cards.forEach(card => {
//   card.addEventListener('click', flip)
// });

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

    score += timeLeft
    console.log(score, 'this is the score')


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
  // timeLeft = 55
  // document.getElementById('timer').textContent = `Timer: ${timeLeft}`;

}


resetBtn.addEventListener('click', () => {
  resetBoard();
});

function shuffle() {
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  })
}; 

function resetBoard() {

  cards.forEach(card => {
    card.classList.remove('flip')
  }); //removes flip class to 'clear' the board

  timeLeft = 60;
  document.getElementById('timer').textContent = `Timer: ${timeLeft}`; //Sets timer back to og time

  reset();
  shuffle();
}
