document.addEventListener("DOMContentLoaded", ()=> {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const gridContainer = document.querySelector(".grid-container");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const matches = [
        {id: 1, gadol: "Images/R-Chaim.jpg", dataValue: "Rav Chaim Kanievsky", alt: "Rav-Chaim"},
        {id: 2, gadol: "Images/R-Edelstein.jpg", dataValue: "Rav Gershon Edelstein", alt: "Rav-Edelstein"},
        {id: 3, gadol: "Images/R-Elyashiv.jpg", dataValue: "Rav Yosef Shalom Elyashiv", alt: "Rav-Elyashiv"},
        {id: 4, gadol: "Images/R-Feinstein.jpg", dataValue: "Rav Moshe Feinstein", alt: "Rav-Feinstein"},
        {id: 5, gadol: "Images/R-Feldman.jpg", dataValue: "Rav Aharon Feldman", alt: "Rav-Feldman"},
        {id: 6, gadol: "Images/R-Finkel.jpg", dataValue: "Rav Nosson Tzvi Finkel", alt: "Rav-Finkel"},
        {id: 7, gadol: "Images/R-Salomon.jpg", dataValue: "Rav Matisyahu Salomon", alt: "Rav-Salomon"},
        {id: 8, gadol: "Images/R-Shapiro.jpg", dataValue: "Rav Moshe Shapiro", alt: "Rav-Shapiro"},
        {id: 9, gadol: "Images/R-Shteinman.jpg", dataValue: "Rav Aharon Leib Shteinman", alt: "Rav-Sheinman"},
        {id: 10, gadol: "Images/Steipler-Gaon.jpg", dataValue: "The Steipler Gaon - Rav Yaakov Yisrael Kanievsky", alt: "Steipler-Gaon"}
    ];

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Holds flipped cards for match verification - Used in flipCard()
    let flippedCards = [];

    // Holds matched cards
    let matchedCards = [];

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    // HTML collection of element class="card" 
    const cards = document.querySelectorAll(".card");

    // Duplicate "card" class in HTML for 20 cards
    cards.forEach((element => { 

        // Add event listener for original element
        element.addEventListener("click", flipCard);

        // Duplicate for 20 cards
        for (let i = 0; i < 19; i++) {

            // Deep copy - include child elements
            let clone = element.cloneNode(true);
            element.parentNode.appendChild(clone);
            
            // Add dups to grid
            gridContainer.appendChild(clone);


            // Add event listener for clones
            clone.addEventListener("click", flipCard);
        }
    }))

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Updated HTML collection all cards after duplicated
    const cardsDup = document.querySelectorAll(".card"); // updated HTML collection all cards after duplicated
    
    let clickCount = 0;
    document.getElementById("click-counter").textContent = `Number of Moves: ${clickCount}`;


    function shuffleImages() {
        document.getElementById("displayName").textContent = `    `;
            // Reset click counter and 'You found' if Play Again is pressed
            clickCount = 0;
            document.getElementById("click-counter").textContent = `Number of Moves: ${clickCount}`;
        
        
        //Duplicate the matches array so that there are two of each element
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

        // Reflip all the cards
        if (matchedCards.length > 0) {
            for (let i = 0; i <= matchedCards.length; i++) {
                matchedCards[i].classList.remove("flipped");
            }
        } 

        // Empty this array upon shuffle/play again
        flippedCards = [];

    } // End of shuffleCards

//////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById("play-again").addEventListener("click", shuffleImages);
    shuffleImages();


    // Flip card function
    function flipCard() {
        
        // If card was already clicked
        if (this.classList.contains("flipped") || flippedCards.length === 2) {
            return;
        } 

        // Adds card to flipped CSS class and flippedCards array for match validtion
        this.classList.add("flipped");
        flippedCards.push(this);

        // Increment click counter with every card pressed
        clickCount++;
        document.getElementById("click-counter").textContent = `Number of Moves: ${clickCount}`;

        // If there are 2 flipped cards
        if (flippedCards.length === 2) {

            // Prevent user from clicking more cards
            cardsDup.forEach(card => card.removeEventListener("click", flipCard));
                
            // Delay flip back
            setTimeout(checkMatch, 1500);
        }

    } // End of flipCard


///////////////////////////////////////////////////////////////////////////////////////////////////////  

    function checkMatch() {
            
        // Check against each others HTML (will compare attributes, classes, etc.)
        let card1 = flippedCards[0].innerHTML;
        let card2 = flippedCards[1].innerHTML;

        if (card1 === card2) {
            console.log("You got a match!");

            // Get card's string of HTML
            let card = flippedCards[0].innerHTML;

            // Create a temporary container to parse the HTML
            let getGadol = document.createElement("div");
            // Parse the string into an actual element
            getGadol.innerHTML = card; 
        
            // Get data-value value for Gadol's name to display
            let name = getGadol.querySelector(".card-inner")?.getAttribute("data-value");
            console.log(name); 
            document.getElementById("displayName").textContent = `You found ${name}!`;

            // Move cards to matched cards array
            matchedCards.push(flippedCards[0], flippedCards[1]);

            // Clear array so new cards can be flipped
            flippedCards = [];

        
        } else { // Not a match
            console.log("No match! Flipping back...");
            
            // Flip cards back and empty flippedCards array for next set
            flippedCards[0].classList.remove("flipped");
            flippedCards[1].classList.remove("flipped");
            flippedCards = [];                    
        }

        // Re-add event listeners for user to be able to click cards
        cardsDup.forEach(card => { 
            card.addEventListener("click", flipCard);
        })
    
    } // End of checkMatch

})





