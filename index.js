

// HANGMAN

const hangman = document.getElementById('hangManLink');

function showHangmanInfo() {

  if (!document.getElementById('hangmanInfo')) {
    let info1 = document.createElement('p');
    info1.innerText = 'A word-guessing game where players try to reveal a hidden word by guessing letters before running out of attempts.';
    info1.id = 'hangmanInfo';

    hangman.appendChild(info1);
  };
};

function hideHangmanInfo() {
  const info1 = document.getElementById('hangmanInfo');
  if (info1) {
    info1.remove();
  };
};

// MINESWEEPER

const mineSweeper = document.getElementById('mineSweeperLink');

function showMineSweeperInfo() {

  if (!document.getElementById('MineSweeperInfo')) {
    let info1 = document.createElement('p');
    info1.innerText = 'A puzzle game where players uncover tiles on a grid, avoiding hidden mines while using numbered hints to locate them.';
    info1.id = 'MineSweeperInfo';

    mineSweeper.appendChild(info1);
  };
};

function hideMineSweeperInfo() {
  const info1 = document.getElementById('MineSweeperInfo');
  if (info1) {
    info1.remove();
  };
};

// PING PONG

const pong = document.getElementById('pongLink');

function showPongInfo() {

  if (!document.getElementById('pongInfo')) {
    let info1 = document.createElement('p');
    info1.innerText = 'A classic table tennis simulation where players control paddles to bounce a ball back and forth, aiming to score points by getting the ball past their opponent.';
    info1.id = 'pongInfo';

    pong.appendChild(info1);
  };
};

function hidePongInfo() {
  const info1 = document.getElementById('pongInfo');
  if (info1) {
    info1.remove();
  };
};

// Rock Paper Scissors

const rps = document.getElementById('rpsLink');

function showRpsInfo() {

  if (!document.getElementById('rpsInfo')) {
    let info1 = document.createElement('p');
    info1.innerText = "A simple hand game where players choose rock, paper, or scissors, with each option beating, losing to, or tying with another.";
    info1.id = 'rpsInfo';

    rps.appendChild(info1);
  };
};

function hideRpsInfo() {
  const info1 = document.getElementById('rpsInfo');
  if (info1) {
    info1.remove();
  };
};

// Tic Tac Toe
const ttt = document.getElementById('tttLink');

function showTttInfo() {
  if (!document.getElementById('tttInfo')) {
    let info1 = document.createElement('p');
    info1.innerText = "A turn-based game where two players place Xs and Os on a 3×3 grid, aiming to form a row, column, or diagonal.";
    info1.id = 'tttInfo';

    ttt.appendChild(info1);
  };
};

function hideTttInfo() {
  const info1 = document.getElementById('tttInfo');
  if (info1) {
    info1.remove();
  };
};

// Whac-A-Mole

const whac = document.getElementById('whacLink');

function showWhacInfo() {

  if (!document.getElementById('whacInfo')) {
    let info1 = document.createElement('p');
    info1.innerText = " A reflex-based arcade game where players use a mallet to hit moles that pop up from holes before they disappear.";
    info1.id = 'whacInfo';

    whac.appendChild(info1);
  };
};

function hideWhacInfo() {
  const info1 = document.getElementById('whacInfo');
  if (info1) {
    info1.remove();
  };
};

// GAME API SECTION
// Fetch Games from RAWG API'
const API_KEY = '98d4a81fbfaf47279274b3bbb1a16c94'
const gameListEl = document.getElementById("game-list");
const searchInput = document.getElementById("searchInput");

async function getGames(query = "") {
  try {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-01-01,2022-12-31&ordering=-added`;

    if (query) {
      url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${query}&ordering=-added`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
}

// Display Games in the UI
function displayGames(games) {
  gameListEl.innerHTML = "";

  if (games.length === 0) {
    gameListEl.innerHTML = "<p>No games found. Try a different search.</p>";
    return;
  }

  games.forEach((game) => {
    const gameItemEl = document.createElement("li");
    gameItemEl.classList.add("game-item");

    const gameImageEl = document.createElement("img");
    gameImageEl.src = game.background_image;
    gameImageEl.alt = game.name;

    const gameTitleEl = document.createElement("h2");
    gameTitleEl.innerText = game.name;

    const gameButtonEl = document.createElement("button");
    gameButtonEl.innerHTML = "Save Game";
    gameButtonEl.addEventListener("click", function () {
      saveGame(game);
    });

    gameItemEl.appendChild(gameImageEl);
    gameItemEl.appendChild(gameTitleEl);
    gameItemEl.appendChild(gameButtonEl);
    gameListEl.appendChild(gameItemEl);
  });
}

function saveGame(game) {
  let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

  if (!savedGames.some((saved) => saved.id === game.id)) {
    savedGames.push(game);
    localStorage.setItem("savedGames", JSON.stringify(savedGames));
  }
}

// Search Games Function
async function searchGames() {
  const query = searchInput.value;
  const games = await getGames(query);
  displayGames(games);
}

async function loadApp() {
  const games = await getGames();
  displayGames(games);
}

loadApp();
