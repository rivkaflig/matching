document.addEventListener("DOMContentLoaded", ()=> {

//////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Holds flipped cards for match verification - Used in flipCard()
    let flippedCards = [];

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    // HTML collection of element class="card" 
    const cards = document.querySelectorAll(".card");

    // Duplicate "card" class in HTML for 20 cards
    cards.forEach((element => { 

        // Add event listener for original element
        element.addEventListener("click", flipCard);

        // Duplicate for 20 cards
        for (let i =0; i < 19; i++){

            // Deep copy - include child elements
            let clone = element.cloneNode(true);
            element.parentNode.appendChild(clone);

            // Add event listener for clones
            clone.addEventListener("click", flipCard);
        } // End of for loop

    })) // End of duplication

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Updated HTML collection all cards after duplicated
    const cardsDup = document.querySelectorAll(".card");
    
    function shuffleImages() {

        // Duplicate the matches array so that there are two of each element
        const duplicatedMatches = [...matches, ...matches];
        
        // Shuffle the array with the fisher yates algorithm
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Shuffle the array of matches
        shuffleArray(duplicatedMatches);
        
        
        const cardpics = Array.from(document.querySelectorAll(".cardpic"));
        
        // Set each picture to one of the matched pictures and remove it once it has been used
        cardpics.forEach(function (pic, index) {
            pic.setAttribute("src", duplicatedMatches[index].gadol);
            pic.setAttribute("alt", duplicatedMatches[index].alt)
            pic.parentElement.parentElement.setAttribute("data-value", duplicatedMatches[index].dataValue);
        }); 

        // Empty this array upon shuffle
        flippedCards = [];
    }

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById("shuffle").addEventListener("click", shuffleImages);
    shuffleImages();

    //Flip card function
    function flipCard() {
        
        // If card was already clicked
        if (this.classList.contains("flipped")) {
            // Don't let user double click a card otherwise they can't flip a 2nd card
            this.removeEventListener("click", flipCard);

        } else { 
            // Adds or removes card from flipped CSS class
            this.classList.add("flipped");

            // Not yet two flipped cards
            if (flippedCards.length < 1) {
                flippedCards.push(this);
            
            } else {
                // Don't allow more than two cards to be flipped
                cardsDup.forEach(card => { 
                    card.removeEventListener("click", flipCard);
                })
            }
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



