let userScore = 0;
let compScore = 0;
const msg = document.querySelector("#msg")
const resetButton = document.querySelector(".resetButton-class")

const userScorePara = document.querySelector("#user-score")
const compScorePara = document.querySelector("#comp-score")

const choices = document.querySelectorAll(".choice");

const  getComputerChoice = () =>{
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random()*3); //function gives you random value
    return options[randIdx];
};

const drawGame= () => {
    console.log("Match is Draw");
    msg.innerText = "Game was Draw, Play Again"
    msg.style.backgroundColor = "#F9F9F9";
};

const showWinner = (userWin, userChoice, compChoice) =>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore
        console.log("You Win");
        msg.innerText = `You Won! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "#06d6a0";
        
    }
    else{
        compScore++
        compScorePara.innerText = compScore;
        console.log("You lose");
        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "#c1121f";
        
    }
};

const playGame = (userChoice) =>{
    console.log("User Choice = ", userChoice);
    //Generate computer choice
    const compChoice = getComputerChoice();
    console.log("Comp Choice=", compChoice); 

    if(userChoice===compChoice){
        drawGame()
    }
    else{
        let userWin = true;
        if(userChoice === "rock"){
            userWin = compChoice ==="paper" ? false: true;
        }
        else if(userChoice=="paper"){
            userWin = compChoice === "scissor" ? false: true;
        }else{
            userWin = compChoice=== "rock" ? false: true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};


choices.forEach((choice) =>{
    choice.addEventListener("click",() =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
});

resetButton.addEventListener("click", () =>{
    location.reload();
});