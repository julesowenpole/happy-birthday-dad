let score = 0;
let candleMode = false;

// DOM references
const scoreDisplay = document.getElementById("score");
const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const playAgainButton = document.getElementById("play-again");
const startButton = document.getElementById("start-button");

const cakeSpeed = 3;
const spawnRate = 1000;
let stackedCakes = 0;

// Player position
let playerX = 250;
const playerSpeed = 20;

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

    if (playerX < 0) playerX = 0;

    if (playerX > gameWidth - playerWidth) {
        playerX = gameWidth - playerWidth;
    }

    player.style.left = playerX + "px";
}


// Spawn cakes or candles
function spawnCake() {

    const item = document.createElement("div");

    if (candleMode) {
        item.classList.add("candle");
    } else {
        item.classList.add("cake");
    }

    const gameWidth = gameArea.offsetWidth;
    const randomX = Math.random() * (gameWidth - 40);

    item.style.left = randomX + "px";

    gameArea.appendChild(item);

    let itemY = 0;

    const fallInterval = setInterval(() => {

        itemY += cakeSpeed;
        item.style.top = itemY + "px";

        if (checkCollision(item)) {

            if (item.classList.contains("cake")) {
                catchCake();
            }
            
            if (item.classList.contains("candle")) {
                showBirthdayCard();
            }

            item.remove();
            clearInterval(fallInterval);
            return;
        }

        if (itemY > gameArea.offsetHeight) {
            item.remove();
            clearInterval(fallInterval);
        }

    }, 20);
}

function catchCake() {

    score++;
    stackedCakes++;

    scoreDisplay.textContent = "Score: " + score;

    const stack = document.createElement("div");
    stack.classList.add("stacked-cake");

    const height = stackedCakes * 32;

    stack.style.bottom = 30 + height + "px";

    gameArea.appendChild(stack);

    if (stackedCakes >= 3) {
        candleMode = true;
    }
}

// Start game
let spawnInterval = null;

function initGame() {

    console.log("Game started");

    spawnInterval = setInterval(spawnCake, spawnRate);

    startButton.style.display = "none";
}


// Restart game
function restartGame() {

    score = 0;
    candleMode = false;

    scoreDisplay.textContent = "Score: 0";

    document.querySelectorAll(".cake, .candle").forEach(el => el.remove());

    clearInterval(spawnInterval);

    initGame();
}


// Collision detection
function checkCollision(item) {

    const itemRect = item.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    return !(
        itemRect.bottom < playerRect.top ||
        itemRect.top > playerRect.bottom ||
        itemRect.right < playerRect.left ||
        itemRect.left > playerRect.right
    );
}

function showBirthdayCard() {

    clearInterval(spawnInterval);

    document.getElementById("game-section").classList.add("hidden");
    document.getElementById("card-section").classList.remove("hidden");
}

// Event listeners
document.addEventListener("keydown", movePlayer);
playAgainButton.addEventListener("click", restartGame);
startButton.addEventListener("click", initGame);