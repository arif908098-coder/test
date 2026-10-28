const startButton = document.getElementById("startButton");
const caseButton = document.getElementById("caseButton");
const detectiveGame = document.getElementById("detectiveGame");
const suspectButtons = document.querySelectorAll(".suspect-choice");
const gameResult = document.getElementById("gameResult");
const retryButton = document.getElementById("retryCase");
const scoreDisplay = document.getElementById("scoreDisplay");

let score = 0;
let attempts = 0;
let caseSolved = false;

startButton.addEventListener("click", function () {
    document.getElementById("cases").scrollIntoView({
        behavior: "smooth"
    });
});

caseButton.addEventListener("click", function () {
    detectiveGame.scrollIntoView({
        behavior: "smooth"
    });
});

suspectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        if (caseSolved || attempts >= 3) {
            gameResult.textContent =
                "Investigation finished! Restart to play again.";
            return;
        }

        const suspect = button.dataset.suspect;
        attempts++;

        if (suspect === "Alex") {
            score += 10;
            caseSolved = true;

            gameResult.textContent =
                "CASE SOLVED! Alex's shoes match the muddy footprint. " +
                "You earned 10 points! Final score: " + score + ".";

            button.textContent = "CASE SOLVED ✓";
            button.disabled = true;

            suspectButtons.forEach(function (otherButton) {
                otherButton.disabled = true;
            });
        } else {
            gameResult.textContent =
                suspect + " is not confirmed as the culprit. " +
                "Study the muddy footprint again. Attempts: " +
                attempts + "/3.";

            button.disabled = true;
        }

        scoreDisplay.textContent = score + " points";
        retryButton.hidden = false;
    });
});

retryButton.addEventListener("click", function () {
    score = 0;
    attempts = 0;
    caseSolved = false;

    scoreDisplay.textContent = "0 points";
    gameResult.textContent =
        "Your investigation is waiting. Choose a suspect to begin.";

    suspectButtons.forEach(function (button) {
        button.disabled = false;

        const suspect = button.dataset.suspect;

        if (suspect === "Alex") {
            button.textContent = "ACCUSE ALEX";
        } else if (suspect === "Maya") {
            button.textContent = "ACCUSE MAYA";
        } else if (suspect === "Ryan") {
            button.textContent = "ACCUSE RYAN";
        }
    });

    retryButton.hidden = true;
});