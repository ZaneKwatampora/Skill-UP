// Get elements
let playerCount = document.getElementById('playerCount');
let computerCount = document.getElementById('computerCount');
let drawCount = document.getElementById('drawCount');
let gamesPlayed = document.getElementById('gamesPlayed');

// New round tracking elements
let playerRoundsWon = document.getElementById('playerRoundsWon');
let computerRoundsWon = document.getElementById('computerRoundsWon');
let roundsPlayed = document.getElementById('roundsPlayed');

let computerChoices = ['rock', 'paper', 'scissors'];

// Get a random choice for the computer
function getComputerChoice() {
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

// Main function for the game
function buttonChoice(playerChoice) {
    let computerChoice = getComputerChoice();
    gamesPlayed.innerText = parseInt(gamesPlayed.innerText) + 1; // Increase total games played

    if (playerChoice === computerChoice) {
        drawCount.innerText = parseInt(drawCount.innerText) + 1; // It's a draw
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        playerCount.innerText = parseInt(playerCount.innerText) + 1; // Player wins the round
    } else {
        computerCount.innerText = parseInt(computerCount.innerText) + 1; // Computer wins the round
    }
    checkRoundWinner();
}

// Check who won the round and reset scores for the next round
function checkRoundWinner() {
    let playerScore = parseInt(playerCount.innerText) || 0;
    let computerScore = parseInt(computerCount.innerText) || 0;
    let drawScore = parseInt(drawCount.innerText) || 0;

    if (playerScore >= 3 || computerScore >= 3 || drawScore >= 3) {
        // Initialize rounds if not set
        let rounds = parseInt(localStorage.getItem("roundsPlayed")) || 0;
        rounds++;
        localStorage.setItem("roundsPlayed", rounds);
        roundsPlayed.innerText = rounds;

        let result;
        if (playerScore > computerScore) {
            let playerRounds = parseInt(localStorage.getItem("playerRoundsWon")) || 0;
            playerRounds++;
            localStorage.setItem("playerRoundsWon", playerRounds);
            playerRoundsWon.innerText = playerRounds;
            result = "win";
        } else if (computerScore > playerScore) {
            let computerRounds = parseInt(localStorage.getItem("computerRoundsWon")) || 0;
            computerRounds++;
            localStorage.setItem("computerRoundsWon", computerRounds);
            computerRoundsWon.innerText = computerRounds;
            result = "loss";
        } else {
            let drawnRounds = parseInt(localStorage.getItem("roundsDrawn")) || 0;
            drawnRounds++;
            localStorage.setItem("roundsDrawn", drawnRounds);
            roundsDrawn.innerText = drawnRounds;
            result = "draw";
        }

        showModal(result, result === "win");

        resetRound(); // Reset round scores
    }
}


// Win or loss popup
function showModal(result, isVictory) {
    const gameModal = document.getElementById("gameModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalMessage = document.getElementById("modalMessage");
    const modalImage = document.getElementById("modalImage");

    if (result === "draw") {
        modalTitle.innerText = "It's a Draw!";
        modalMessage.innerText = "Try again!";
        modalImage.src = "assets/draw.gif";
    } else if (isVictory) {
        modalTitle.innerText = "You Win!";
        modalMessage.innerText = "Great job!";
        modalImage.src = "assets/victory.gif";
    } else {
        modalTitle.innerText = "You Lost!";
        modalMessage.innerText = "Better luck next time!";
        modalImage.src = "assets/lost.gif";
    }

    gameModal.style.display = "flex";
}

function closeModal() {
    document.getElementById("gameModal").style.display = "none";
}



// Reset only the round
function resetRound() {
    playerCount.innerText = 0;
    computerCount.innerText = 0;
    drawCount.innerText = 0;
}

function loadGameData() {
    playerRoundsWon.innerText = localStorage.getItem("playerRoundsWon") || 0;
    computerRoundsWon.innerText = localStorage.getItem("computerRoundsWon") || 0;
    roundsDrawn.innerText = localStorage.getItem("roundsDrawn") || 0;
    roundsPlayed.innerText = localStorage.getItem("roundsPlayed") || 0;
}

// Run this function when the page loads
window.onload = loadGameData;
