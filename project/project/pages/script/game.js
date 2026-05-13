let PLAYER = {
  box: document.getElementById("playerBox"),
  spriteImg: document.getElementById("spriteImg"),
  spriteImgNumber: 0,
  spriteDirection: 1,
  pointCount: 0,
};

let winPage = document.getElementById("winbtn");
let loosePage = document.getElementById("loosebtn");
let platformContainer = document.getElementById("platformContainer");

let playerX = 0;
let playerY = 0;
let canJump = true;
let isOnPlatform = false;
let wasOnPlatform = false;

const platforms = {
  level_1: [
    { x: 70, y: 420, width: 80, height: 5 },
    { x: 70, y: 310, width: 80, height: 5 },
    { x: 70, y: 199, width: 80, height: 5 },
    { x: 249, y: 420, width: 674, height: 5 },
    { x: 243, y: 310, width: 680, height: 5 },
    { x: 243, y: 199, width: 680, height: 5 },
    { x: 1015, y: 420, width: 80, height: 5 },
    { x: 1015, y: 310, width: 80, height: 5 },
    { x: 1015, y: 199, width: 80, height: 5 },
  ],
  level_2: [
    { x: 150, y: 450, width: 120, height: 20 },
    { x: 350, y: 350, width: 100, height: 20 },
    { x: 550, y: 250, width: 130, height: 20 },
    { x: 750, y: 150, width: 110, height: 20 },
  ],
};

let GAME_CONFIG = {
  gameSpeed: 20,
  characterSpeed: 5,
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
  f: false,
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

  if (playerX < 71){ 
    playerX = 71; 
  }
  if (playerX > 1036) {
    playerX = 1036;
  }

  if (PLAYER.box) {
    PLAYER.box.style.left = playerX + "px";
    PLAYER.box.style.top = playerY + "px";
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
  loadPlatforms("level_1");
  if (!PLAYER.box) {
    console.error("playerBox not found in HTML");
    return;
  }

  playerX = 71;
  playerY = 500;

  PLAYER.box.style.left = playerX + "px";
  PLAYER.box.style.top = playerY + "px";

  if (PLAYER.spriteImg) {
    PLAYER.spriteImg.style.right = "0px";
  }

  gameLoop();
}

function animatePlayer() {
  if (PLAYER.spriteImgNumber < 3) {
    PLAYER.spriteImgNumber++;
    let x = parseFloat(PLAYER.spriteImg.style.right);;
    x -= 62;
    PLAYER.spriteImg.style.right = x + "px";
  } else {
    PLAYER.spriteImg.style.right = "0px";
    PLAYER.spriteImgNumber = 0;
  }
}

function loadPlatforms(level) {
  let html = "";

  for (let i = 0; i < platforms[level].length; i++) {
    let data = platforms[level];
    let p = data[i];
    html += `
            <div class="platform"
                 style="
                    position:absolute;
                    left:${p.x}px;
                    top:${p.y}px;
                    width:${p.width}px;
                    height:${p.height}px;
                 ">
            </div>
        `;
  }

  platformContainer.innerHTML = html;
}

function gameLoop() {

  if (KEY_EVENTS.leftArrow || KEY_EVENTS.a) {
    movePlayer(-GAME_CONFIG.characterSpeed, 0, -1);
    animatePlayer();
  }

  if (KEY_EVENTS.rightArrow || KEY_EVENTS.d) {
    movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
    animatePlayer();
  }


  isOnPlatform = false;


  if (!isOnGround) {
    velocityY += gravity;
  }

  playerY += velocityY;


  if (playerY >= groundLevel) {
    playerY = groundLevel;
    velocityY = 0;
    isOnGround = true;
  } else {
    isOnGround = false;
  }


  for (let i = 0; i < platforms.level_1.length; i++) {

  let p = platforms.level_1[i];
  let platformDiv = document.querySelectorAll(".platform")[i];

  let playerBottom = playerY + PLAYER.box.clientHeight;
  let previousBottom = playerBottom - velocityY;

  if (velocityY >= 0 && previousBottom <= p.y && playerBottom >= p.y && PLAYER.box.offsetLeft + PLAYER.box.clientWidth > p.x && PLAYER.box.offsetLeft < p.x + p.width) {
    playerY = p.y - PLAYER.box.clientHeight;
    velocityY = 0;
    isOnGround = true;
    isOnPlatform = true;

    break;
  }
}


  if (KEY_EVENTS.space && isOnGround && canJump) {
    velocityY = -13;
    isOnGround = false;
    canJump = false;
  }

  if (!KEY_EVENTS.space) {
    canJump = true;
  }

  if (PLAYER.box) {
    PLAYER.box.style.top = playerY + "px";
  }

  setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}

function win() {
  if (winPage) winPage.style.display = "block";
}

function loose() {
  if (loosePage) loosePage.style.display = "block";
}

startGame();
