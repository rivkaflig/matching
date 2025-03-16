document.addEventListener("DOMContentLoaded", ()=> {

    const matches = [
        {id: 1, gadol: "Images/R-Chaim.jpg", dataValue: "RChaim", alt: "Rav-Chaim"},
        {id: 2, gadol: "Images/R-Edelshtein.jpg", dataValue: "REdelshtein", alt: "Rav-Edelshtein"},
        {id: 3, gadol: "Images/R-Elyashiv.jpg", dataValue: "RElyashiv", alt: "Rav-Elyashiv"},
        {id: 4, gadol: "Images/R-Feinstein.jpg", dataValue: "RFeinstein", alt: "Rav-Feinstein"},
        {id: 5, gadol: "Images/R-Feldman.jpg", dataValue: "RFeldman", alt: "Rav-Feldman"},
        {id: 6, gadol: "Images/R-Finkel.jpg", dataValue: "RFinkel", alt: "Rav-Finkel"},
        {id: 7, gadol: "Images/R-Salomon.jpg", dataValue: "RSalomon", alt: "Rav-Salomon"},
        {id: 8, gadol: "Images/R-Shapiro.jpg", dataValue: "RShapiro", alt: "Rav-Shapiro"},
        {id: 9, gadol: "Images/R-Shteinman.jpg", dataValue: "RSteinman", alt: "Rav-Sheinman"},
        {id: 10, gadol: "Images/Steipler-Gaon.jpg", dataValue: "Steipler", alt: "Steipler-Gaon"}
    ];

    let flippedCards = []; // to be used in flipCard()

    const cards = document.querySelectorAll(".card"); // HTML collection of elements whose class="card" 
    
    cards.forEach((element => { 
        element.addEventListener("click", flipCard);
        for (let i =0; i < 19; i++){
            let clone = element.cloneNode(true); // deep copy - include child elements
            element.parentNode.appendChild(clone);
            clone.addEventListener("click", flipCard);
        }
    }))

    const cardsDup = document.querySelectorAll(".card"); // updated HTML collection all cards after duplicated
    
    function shuffleImages() {
        //Duplicate the matches array so that there are two of each element
        const duplicatedMatches = [...matches, ...matches];
        //shuffle the array with the fisher yates algorithm
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        shuffleArray(duplicatedMatches);
        
        const cardpics = Array.from(document.querySelectorAll(".cardpic"));
        //set each picture to one of the matched pictures and remove it once it has been used
        cardpics.forEach(function (pic, index) {
            pic.setAttribute("src", duplicatedMatches[index].gadol);
            pic.setAttribute("alt", duplicatedMatches[index].alt)
            pic.parentElement.parentElement.setAttribute("data-value", duplicatedMatches[index].dataValue);
        }); 

        flippedCards = []; // empty this array upon shuffle
    }

    document.getElementById("shuffle").addEventListener("click", shuffleImages);
    shuffleImages();

    //Flip card function
    function flipCard() {
        //Adds or removes card from flipped CSS class
        this.classList.add("flipped");
        if (flippedCards.length < 1){ // not yet two flipped cards
            flippedCards.push(this);
        }
        else{
            cardsDup.forEach(card => { 
                card.removeEventListener("click", flipCard);
            })
        }
        console.log(flippedCards);
        // the following does not work as intended!
        // It is supposed to check if the two elements (cards) in the flippedCards array are identical
        // =============================================================================================
        // if (flippedCards[0].getAttribute('data-value') === flippedCards[1].getAttribute('data-value')){
        //     console.log("You got a match!");
        // }
        // else{
        //     console.log("flip back");
        //     // flipBack();
        // }
        //================================================================================================
        
    }
})



