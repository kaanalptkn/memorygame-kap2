const card = document.querySelectorAll('.card-inner')


function flip(e){
    console.log(e.target);
}

    card.forEach ( cardInner => {
    cardInner.addEventListener('click', flip);
});
