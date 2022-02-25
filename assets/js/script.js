// Choose game button is clickable, you can choose from there how hard would you like to play.

$('#button-card').click(function(){
    $('#button-p').toggle('slow');
});


// add my gameboard inside of ply button

const button = document.getElementById('btn-play-game');
const board = document.getElementById('card-container');

button.onclick = function () {
    board.style.display = 'block';
    button.style.display = 'none';
}
// flipping cards

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



// Checked if is match and if it is not match
// When cards matched they will removed from main screen
// setTimeOut helps firs shows both cards face befor removing from gameboard

function matchedCards(cardOne, cardTwo) {
    console.log(cardOne.dataset.framework)
    let isMatch = cardOne.dataset.framework === cardTwo.dataset.framework;

    isMatch ? disableCards() : unmatchedCards();

    score++;
}

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
        if (score === 16) {
            alert("Congratulations! You Won!");
        } else {
            alert('Hey you got match!');
        }
        resetBoard();
    }, 1200);
}


function unmatchedCards() {
    lockBoard = true;


    setTimeout(() => {
        cardOne.classList.remove('flip');
        cardTwo.classList.remove('flip');

        resetBoard();
    }, 1200);

}

function resetBoard() {
    flippedCard = false;
    lockBoard = false;
    cardOne = null;
    cardTwo = null;
   
}


function shuffleCards() {
    // step 1 - get all cards and the cards container
    const cardsContainer = document.getElementById('cards-container');
    let cardsArray = document.querySelectorAll('.card');

    // step 2 - shuffle the cards
    cardsArray = [...cardsArray].sort(() => (Math.random() > 0.5) ? 1 : -1);

    // step 3 - empty the cards container
    cardsContainer.innerHTML = '';

    // step 4 - add the cards back into the dom
    cardsArray.forEach(card => cardsContainer.innerHTML += `<div class="card" id="card">${card.innerHTML}</div>`);

    // flip card listener
    const cards = document.querySelectorAll('.card-inner');
    cards.forEach(card => card.addEventListener('click', flipCard))

}const init = () => {
  shuffleCards();
}
init()

