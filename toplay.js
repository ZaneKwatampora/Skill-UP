document.addEventListener("DOMContentLoaded", function () {
    const savedGamesListEl = document.getElementById("saved-games-list");
    let savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];

    function displaySavedGames() {
        savedGamesListEl.innerHTML = "";

        if (savedGames.length === 0) {
            savedGamesListEl.innerHTML = "<p>No saved games yet.</p>";
            return;
        }

        savedGames.forEach((game) => {
            const gameItemEl = document.createElement("li");
            gameItemEl.classList.add("game-item");

            const gameImageEl = document.createElement("img");
            gameImageEl.src = game.background_image;
            gameImageEl.alt = game.name;

            const gameTitleEl = document.createElement("h2");
            gameTitleEl.innerText = game.name;

            const removeButtonEl = document.createElement("button");
            removeButtonEl.innerHTML = "Remove Game";
            removeButtonEl.addEventListener("click", function () {
                removeGame(game.id);
            });

            gameItemEl.appendChild(gameImageEl);
            gameItemEl.appendChild(gameTitleEl);
            gameItemEl.appendChild(removeButtonEl);
            savedGamesListEl.appendChild(gameItemEl);
        });
    }

    function removeGame(gameId) {
        savedGames = savedGames.filter((game) => game.id !== gameId);
        localStorage.setItem("savedGames", JSON.stringify(savedGames));
        displaySavedGames();
    }

    displaySavedGames();
});
