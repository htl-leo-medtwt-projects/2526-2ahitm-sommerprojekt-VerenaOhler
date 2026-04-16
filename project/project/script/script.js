let previewContainer = document.getElementById("tutorialPreview-container")
let tutorialContainer = document.getElementById("tutorial-explainationContainer")

let winPage = document.getElementById('win')
let loosePage = document.getElementById('loose')

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