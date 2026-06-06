let previewContainer = document.getElementById("tutorialPreview-container");
let tutorialContainer = document.getElementById(
  "tutorial-explainationContainer",
);

let isCharacterEquipped = false;
let coinCountElement = document.querySelector(".coin-count");

//coinCountElement.innerHTML = PLAYER.coins;

let characters = [
    {
      "id": 1,
      "name": "Bub",
      "img" : "../img/Bub.png",
      "spriteImg" : "../img/Bub_sprite.png",
      "color": "green",
      "bubble": "../img/Bub_bubble.png"
    },
    {
      "id": 2,
      "name": "Bob",
      "img" : "../img/Bob.png",
      "spriteImg" : "../img/Bob_sprite.png",
      "color": "blue",
      "bubble": "../img/Bob_bubble.png"
    },
    {
      "id": 3,
      "name": "Luna",
      "img" : "../img/pixil-frame-0.png",
      "spriteImg" : "../img/Luna_sprite.png",
      "color": "purple",
      "bubble": "../img/Luna_bubble.png"
    },
    {
      "id": 4,
      "name": "Pyro",
      "img" : "../img/Pyro.png",
      "spriteImg" : "../img/Pyro_sprite.png",
      "color": "red",
      "bubble": "../img/Pyro_bubble.png"
    },
    {
      "id": 5,
      "name": "Glacia",
      "img" : "../img/Glacia.png",
      "spriteImg" : "../img/Glacia_sprite.png",
      "color": "cyan",
      "bubble": "../img/Glacia_bubble.png"
    },
    {
      "id": 6,
      "name": "Shadow",
      "img" : "../img/Shadow.png",
      "spriteImg" : "../img/Shadow_sprite.png",
      "color": "black",
      "bubble": "../img/Shadow_bubble.png"
    }
  ]


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

// let sfx = {
//   buy: new Howl({
//     src: ["sounds/mixkit-winning-a-coin-video-game-2069.wav"], 
//     volume: 0.5,
//     pool: 25,
//   }),
//   error: new Howl({
//     src: ["sounds/freesound_community-error-89206.mp3"], 
//     volume: 0.5,
//     pool: 25,
//   }),
//   equip: new Howl({
//     src: ["sounds/Cartoon SFX Equip.mp3"], 
//     volume: 0.5,
//     pool: 25,
//   }),
//   game: new Howl({
//     src: ["sounds/Bubble Bobble (Arcade) - In-Game Music.mp3"],
//     volume: 0.5,
//     pool: 25,
//   }),
//   game_over: new Howl({
//     src: ["sounds/Bubble Bobble (Arcade OST) - 14 - Game Over.mp3"],
//     volume: 0.5,
//     pool: 25,
//   }),
//   time_out: new Howl({
//     src: ["../sounds/Bubble Bobble (Arcade OST) - 12 - Death Skulls Appear.mp3"],
//     volume: 0.5,
//     pool: 25,
//   }),
// };

// const sfx = {
//   buy: new Audio("../sounds/buy.wav"),
//error: new Audio("../sounds/error.mp3"),
//   equip: new Audio("../sounds/equip.mp3"),
//   game: new Audio("../sounds/game_music.mp3"),
//   game_over: new Audio("../sounds/GameOver.mp3"),
//   time_out: new Audio("../sounds/timeUp.mp3"),
// };
function viewTutorial() {
  if (previewContainer && tutorialContainer) {
    previewContainer.style.display = "none";
    tutorialContainer.style.display = "block";
  }
}

function closeSettings() {
  window.location.href = "../index.html";
}

function buyCharacter(button, name, number, cost) {
  let btns = document.querySelectorAll(".buy-Button");
  let state = button.dataset.set; //chatgpt suggestion: use dataset for state management
  let characterImg = document.querySelectorAll(".character-img");
  let chosenCharacter = "";
  
   // get character data from JSON
  if (state === "buy") {
    if (PLAYER.coins < cost) {
      // play error sound
      // sfx.error.play();
      playSfx('error');
      console.log("Not enough coins to buy " + name);
      return;
    } else {
      PLAYER.coins -= cost;
      coinCountElement.textContent = PLAYER.coins;
      
      characterImg[number].style.filter = "grayscale(100%)";
      button.dataset.set = "equip";
      button.innerHTML = "Equip";
      // sfx.buy.play();
      playSfx('buy')
      console.log("Bought " + name);
    }
  } else if (state === "equip") {
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].name === name) {
            PLAYER.spriteImg = characters[i].spriteImg;
            console.log("Equipped " + name);
            console.log("Player sprite image set to: " + PLAYER.spriteImg);
            // sfx.equip.play();
            playSfx('equip')
            localStorage.setItem("equippedCharacter", PLAYER.spriteImg);
            break;
        }
    }
    characterImg[number].style.filter = "grayscale(0%)";
    button.dataset.set = "unequip";
    button.innerHTML = "Unequip";
    isCharacterEquipped = true;
  } else {
    characterImg[number].style.filter = "grayscale(100%)";
    button.dataset.set = "equip";
    button.innerHTML = "Equip";
    isCharacterEquipped = false;
  }

  for (let i = 0; i < btns.length; i++) {
    if (btns[i].dataset.set === "unequip" && btns[i] !== button) {
      // force unequip previous one
      btns[i].dataset.set = "equip";
      btns[i].innerHTML = "Equip";

      let img = document.querySelectorAll(".character-img")[i];
      if (img) {
        img.style.filter = "grayscale(100%)";
      }
    }
  }

  button.dataset.set = "unequip";
  button.innerHTML = "Unequip";

  let img = document.querySelectorAll(".character-img")[number];

  if (img) {
    img.style.filter = "grayscale(0%)";
  }

}
