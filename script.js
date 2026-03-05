let score = 0;

// DOM references
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const cardSection = document.getElementById("card-section");
const gameSection = document.getElementById("game-section");
const playAgainButton = document.getElementById("play-again");


// Player position
let playerX = 250;
const playerSpeed = 20;


// Initialize game
function initGame() {
    console.log("Game initialized");
}


// Move player
function movePlayer(event) {

    const gameWidth = gameArea.offsetWidth;
    const playerWidth = player.offsetWidth;

    if (event.key === "ArrowLeft") {
        playerX -= playerSpeed;
    }

    if (event.key === "ArrowRight") {
        playerX += playerSpeed;
    }

    // Prevent leaving game area
    if (playerX < 0) playerX = 0;
    if (playerX > gameWidth - playerWidth) {
        playerX = gameWidth - playerWidth;
    }

    player.style.left = playerX + "px";
}


// Restart game
function restartGame() {
    console.log("Restarting game");
}


// Event listeners
document.addEventListener("keydown", movePlayer);
playAgainButton.addEventListener("click", restartGame);


// Start game
initGame();