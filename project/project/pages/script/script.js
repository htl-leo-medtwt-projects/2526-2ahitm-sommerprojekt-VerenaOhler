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

let velocityY = 0; 
let gravity = 0.5; 
let isOnGround = false; 
let groundLevel = 400; 

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
    downArrow: false, 
    space: false
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

    if (e.code === "Space") { 
        KEY_EVENTS.space = true;
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
    if (e.code === "Space") { 
        KEY_EVENTS.space = false;
    }
}

function movePlayer(x, y, direction) {
    playerX += x;
    playerY += y;
    PLAYER.box.style.left = playerX + 'px';
    PLAYER.box.style.top = playerY + 'px';
    if (direction !== 0) {
        if (direction !== PLAYER.spriteDirection) {
            PLAYER.spriteDirection = direction;
            if (direction === 1) {
                PLAYER.spriteImg.style.transform = "scaleX(1)";
            } else {
                PLAYER.spriteImg.style.transform = "scaleX(-1)";
            }
        }
    }
}

function startGame(){
    playerX = 350;
    playerY = 180;

    PLAYER.box.style.left = playerX + 'px';
    PLAYER.box.style.top = playerY + 'px';

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
    if (KEY_EVENTS.leftArrow) { 
        movePlayer(-GAME_CONFIG.characterSpeed, 0, -1); //--
    }                                                       /*>-- movement for player left and right*/ 
     if (KEY_EVENTS.rightArrow) 
        { movePlayer(GAME_CONFIG.characterSpeed, 0, 1); //--
    }
    velocityY += gravity; //declare gravity for player
    playerY += velocityY; 
    
    if (playerY >= groundLevel) { //check if player is on the ground
         playerY = groundLevel; //reset player position to ground level
         velocityY = 0; //reset velocity
         isOnGround = true; //set isOnGround to true when player is on the ground
        }else {
         isOnGround = false; //set isOnGround to false when player is in the air
        }
         if (KEY_EVENTS.space && isOnGround && canJump) { //check if space is pressed and player is on the ground and can jump
             velocityY = -10; //set velocity to jump
             canJump = false; //prevent double jump
         }
         if (!KEY_EVENTS.space) { //prevent jump lock when space is released
             canJump = true; //prevent jump lock when space is released
         }
        
        PLAYER.box.style.top = playerY + 'px';
        setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
    }
startGame();