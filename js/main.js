let newGame = document.querySelector(".newgame");
newGame.onclick = () => {
    document.getElementById("start").play();
    document.querySelector(".over-lay").style.display = "none";
}
//show all english char in my page dynamic
const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    lettersContainer.appendChild(span);
});

// object contains all letters and this category
const words={
    programming: ["php", "javascript", "scale", "mysql"],
    movies: ["prestige", "inception", "memento"],
    people: ["albert enistien", "hitchcock", "alexander"],
    countries:["syria" , "palaestine" , "egypt" , "qatar"],
}
// get random keys and value from my object
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValue = randomPropValue[randomValueNumber];

document.querySelector(".category span").innerHTML = randomPropName;
// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");
//convert the random value we get to array 
let lettersAndSpace = Array.from(randomValue);
// add empty span by the length of the letter and add class space in letter has aspace
lettersAndSpace.forEach(letter => {
    let span = document.createElement("span");
    //if letter is space
    if (letter === " ") {
        span.className = "space";
    }
    lettersGuessContainer.appendChild(span);
});
let allSpan = document.querySelectorAll(".letters-guess span");
let wrongCount = 0;
// get number of space from my word if has aspace
let spaceCount = lettersAndSpace.filter((letter) => letter === " ").length;
let successCount = spaceCount;
let theDraw = document.querySelector(".hangman-draw");

//action click on letters

document.addEventListener("click", e => {
    let stat = false;
    if (e.target.className === "letter-box") {
        e.target.classList.add("click");
        let letterClick = e.target.innerHTML.toLowerCase();
        lettersAndSpace.forEach((letter, index) => {
            if (letterClick === letter) {
                successCount++;

                stat = true;
                allSpan.forEach((span, spanIndex) => {
                    if (spanIndex === index) {
                        span.innerHTML = letterClick;
                    }
                });
            }
        });
        // if letter is wrong
        if (stat !== true) {
            document.getElementById("error").play();
            wrongCount++;
            // add class wrong to my draw
            theDraw.classList.add(`wrong-${wrongCount}`);
            if (wrongCount === 8) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Good Luck The Word Is  (${randomValue})`,
                });
                lettersContainer.classList.add("finish");
                tryAgain();
            }
        } else {
            document.getElementById("success").play();
            console.log(lettersAndSpace.length)
            console.log(successCount)
            if (lettersAndSpace.length === successCount) {
                Swal.fire({
                    icon: 'success',
                    title: 'very good',
                    text: `Your Wrong Tries is (${wrongCount})`,
                });
                tryAgain();
            }
        }
    }
});
// function to try new game
function tryAgain() {
    document.querySelector(".again").style.display = "block";
    document.querySelector(".again").onclick=()=>window.location.reload();
}



