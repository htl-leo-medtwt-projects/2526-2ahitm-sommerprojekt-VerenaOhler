let PLAYER = {
    box: document.getElementById('playerBox'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0,
    spriteDirection: 1,
    pointCount: 0
};

let winPage = document.getElementById('winbtn');
let loosePage = document.getElementById('loosebtn');

let playerX = 0;
let playerY = 0;
let canJump = true;
let isCharacterEquipped = false;

let GAME_CONFIG = {
    gameSpeed: 24,
    characterSpeed: 5
};

let velocityY = 0;
let gravity = 0.7;
let isOnGround = false;
let groundLevel = 473;

let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false,
    space: false,
    a: false,
    d: false,
    f : false
};

document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (e.key === "ArrowLeft") KEY_EVENTS.leftArrow = true;
    if (e.key === "ArrowUp") KEY_EVENTS.upArrow = true;
    if (e.key === "ArrowRight") KEY_EVENTS.rightArrow = true;
    if (e.key === "ArrowDown") KEY_EVENTS.downArrow = true;
    if (e.code === "Space") KEY_EVENTS.space = true;
    if (e.key === "a") KEY_EVENTS.a = true;
    if (e.key === "d") KEY_EVENTS.d = true;
    if (e.key === "f") KEY_EVENTS.f = true;
}

function keyListenerUp(e) {
    if (e.key === "ArrowLeft") KEY_EVENTS.leftArrow = false;
    if (e.key === "ArrowUp") KEY_EVENTS.upArrow = false;
    if (e.key === "ArrowRight") KEY_EVENTS.rightArrow = false;
    if (e.key === "ArrowDown") KEY_EVENTS.downArrow = false;
    if (e.code === "Space") KEY_EVENTS.space = false;
    if (e.key === "a") KEY_EVENTS.a = false;
    if (e.key === "d") KEY_EVENTS.d = false;
    if (e.key === "f") KEY_EVENTS.f = false;
}


function movePlayer(x, y, direction) {
    playerX += x;
    playerY += y;

    if (PLAYER.box) {
        PLAYER.box.style.left = playerX + 'px';
        PLAYER.box.style.top = playerY + 'px';
    }

    if (direction !== 0 && PLAYER.spriteImg) {
        if (direction !== PLAYER.spriteDirection) {
            PLAYER.spriteDirection = direction;
            PLAYER.spriteImg.style.transform =
                direction === 1 ? "scaleX(1)" : "scaleX(-1)";
        }
    }
}


function startGame() {
    if (!PLAYER.box) {
        console.error("playerBox not found in HTML");
        return;
    }

    playerX = 50;
    playerY = 500;

    PLAYER.box.style.left = playerX + 'px';
    PLAYER.box.style.top = playerY + 'px';

    if (PLAYER.spriteImg) {
        PLAYER.spriteImg.style.right = "0px";
    }

    gameLoop();
}


function animatePlayer() {
    if (!PLAYER.spriteImg) return;

    if (PLAYER.spriteImgNumber < 4) {
        PLAYER.spriteImgNumber++;

        let x = parseFloat(PLAYER.spriteImg.style.right);
        //if (isNaN(x)) x = 0;

        x += 37;
        PLAYER.spriteImg.style.right = x + "px";
    } else {    
        PLAYER.spriteImg.style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
}


function gameLoop() {
    if (KEY_EVENTS.leftArrow || KEY_EVENTS.a) {
        movePlayer(-GAME_CONFIG.characterSpeed, 0, -1);
    }

    if (KEY_EVENTS.rightArrow || KEY_EVENTS.d) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
    }

    if (KEY_EVENTS.f) {
        console.log("F key pressed - action can be implemented here");
    }

    velocityY += gravity;
    playerY += velocityY;

    if (playerY >= groundLevel) {
        playerY = groundLevel;
        velocityY = 0;
        isOnGround = true;
    } else {
        isOnGround = false;
    }

    if (KEY_EVENTS.space && isOnGround && canJump) {
        velocityY = -13;
        canJump = false;
    }

    if (!KEY_EVENTS.space) {
        canJump = true;
    }

    if (PLAYER.box) {
        PLAYER.box.style.top = playerY + 'px';
    }
    setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}

function win() {
    if (winPage) winPage.style.display = 'block';
}

function loose() {
    if (loosePage) loosePage.style.display = 'block';
}

startGame();