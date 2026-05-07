let previewContainer = document.getElementById("tutorialPreview-container");
let tutorialContainer = document.getElementById("tutorial-explainationContainer");

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

// let sfx = {
//     buy: new Howl({
//         src: ['sounds/mixkit-winning-a-coin-video-game-2069.wav'], // fixed path (safer)
//         volume: 0.5
//     }),
// }


function viewTutorial() {
    if (previewContainer && tutorialContainer) {
        previewContainer.style.display = "none";
        tutorialContainer.style.display = "block";
    }
}

function closeSettings() {
    window.location.href = "../index.html";
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
    let state = button.dataset.set; //chatgpt suggestion: use dataset for state management
    let characterImg = document.querySelectorAll(".character-img");

    // if (Howler.ctx && Howler.ctx.state === "suspended") {
    //     Howler.ctx.resume();
    // }  

    if (state === "buy") {
        characterImg[number].style.filter = "grayscale(100%)";
        button.dataset.set = "equip";
        button.innerHTML = "Equip";
        //buySound.play(); 
        //sfx.buy.play();
        console.log("Bought " + name);
        // playSound(buySound);
    } else if (state === "equip") {
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

