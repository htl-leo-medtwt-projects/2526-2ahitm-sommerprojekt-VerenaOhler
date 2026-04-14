let previewContainer = document.getElementById("tutorialPreview-container")
let tutorialContainer = document.getElementById("tutorial-explainationContainer")

function viewTutorial(){
    previewContainer.style.display = "none"
    tutorialContainer.style.display = "block"
}

function closeSettings(){
    window.location.href = "../index.html"
}