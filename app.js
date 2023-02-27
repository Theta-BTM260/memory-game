'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

let hasFlipped = false;
let firstCard;
let secondCard;


cards.forEach( card => {
  card.addEventListener('click', flip)
});

function flip(){
  this.classList.toggle('flip')

  if(!hasFlipped){

    hasFlipped = true;
    firstCard = this;

  } else{
    hasFlipped = false;
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

}

unflip = () => {
  setTimeout( () => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

  },1500);

}