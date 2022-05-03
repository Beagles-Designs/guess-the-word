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
const remainingGuesses = document.querySelector("p .remaining span");
//Messages to player
const messages = document.querySelector(".message");
//Hidden play again button 
const playAgainButton = document.querySelector(".play-again");
//Starting Word
const word = "magnolia";
//Empty Array for the guessed letters
const guessedLetters = [];

//Create placeholder circles for each letter of the solution word
const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
}
placeholder(word);

//Initiate function when the Guess button is clicked
guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessInput.value;
    // console.log(guess);
    guessInput.value="";
    messages.innerText="";
    const validGuess = inputCheck(guess);
    // console.log(validGuess);
    if (typeof validGuess !== "undefined") {
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

const makeGuess = function (letter) {
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.includes(upperLetter)) {
        messages.innerText = `You've already guessed ${upperLetter}. Try Something new...`;
    } else {
        guessedLetters.push(upperLetter);    
    }
    console.log(guessedLetters);
        
};