const cards = document.querySelectorAll('.cards')

card.forEach( el => {
    el.addEventListener("click", function(){
        el.classList.add('flip')
    })
});

