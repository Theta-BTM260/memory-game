'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

let hasFlipped = false;
let firstCard;
let secondCard;

function flip(){
  this.classList.toggle('flip')

  if(!hasFlipped){

    hasFlipped = true;
    firstCard = this;

  } else{
    hasFlipped = false;
    secondCard = this;


    if(firstCard.dataset.framework === secondCard.dataset.framework){ //match

      firstCard.removeEventListener('click', flip)
      secondCard.removeEventListener('click', flip)

    } else { //NOT match
      
      setTimeout( () => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

      },1500);

    }
  }


};

cards.forEach( card => {
  card.addEventListener('click', flip)
});