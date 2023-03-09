'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

let hasFlipped = false;
let lock = false;
let firstCard;
let secondCard;
let timeLeft = 10;
let score = 0;
let matchCount = 0;
let scoreEl = document.getElementById('score');

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

    //if all matches found before timer is done remove event listener and counter
    console.log(matchCount, 'this is match count');

    if(matchCount === 8){

      clearInterval(gameTimer);
      alert('you beat the clock! Go again?')
      cards.forEach(card => {
        card.removeEventListener('click', flip)
      });
    }
    
    
    //check if 0
    
    if (timeLeft === 0) {
      alert('Time is up! click reset to try again.');
      clearInterval(gameTimer);
      
      cards.forEach(card => {
        card.removeEventListener('click', flip)
      });
    }
    
    return timeLeft;
    
  }, 1000);
  
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

    score += timeLeft
    matchCount +=1
    console.log(score, 'this is the score')

    if(matchCount === 8){
      console.log('something')

      scoreEl.textContent = `your final score is ${score}`;
    }


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

    lock = false;
    reset();
  }, 2300);

}

function reset() {
  [hasFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
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

  timeLeft = 120;
  document.getElementById('timer').textContent = `Timer: ${timeLeft}`; //Sets timer back to og time
scoreEl.textContent = ''
  matchCount = 0;
  score = 0;
  reset();
  // shuffle();
}
