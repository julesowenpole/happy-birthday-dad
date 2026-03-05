let score = 0;

// DOM references
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const cardSection = document.getElementById("card-section");
const gameSection = document.getElementById("game-section");
const playAgainButton = document.getElementById("play-again");
const cakeSpeed = 3;
const spawnRate = 1000;


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

function spawnCake() {

    const cake = document.createElement("div");
    cake.classList.add("cake");

    const gameWidth = gameArea.offsetWidth;

    const randomX = Math.random() * (gameWidth - 40);
    cake.style.left = randomX + "px";

    gameArea.appendChild(cake);

    let cakeY = 0;

    const fallInterval = setInterval(() => {

        cakeY += cakeSpeed;
        cake.style.top = cakeY + "px";
    
        if (checkCollision(cake)) {
    
            score++;
            scoreDisplay.textContent = "Score: " + score;
    
            cake.remove();
            clearInterval(fallInterval);
            return;
        }
    
        if (cakeY > gameArea.offsetHeight) {
            cake.remove();
            clearInterval(fallInterval);
        }
    
    }, 20);
}

// Event listeners
document.addEventListener("keydown", movePlayer);
playAgainButton.addEventListener("click", restartGame);

const startButton = document.getElementById("start-button");

let spawnInterval = null;

function initGame() {

    console.log("Game started");

    spawnInterval = setInterval(spawnCake, spawnRate);

    startButton.style.display = "none";
}

startButton.addEventListener("click", initGame);

// Start game
function initGame() {
    console.log("Game initialized");

    setInterval(spawnCake, spawnRate);
}

function checkCollision(cake) {

    const cakeRect = cake.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    return !(
        cakeRect.bottom < playerRect.top ||
        cakeRect.top > playerRect.bottom ||
        cakeRect.right < playerRect.left ||
        cakeRect.left > playerRect.right
    );
}