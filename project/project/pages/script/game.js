let PLAYER = {
  box: document.getElementById("playerBox"),
  spriteImg: document.getElementById("spriteImg"),
  spriteImgNumber: 0,
  spriteDirection: 1,
  pointCount: 0,
  coins:  40,
};

let winPage = document.getElementById("winbtn");
let loosePage = document.getElementById("loosebtn");
let platformContainer = document.getElementsByClassName("platformContainer"[0]);
// let playersrc = document.getElementById("spriteImg").src;
let playerBubbleCont = document.getElementById("playerBubbleCont");
let gameScreen = document.getElementById("game");

let playerX = 0;
let playerY = 0;
let playerLimit = 40;
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
  gameSpeed: 17,
  characterSpeed: 7,
};

let velocityY = 0;
let gravity = 0.7;
let isOnGround = false;
let groundLevel = 435;
//let groundLevel = 0;

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


  if (playerX > 1036) {
    playerX = 1036;
  }
  if(playerX < 71){
    playerBubbleCont.style.left = 71 + "px"
    PLAYER.box.style.left = 10 + "px";
  }

  if (PLAYER.box) {
    PLAYER.box.style.left = playerX + "px";
    PLAYER.box.style.top = 40 + "px";
  }
  if(playerBubbleCont){
    playerBubbleCont.style.left = playerX + "px";
    playerBubbleCont.style.top = playerY + "px";
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
  let characterImg = localStorage.getItem("equippedCharacter");
  if (characterImg) {
    playersrc = characterImg;
  }

  PLAYER.box.style.left = 10 + "px";
  PLAYER.box.style.top = 40 + "px";

  playerBubbleCont.style.left = 69 + "px";
  playerBubbleCont.style.top = 435 + "px";

  // sfx.game.play();
  // sfx.game.loop = true;
  
  gameLoop();
}

function animatePlayer() {
  if (PLAYER.spriteImgNumber < 3) {
    PLAYER.spriteImgNumber++;
    let x = parseFloat(PLAYER.spriteImg.style.right);;
    x -= 75;
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

//Howler.mute(true);

function gameLoop() {
  
  // sfx.game.loop(true);
  // console.log(sfx.game)
  


  let f_key_counter = 0;
  let pointsElement = document.getElementById("points");

  if (KEY_EVENTS.leftArrow || KEY_EVENTS.a) {
    movePlayer(-GAME_CONFIG.characterSpeed, 0, -1);
    animatePlayer();

  }

  if (KEY_EVENTS.rightArrow || KEY_EVENTS.d) {
    movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
    animatePlayer();
  }

document.addEventListener("keydown", (e) => {
  if (e.key === "f" && !e.repeat) {
    PLAYER.pointCount += 10;
    pointsElement.innerHTML = PLAYER.pointCount;

    const bubble = document.createElement("img");
    bubble.src = "./img/pixil-frame-0 (6).png";
    bubble.className = "bubble";

    bubble.style.left = playerX + "px";
    bubble.style.top = playerY + "px";

    playerBubbleCont.style.left = playerX + "px";
    playerBubbleCont.style.top = playerY + "px";

    playerBubbleCont.appendChild(bubble);

    bubble.addEventListener("animationend", () => {
      bubble.remove();
    });
  }
});

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

  // if (PLAYER.box) {
  //   PLAYER.box.style.top = playerY + "px";
  // }

  setTimeout(gameLoop, 1000 / GAME_CONFIG.gameSpeed);
}

function win() {
  if (winPage) winPage.style.display = "block";
}

function loose() {
  if (loosePage) loosePage.style.display = "block";
}

startGame();
