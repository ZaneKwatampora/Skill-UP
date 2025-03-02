const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");
const winCountEl = document.getElementById("winCount");
const lossCountEl = document.getElementById("lossCount");

let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

// Function to reset game
const resetGame = () => {
    correctLetters = new Set();
    wrongGuessCount = 0;
    hangmanImage.src = `assets/hangman-0.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    keyboardDiv.innerHTML = "";

    for (let i = 97; i <= 122; i++) {
        const button = document.createElement('button');
        button.innerText = String.fromCharCode(i);
        button.setAttribute("data-key", button.innerText); // Store key in attribute
        button.addEventListener('click', (e) => startGame(e.target, button.innerText));
        keyboardDiv.appendChild(button);
    }

    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");

    gameModal.classList.remove('show');
};

// Function to get the words you will guess
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase();

    document.querySelector(".hint-text b").innerHTML = hint;
    resetGame();
};

// Saving your wins and losses to the local storage
let winCount = localStorage.getItem("winCount") ? parseInt(localStorage.getItem("winCount")) : 0;
let lossCount = localStorage.getItem("lossCount") ? parseInt(localStorage.getItem("lossCount")) : 0;
winCountEl.innerText = winCount;
lossCountEl.innerText = lossCount;

// Function to check if you won or lost
const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector('img').src = `assets/${isVictory ? 'victory' : 'lost'}.gif`;
        gameModal.querySelector('h4').innerText = isVictory ? 'Congrats!' : 'Game Over!';
        gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add('show');

        if (isVictory) {
            winCount++;
        } else {
            lossCount++;
        }

        // Save to localStorage
        localStorage.setItem("winCount", winCount);
        localStorage.setItem("lossCount", lossCount);

        // Update UI
        winCountEl.innerText = winCount;
        lossCountEl.innerText = lossCount;
    }, 300);
};

// Function to start
const startGame = (button, clickedLetter) => {
    if (button) button.disabled = true; // Disable clicked button
    clickedLetter = clickedLetter.toLowerCase();

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.add(letter);
                wordDisplay.querySelectorAll('li')[index].innerText = letter;
                wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `assets/hangman-${wrongGuessCount}.svg`;
    }

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    checkGameStatus();
};

// Confirming you won or lost
const checkGameStatus = () => {
    const allLettersRevealed = [...wordDisplay.querySelectorAll('li')].every(li => li.innerText !== "");
    if (allLettersRevealed) gameOver(true);
    if (wrongGuessCount === maxGuesses) gameOver(false);
};

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    const pressedKey = e.key.toLowerCase();
    if (pressedKey >= "a" && pressedKey <= "z") {
        const button = keyboardDiv.querySelector(`button[data-key="${pressedKey}"]`);
        if (button && !button.disabled) {
            startGame(button, pressedKey);
        }
    }
});

// Starting the game with a random word
getRandomWord();

// Play again button
playAgainBtn.addEventListener("click", getRandomWord);
