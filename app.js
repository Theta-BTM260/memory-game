'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

let hasFlipped = false;
let lock = false;
let firstCard;
let secondCard;


cards.forEach( card => {
  card.addEventListener('click', flip)
});

function flip(){
  if (lock === true) return;
  if (this === firstCard) return;
  this.classList.toggle('flip')

  if(!hasFlipped){

    hasFlipped = true;
    firstCard = this;

  } else{
    secondCard = this;
    checkMatch();
  }
};


function checkMatch(){
  if(firstCard.dataset.framework === secondCard.dataset.framework){ //match
    cardDisable()

  } else { //NOT match
    unflip();
  }
}

function cardDisable(){

  firstCard.removeEventListener('click', flip)
  secondCard.removeEventListener('click', flip)
  reset();
}

let unflip = () => {

  lock = true;

  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // lock = false;
    reset();
  },1500);

}

function reset(){
  [hasFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function resetBoard(){

  cards.forEach(card => {
    card.classList.remove('flip')
  }); //removes flip class to 'clear' the board

  reset();

}

(function shuffle(){
  cards.forEach(card => {
    let random = Math.floor(Math.random() * 16);
    card.style.order = random;
  })
})(); // invoked right after definition

