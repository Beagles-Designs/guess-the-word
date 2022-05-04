//UL list of guessed letters
const guessedLettersUL = document.querySelector(".guessed-letters");
//Button with the text guess
const guessButton = document.querySelector(".guess");
//text input
const guessInput = document.querySelector(".guess-form input");
//In progress word Paragraph
const wordProgress = document.querySelector(".word-in-progress");
//remaining guesses P
const remainingGuessesP = document.querySelector(".remaining");
//span inside remaining guesses P
const remainingGuessesSpan = document.querySelector("span");
//Messages to player
const messages = document.querySelector(".message");
//Hidden play again button 
const playAgainButton = document.querySelector(".play-again");


//Starting Word
let word = "magnolia";
//Empty Array for the guessed letters
const guessedLetters = [];
//Variable for number of guesses left
let remainingGuesses = 8;


// get word API 
const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await request.text();
    const wordsArray = data.split("\n");
    const randomIndex = Math.floor(Math.random()* wordsArray.length);
    word = wordsArray[randomIndex].trim();
    console.log(word);
    placeholder(word);
};

//Start the Game! 
getWord();

//Create placeholder circles for each letter of the solution word
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word){
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
}

//Initiate function when the Guess button is clicked
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessInput.value;
    // console.log(guess);
    guessInput.value=""; //Reset Input to empty
    messages.innerText=""; //Reset Message to empty
    const validGuess = inputCheck(guess); //check the input to be valid
    //console.log(validGuess);
    if (typeof validGuess !== "undefined") {
        //After input is checked, and if it is not undefined; run the makeGuess function.
        makeGuess(validGuess);
    }
});

//Function to validate the input as a single Letter
const inputCheck = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) { 
        //is the input empty?
        messages.innerText = "You need to guess something silly!";
    }   else if (input.length > 1 ){
        //Did you type more than one letter?
        messages.innerText = "Only one letter at a time! tsk tsk";
    } else if (!input.match(acceptedLetter)) {
        //Did you enter something that ISNT a letter?
        messages.innerText = "You need to guess a LETTER";
    } else {
        return input;
    }
};

//If input is valid; run the makeGuess function
const makeGuess = function (guess) {
    const upperGuess = guess.toUpperCase();

    if (guessedLetters.includes(upperGuess)) {
        //Check that the letter hasn't been guessed yet.
        messages.innerText = `You've already guessed ${upperGuess}. Try Something new...`;
    } else {
        //if it is a new guess; Add it to the Guessed Array and update all guess functions.
        guessedLetters.push(upperGuess);
        showGuess();
        countGuesses(upperGuess);
        updateWordInProgress(guessedLetters); 
        didIWin();   
    }
    console.log(guessedLetters);
        
};

const showGuess = function () {
    guessedLettersUL.innerText="";
    for (let letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersUL.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord =[];
    for (const letter of wordArray) {
        if(guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    console.log(revealWord);
    wordProgress.innerText = revealWord.join("");
}

const countGuesses = function(guess){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);
    if(wordArray.includes(guess)) {
        messages.innerText = `Got one!`;
    } else {
        messages.innerText = `Sorry ${guess} is not in the word.`;
        remainingGuesses -= 1;
    };

    if (remainingGuesses > 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    } else if  (remainingGuesses === 1) {
        remainingGuessesP.innerHTML = `Only <span>1 guess</span> remaining!`;
    }
    else if (remainingGuesses === 0) {
        messages.innerText = `Sorry! You've run out of guesses. Game Over.`;
        guessButton.classList.add("hide");
        playAgainButton.classList.remove("hide");
    };
};


const didIWin = function(){
    const wordUpper = word.toUpperCase();
    if (word.toUpperCase() === wordProgress.innerText) {
        messages.classList.add("win");
        messages.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};



