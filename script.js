// Game state
let score = 0;

// DOM references
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const cardSection = document.getElementById("card-section");
const gameSection = document.getElementById("game-section");
const playAgainButton = document.getElementById("play-again");


// Initialize game
function initGame() {
    console.log("Game initialized");
}


// Spawn falling cake
function spawnCake() {
    console.log("Cake spawned");
}


// Move player
function movePlayer(event) {
    console.log("Player moved:", event.key);
}


// Check collision
function checkCollision() {
    console.log("Checking collision");
}


// End game and show card
function showBirthdayCard() {
    gameSection.classList.add("hidden");
    cardSection.classList.remove("hidden");
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