document.addEventListener("DOMContentLoaded", ()=> {

    const matches = [
        {id: 1, gadol: "Images/R-Chaim.jpg"},
        {id: 2, gadol: "Images/R-Edelshtein.jpg"},
        {id: 3, gadol: "Images/R-Elyashiv.jpg"},
        {id: 4, gadol: "Images/R-Feinstein.jpg"},
        {id: 5, gadol: "Images/R-Feldmen.jpg"},
        {id: 6, gadol: "Images/R-Finkel.jpg"},
        {id: 7, gadol: "Images/R-Salomon.jpg"},
        {id: 8, gadol: "Images/R-Shapiro.jpg"},
        {id: 9, gadol: "Images/R-Shteinman.jpg"},
        {id: 10, gadol: "Images/Steipler-Gaon.jpg"}
    ];

    const matchElements = document.querySelectorAll(".match"); // HTML collection of elements whose class="match" 
    
    //duplicate elements
    matchElements.forEach((element) => {
        let clone = element.cloneNode(true);
        element.parentNode.appendChild(clone);
    })

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
        
        const pictures = Array.from(document.querySelectorAll(".match"));
        //set each picture to one of the matched pictures and remove it once it has been used
        pictures.forEach(function (pic) {
            pic.setAttribute("src", duplicatedMatches.pop().gadol);
        });
    }
    document.getElementById("shuffle").addEventListener("click", shuffleImages);

})

//Flip card function
function flipCard(card) {
    //Adds or removes card from flipped CSS class
    card.classList.toggle("flipped");
}

