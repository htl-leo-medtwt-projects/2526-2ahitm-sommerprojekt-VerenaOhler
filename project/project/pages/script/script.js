let previewContainer = document.getElementById("tutorialPreview-container")
let tutorialContainer = document.getElementById("tutorial-explainationContainer")

let winPage = document.getElementById('win')
let loosePage = document.getElementById('loose')

let PLAYER = {
    box: document.getElementById('playerBox'),
    spriteImg: document.getElementById('spriteImg'),
    spriteImgNumber: 0, 
    spriteDirection: 1,
    pointCount: 0
}

let GAME_CONFIG = {
    gameSpeed: 24, 
    characterSpeed: 5 
}

let GAME_SCREEN = {
    surface: document.getElementById('surface'),
    surfaceScale: '95%'
}

if (GAME_SCREEN.surface) {
    GAME_SCREEN.surface.style.transform =
        `scale(${parseFloat(GAME_SCREEN.surfaceScale)/100 * (window.innerWidth / GAME_SCREEN.surface.clientWidth)})`;
}

function viewTutorial(){
    previewContainer.style.display = "none"
    tutorialContainer.style.display = "block"
}

function closeSettings(){
    window.location.href = "../index.html"
}

function win(){
    winPage.style.display = 'block'    
}

function loose(){
    loosePage.style.display = 'block'
}
//spritegame code

let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false
}
document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (e.key === "ArrowLeft") { // Left arrow
        KEY_EVENTS.leftArrow = true;
        console.log('+')
    }
    if (e.key === "ArrowUp") { // Up arrow
        KEY_EVENTS.upArrow = true;
    }
    if (e.key === "ArrowRight") { // Right arrow
        KEY_EVENTS.rightArrow = true;
    }
    if (e.key === "ArrowDown") { // Down arrow
        KEY_EVENTS.downArrow = true;
    }
}
function keyListenerUp(e) {
    if (e.key === "ArrowLeft") { 
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === "ArrowUp") {
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === "ArrowRight") { 
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === "ArrowDown") {
        KEY_EVENTS.downArrow = false;
    }
}

function startGame(){
    playerX = 350;
    playerY = 180;

    PLAYER.box.style.left = playerX + 'px';
    PLAYER.box.style.top = playerY + 'px';

    console.log('hi');
    gameLoop();
}

function animatePlayer() {
    if (PLAYER.spriteImgNumber < 9) { 
        PLAYER.spriteImgNumber++;
        let x = parseFloat(PLAYER.spriteImg.style.right);
        x += 37.0; 
        PLAYER.spriteImg.style.right = x + "px";
    } else { 
        PLAYER.spriteImg.style.right = "0px";
        PLAYER.spriteImgNumber = 0;
    }
}

function gameLoop() {
    console.log('helo')
    if (KEY_EVENTS.leftArrow) {
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, -1);
        //animatePlayer();
    }
    if (KEY_EVENTS.rightArrow) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
        //animatePlayer();
    }
    if (KEY_EVENTS.upArrow) {
        movePlayer(0, (-1) * GAME_CONFIG.characterSpeed, 0);
        //animatePlayer();
    }
    if (KEY_EVENTS.downArrow) {
        movePlayer(0, GAME_CONFIG.characterSpeed, 0);
        //animatePlayer();
        
    }

    gameLoopTimeout = setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed); // async recursion
}

