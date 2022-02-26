// How to play button is clickable, users can see what is the game rule,
// from there they can see how to play. Used toggle here

$('#button-card').click(function(){
    $('#button-p').toggle('slow');
});


// I added the gameboard to the play button. 
//When you press the play button, the game starts.
// I used get element with id here and used onclick function.

const button = document.getElementById('btn-play-game');
const board = document.getElementById('card-container');

button.onclick = function () {
    board.style.display = 'block';
    button.style.display = 'none';
}
// flipping cards
// I added lock the board and wait until the cards finish to flipping

let flippedCard = false;
let lockBoard = false;
let cardOne, cardTwo;
let score = 0;

function flipCard() {
    
    if (lockBoard) return;
    if (this === cardOne) return;

    this.classList.add('flip');

    if (!flippedCard) {
        //first time clicked card

        flippedCard = true;
        cardOne = this;

        return;
    }
    // second time clicked the cards
    flippedCard = false;
    cardTwo = this;

    matchedCards(cardOne, cardTwo);

}



// In this section checked if is match and if it is not match
// When cards matched they will removed from main screen
// setTimeOut helps for shows both cards face befor removing from gameboard

function matchedCards(cardOne, cardTwo) {
    console.log(cardOne.dataset.framework)
    let isMatch = cardOne.dataset.framework === cardTwo.dataset.framework;

    isMatch ? disableCards() : unmatchedCards();

}

// In this section, after the cards are matched, an alert (Hey you got match!) 
//is displayed. then it disappears from the screen. A different alert(Congratulations! 
//You are winner!) pops up when the last card is deleted from the screen.
// I used score, remove event listener and hide. Also I set time out as well. 


function disableCards() {
    score++;
    console.log(score);

    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);

    setTimeout(() => {
        cardTwo.classList.add("hide");
        cardOne.classList.add("hide");
        resetBoard();
    }, 1200);

    setTimeout(() => {
        if (score === 15) {
            alert("Congratulations! You are winner!");
        } else {
            alert('Hey you got match!');
        }
        resetBoard();
    }, 1200);
}



// If cards are not match they are again flipping. I used here flip method
// and I set time out.

function unmatchedCards() {
    lockBoard = true;


    setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');

        resetBoard();
    }, 1200);

}

// I added reset board function for  after each flipping first and secdon card to know.
// in this function I set the board.

function resetBoard() {
    flippedCard = false;
    lockBoard = false;
    cardOne = null;
    cardTwo = null;
   
}

// Added get all cards and the cards container
// Then shuffle the cards
// empty the cards container
// added the cards back into the dom
// flip card listener

function shuffleCards() {
    
    const cardsContainer = document.getElementById('cards-container');
    let cardsArray = document.querySelectorAll('.card');

    
    cardsArray = [...cardsArray].sort(() => (Math.random() > 0.5) ? 1 : -1);

    
    cardsContainer.innerHTML = '';

    
    cardsArray.forEach(card => cardsContainer.innerHTML += `<div class="card" id="card">${card.innerHTML}</div>`);

    
    const cards = document.querySelectorAll('.card-inner');
    cards.forEach(card => card.addEventListener('click', flipCard))

}const init = () => {
  shuffleCards();
}
init()

