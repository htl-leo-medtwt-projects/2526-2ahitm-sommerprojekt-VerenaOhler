let previewContainer = document.getElementById("tutorialPreview-container");
let tutorialContainer = document.getElementById("tutorial-explainationContainer");

let winPage = document.getElementById('winbtn');
let loosePage = document.getElementById('loosebtn');

let PLAYER = {
    box: document.getElementById('playerBox'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0,
    spriteDirection: 1,
    pointCount: 0
};

let playerX = 0;
let playerY = 0;
let canJump = true;
let isCharacterEquipped = false;

// let buySound = new Howl({
//     src: ['./sounds/mixkit-winning-a-coin-video-game-2069.wav'], // fixed path (safer)
//     volume: 0.5
// });

// let plattforms = [
//     { x: 0, y: 540, width: 1150, height: 20 }, // ground
//     { x: 200, y: 400, width: 100, height: 20 },
//     { x: 400, y: 300, width: 100, height: 20 },
//     { x: 600, y: 200, width: 100, height: 20 },
//     { x: 800, y: 100, width: 100, height: 20 },
// ];

let sfx = {
    buy: new Howl({
        src: ['sounds/mixkit-winning-a-coin-video-game-2069.wav'], // fixed path (safer)
        volume: 0.5
    }),
}

let GAME_CONFIG = {
    gameSpeed: 24,
    characterSpeed: 5
};

let velocityY = 0;
let gravity = 0.7;
let isOnGround = false;
let groundLevel = 473;

function viewTutorial() {
    if (previewContainer && tutorialContainer) {
        previewContainer.style.display = "none";
        tutorialContainer.style.display = "block";
    }
}

function closeSettings() {
    window.location.href = "../index.html";
}

function win() {
    if (winPage) winPage.style.display = 'block';
}

function loose() {
    if (loosePage) loosePage.style.display = 'block';
}


let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false,
    space: false,
    a: false,
    d: false,
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
}

function keyListenerUp(e) {
    if (e.key === "ArrowLeft") KEY_EVENTS.leftArrow = false;
    if (e.key === "ArrowUp") KEY_EVENTS.upArrow = false;
    if (e.key === "ArrowRight") KEY_EVENTS.rightArrow = false;
    if (e.key === "ArrowDown") KEY_EVENTS.downArrow = false;
    if (e.code === "Space") KEY_EVENTS.space = false;
    if (e.key === "a") KEY_EVENTS.a = false;
    if (e.key === "d") KEY_EVENTS.d = false;
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

// function playSound(sound) {
//     if (Howler.ctx && Howler.ctx.state === "suspended") {
//         Howler.ctx.resume().then(() => {
//             sound.play();
//         });
//     } else {
//         sound.play();
//     }
// }


function buyCharacter(button, name, number) {
    let btns = document.querySelectorAll(".buy-Button");
    let state = button.dataset.state; //chatgpt suggestion: use dataset for state management
    let characterImg = document.querySelectorAll(".character-img");

    if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume();
    }  

    if (state === "buy") {
        characterImg[number].style.filter = "grayscale(100%)";
        button.dataset.state = "equip";
        button.innerHTML = "Equip";
        //buySound.play(); 
        sfx.buy.play();
        // playSound(buySound);
    } else if (state === "equip") {
        characterImg[number].style.filter = "grayscale(0%)";
        button.dataset.state = "unequip";
        button.innerHTML = "Unequip";
        isCharacterEquipped = true;

    } else {
        characterImg[number].style.filter = "grayscale(100%)";
        button.dataset.state = "equip";
        button.innerHTML = "Equip";
        isCharacterEquipped = false;
    }

    for (let i = 0; i < btns.length; i++) {
        if (btns[i].dataset.state === "unequip" && btns[i] !== button) {
            // force unequip previous one
            btns[i].dataset.state = "equip";
            btns[i].innerHTML = "Equip";

            let img = document.querySelectorAll(".character-img")[i];
            if (img) {
                img.style.filter = "grayscale(100%)";
            }
        }
    }

    button.dataset.state = "unequip";
    button.innerHTML = "Unequip";

    let img = document.querySelectorAll(".character-img")[number];

    if (img) {
        img.style.filter = "grayscale(0%)";
    }
}

startGame();