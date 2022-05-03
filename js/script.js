//UL list of guessed letters
const guessedLetters = document.querySelector(".guessed-letters");
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

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordProgress.innerText = placeholderLetters.join("");
}

placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = guessInput.value;
    console.log(guess);
    guessInput.value="";
});
