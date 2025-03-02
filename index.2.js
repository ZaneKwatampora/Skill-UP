import { API_KEY } from "./config.js";

// GAME API SECTION
// Fetch Games from RAWG API
const gameListEl = document.getElementById("game-list");
const searchInput = document.getElementById("searchInput");

async function getGames(query = "") {
  try {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}`
    // let url = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-01-01,2022-12-31&ordering=-added`;

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
    
    const gameDomainEl = document.createElement('a');
    if (game.stores && game.stores.length > 0) {
      const store = game.stores[0].store;
  
      gameDomainEl.href = `https://${store.domain}`;
      gameDomainEl.target = "_blank";
      gameDomainEl.rel = "noopener noreferrer";
      gameDomainEl.innerText = `Buy ${game.name}`; 
  } 


    const gameButtonEl = document.createElement("button");
    gameButtonEl.innerHTML = "Save Game";
    gameButtonEl.addEventListener("click", function () {
      saveGame(game);
    });

    gameItemEl.appendChild(gameImageEl);
    gameItemEl.appendChild(gameTitleEl);
    gameItemEl.appendChild(gameDomainEl);
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
