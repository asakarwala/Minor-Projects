let boxes = document.querySelectorAll(".box");

let resetBtn = document.querySelector("#reset-btn");

let newGameBtn = document.querySelector("#new-btn");

let msgContainer = document.querySelector(".msg-container");

let msg = document.querySelector("#msg")

let turnO= true; //playerX, playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
]

const resetGame = () => {
    turnO = true; // Reset the turn to "O"
    enabledBoxes(); // Re-enable all boxes
    msgContainer.classList.add("hide"); // Hide the message container
};

const enabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Enable the box (fix: correctly use boolean)
        box.innerText = ""; // Clear the box content
    }
};

const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true; // Disable the box
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting box content

        if (turnO) {
            box.innerText = "O"; // Player O's turn
            turnO = false;
        } else {
            box.innerText = "X"; // Player X's turn
            turnO = true;
        }

        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val); // Announce the winner
                return;
            }
        }
    }

    // Check for a draw
    const isDraw = Array.from(boxes).every((box) => box.innerText !== "");
    if (isDraw) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

// Attach reset functionality to both buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);