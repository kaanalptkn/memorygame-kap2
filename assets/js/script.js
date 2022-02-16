let cards = document.getElementsByClassName('card');

for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', flipCard);
}

function flipCard() {
    cards.classList.toggle('flipCard');
}

