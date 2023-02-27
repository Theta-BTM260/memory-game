'use strict'
console.log('hello world')

const cards = document.querySelectorAll(".card")

function flip(){
  this.classList.toggle('flip')
};

cards.forEach( card => {
  card.addEventListener('click', flip)
});