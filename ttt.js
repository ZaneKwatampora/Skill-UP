document.addEventListener("DOMContentLoaded", init);

function init() {
    const playerTitle = document.querySelector(".playerTitle");
    const rematchBtn = document.querySelector(".rematch");
    const items = document.querySelectorAll(".item");
    const gridArray = Array.from(items);
    let tracking = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let currentPlayer = "playerX";
    
    let scores = JSON.parse(localStorage.getItem("scores")) || { player: 0, computer: 0, draws: 0 };
    updateScoreboard();

    items.forEach((item) =>
        item.addEventListener("click", (e) => {
            const index = gridArray.indexOf(e.target);
            if (items[index].classList.contains("playerX") || items[index].classList.contains("computer")) {
                return;
            }

            // Player Move
            items[index].classList.add("playerX");
            tracking.splice(tracking.indexOf(index + 1), 1);

            if (winCheck("playerX", items)) {
                playerTitle.innerHTML = "You Won!";
                scores.player++;
                endGame();
                return;
            }

            if (tracking.length === 0) {
                playerTitle.innerHTML = "It's a Draw!";
                scores.draws++;
                endGame();
                return;
            }

            // Computer Move (Smart AI)
            const computerIndex = getBestMove(tracking, items);
            items[computerIndex].classList.add("computer");
            tracking.splice(tracking.indexOf(computerIndex + 1), 1);

            if (winCheck("computer", items)) {
                playerTitle.innerHTML = "Computer Won!";
                scores.computer++;
                endGame();
                return;
            }
        })
    );

    rematchBtn.addEventListener("click", () => {
        location.reload();
    });

    function winCheck(player, items) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]  // Diagonals
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => items[index].classList.contains(player))
        );
    }

    function getBestMove(tracking, items) {
        function canWin(player, index) {
            items[index].classList.add(player);
            const isWinning = winCheck(player, items);
            items[index].classList.remove(player);
            return isWinning;
        }

        for (let i = 0; i < tracking.length; i++) {
            let move = tracking[i] - 1;
            if (canWin("computer", move)) return move;
        }

        for (let i = 0; i < tracking.length; i++) {
            let move = tracking[i] - 1;
            if (canWin("playerX", move)) return move;
        }

        return tracking[Math.floor(Math.random() * tracking.length)] - 1;
    }

    function endGame() {
        document.body.classList.add("over");
        localStorage.setItem("scores", JSON.stringify(scores));
        updateScoreboard();
        items.forEach(item => item.style.pointerEvents = "none");
    }

    function updateScoreboard() {
        document.querySelector(".player-score").textContent = scores.player;
        document.querySelector(".computer-score").textContent = scores.computer;
        document.querySelector(".draw-score").textContent = scores.draws;
    }
}
