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

    const cards = document.querySelectorAll(".card"); // HTML collection of elements whose class="card" 
    //duplicate elements
    cards.forEach((element) => { 
        let clone = element.cloneNode(true); // deep copy - include child elements
        element.parentNode.appendChild(clone);
    })

    const cardsDup = document.querySelectorAll(".card"); // updated HTML collection all cards after duplicated
    cardsDup.forEach((element => {
        element.addEventListener("click", flipCard);
    }))

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
        });
    }
    document.getElementById("shuffle").addEventListener("click", shuffleImages);

})

//Flip card function
function flipCard() {
    //Adds or removes card from flipped CSS class
    this.classList.toggle("flipped");
}

