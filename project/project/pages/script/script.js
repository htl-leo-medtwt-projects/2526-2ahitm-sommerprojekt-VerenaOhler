let previewContainer = document.getElementById("tutorialPreview-container")
let tutorialContainer = document.getElementById("tutorial-explainationContainer")


let winPage = document.getElementById('winbtn')
let loosePage = document.getElementById('loosebtn')

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

let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false, 
    space: false,
    a: false,
    d: false,
}
document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (e.key === "ArrowLeft") { // Left arrow
        KEY_EVENTS.leftArrow = true;
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
    if (e.key === "a") {
        KEY_EVENTS.a = true;
    }
    if (e.key === "d") {
        KEY_EVENTS.d = true;
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
    if (e.key === "a") {
        KEY_EVENTS.a = false;
    }   
    if (e.key === "d") {
        KEY_EVENTS.d = false;
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
    playerX = 50;
    playerY = 500;

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
    if (KEY_EVENTS.leftArrow || KEY_EVENTS.a) {
        movePlayer(-GAME_CONFIG.characterSpeed, 0, -1);
    }
    if (KEY_EVENTS.rightArrow || KEY_EVENTS.d) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
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
   
    //const buySound = new UIfx("sounds/buy.mp3");

function buyCharacter(button, name, number) {         
    let state = button.dataset.state; //Chatgpt hat das vorgeschlagen
    let characterImg = document.querySelectorAll(".character-img");

    if (state === "buy") {
        characterImg[number].style.filter = "grayscale(100%)";
        button.dataset.state = "equip";
        button.innerHTML = "Equip";
        buySound.play();
    } else if (state === "equip") {
        characterImg[number].style.filter = "grayscale(0%)";
        button.dataset.state = "unequip";
        console.log("Equipped:", name);
        button.innerHTML = "Unequip";   
    } else {
        characterImg[number].style.filter = "grayscale(100%)";
        button.dataset.state = "equip";
        console.log("Unequipped:", name);
        button.innerHTML = "Equip";
    }
}
startGame();