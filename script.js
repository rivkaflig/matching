// Gedolim Matching Game
// Hailey Lazar, Rivka Flig, Leah Feldman
// 3/24/2025

document.addEventListener("DOMContentLoaded", ()=> {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        const gridContainer = document.querySelector(".grid-container");
        const timerElement = document.getElementById("timer");
        let timer;
        let secondsElapsed = 0;
        let gameStarted = false;
    
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
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
        //Duplicate initial card 19 times
        let card = document.querySelector(".card");
        card.addEventListener("click", flipCard);
    
        // Duplicate to get 20 cards
        for (let i = 0; i < 19; i++) {
            // Deep copy - include child elements
            let clone = card.cloneNode(true);
            card.parentNode.appendChild(clone);
                
            // Add duplicated cards to grid
            gridContainer.appendChild(clone);
    
            // Add event listener to each card
            clone.addEventListener("click", flipCard);
        }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Shuffle cards operation for beginning a game and playing again
    // Sets all game stats to zero and resets them when playing again
    
        // HTML collection of all cards after duplicated
        const cardsDup = document.querySelectorAll(".card");
        
        let clickCount = 0;
    
        document.getElementById("click-counter").textContent = `Number of Moves: ${clickCount}`;
    
        function shuffleImages() {
            
            // Reflip all the cards
            for (let card of cardsDup){
                card.classList.remove("flipped");
                card.classList.remove("match-animation");
            }
    
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
            setTimeout(() => { // Timeout so user doesn't see cards changing as they're flipped
                shuffleArray(duplicatedMatches);
                const cardpics = Array.from(document.querySelectorAll(".cardpic"));
                
                // Set each picture to one of the matched pictures and remove it once it has been used
                cardpics.forEach(function (pic, index) {
                    pic.setAttribute("src", duplicatedMatches[index].gadol);
                    pic.setAttribute("alt", duplicatedMatches[index].alt)
                    pic.parentElement.parentElement.setAttribute("data-value", duplicatedMatches[index].dataValue);
                });
            }, 500);
    
            // Empty this array upon shuffle/play again
            flippedCards = [];
            matchedCards = [];
            resetTimer();
    
            // Remove game completion animation
            const popup = document.getElementById('gameOver');
            popup.style.display = 'none';
    
        } // End of shuffleCards
    
        document.getElementById("play-again").addEventListener("click", shuffleImages);
        shuffleImages();
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Flip cards operation for checking if two cards are flipped
    
        // Flip card function
        function flipCard() {
            
            // If card was already clicked
            if (this.classList.contains("flipped") || flippedCards.length === 2) {
                return;
            } 
    
            if(!gameStarted) {
                startTimer();
                gameStarted = true;
            }
    
            // Adds card to flipped CSS class and flippedCards array for match validtion
            this.classList.add("flipped");
            flippedCards.push(this);        
    
            // If there are 2 flipped cards
            if (flippedCards.length === 2) {
                clickCount++;
                document.getElementById("click-counter").textContent = `Number of Moves: ${clickCount}`;
                    
                // Delay flip back
                setTimeout(checkMatch, 1500);
            }
    
        } // End of flipCard
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////  
    // Check match operation for checking if two flipped cards are a match and animations for yes or no
    
        function checkMatch() {
            // Check against each others HTML (will compare attributes, classes, etc.)
            let card1 = flippedCards[0].innerHTML;
            let card2 = flippedCards[1].innerHTML;
    
            if (card1 === card2) {
                showPopupCheck();
    
                // Add the animation class to the matched cards
                flippedCards[0].classList.add("match-animation");
                flippedCards[1].classList.add("match-animation");
    
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

                // Remove animation class
                setTimeout(() => {
                    flippedCards[0].classList.remove("match-animation");
                    flippedCards[1].classList.remove("match-animation");
                }, 1000);
                
                // Move cards to matched cards array
                matchedCards.push(flippedCards[0], flippedCards[1]);
    
                // Clear array so new cards can be flipped
                flippedCards = [];
    
                // checks if game is over
                if (matchedCards.length === cardsDup.length) {
                    gameOver();
                    stopTimer();
                }
            
            // Animations for not a match
            } else { // Not a match
                showPopupX();
                flippedCards[0].classList.add("wrong-animation");
                flippedCards[1].classList.add("wrong-animation");
                setTimeout(flipBack, 1000);                    
            }
    
            // Re-add event listeners for user to be able to click cards
            cardsDup.forEach(card => { 
                card.addEventListener("click", flipCard);
            })
    
            function flipBack() {
                flippedCards[0].classList.remove("flipped");
                flippedCards[1].classList.remove("flipped");
                flippedCards[0].classList.remove("wrong-animation"); // Remove wrong-animation
                flippedCards[1].classList.remove("wrong-animation"); // Remove wrong-animation
                flippedCards = [];   
            }
        
        } // End of checkMatch
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////  
    // Timer for game stats
    
        function startTimer() {
            // Set timer to 00:00
            secondsElapsed = 0;
            timerElement.textContent = `Time: 00:00`;
            
            timer = setInterval(() => {
                secondsElapsed++;
                // Calculate in minutes and seconds
                let minutes = Math.floor(secondsElapsed/60);
                let seconds = secondsElapsed % 60;
                let formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                timerElement.textContent = `Time: ${formattedTime}`;
            }, 1000);
        }
    
        // Stop timer function - called when all 24 cards are match
        function stopTimer() {
            clearInterval(timer);
        }
    
        // Reset timer funvtion - called when user clicks play again
        function resetTimer() {
            clearInterval(timer);
            secondsElapsed = 0;
            timerElement.textContent = `Time: 00:00`;
            gameStarted = false;
        }
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////  
    // Pop up animations for card validation
    
        function showPopupX() {
            // Node to display x
            const popup = document.getElementById('x'); 
            popup.style.setProperty('display', 'block'); // make visible
    
            // Automatically hide after half of a second
            setTimeout(() => {
                popup.style.setProperty('display', 'none');
            }, 500);
        }
    
        function showPopupCheck() {
            // Node to display check
            const popup = document.getElementById('check'); 
            popup.style.setProperty('display', 'block'); // make visible
    
            // Only show for half of a second
            setTimeout(() => {
                popup.style.display = 'none';
            }, 300);
        }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////  
    // Game completed
    
        function gameOver() {
            // Show game completion animation
            const popup = document.getElementById('gameOver');
            setTimeout(() => {
                popup.style.setProperty('display', 'block');
            }, 1000)
    
            // Show for a minute
            setTimeout(() => {
                popup.style.setProperty('display', 'none');
                }, 60000);
        }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////  
    
})
    
