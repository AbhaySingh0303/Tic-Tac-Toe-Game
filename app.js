let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector("#msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn-indicator");
let currentPlayerSpan = document.querySelector("#current-player");

let turnO = true; // playerX, player0

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const updateTurnIndicator = () => {
    const player = turnO ? "O" : "X";
    currentPlayerSpan.innerText = player;
    currentPlayerSpan.className = turnO ? "player-o" : "player-x";
};

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnIndicator.style.opacity = "1";
    updateTurnIndicator();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            box.classList.add("player-o");
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("player-x");
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        updateTurnIndicator();
    });
});

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("player-o", "player-x");
    }
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    turnIndicator.style.opacity = "0";
};

const showDraw = () => {
    msg.innerText = "🤝 Oh no, the game ended in a draw!";
    msgContainer.classList.remove("hide");
    turnIndicator.style.opacity = "0";
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                boxes.forEach((box) => (box.disabled = true));
                return;
            }
        }
    }

    // Check for draw condition
    const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allBoxesFilled) {
        console.log("draw");
        showDraw();
    }
};

newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);

// Initialize turn indicator on page load
updateTurnIndicator();
