import { getHighscore, addHighscore } from "./highscore.js";

// getHighscore();

const nameParagraph = document.querySelector("#nameParagraph");
const rpsContainer = document.querySelector("#rpsContainer");
const rockOption  = document.querySelector("#rockOption");
const paperOption  = document.querySelector("#paperOption");
const scissorOption  = document.querySelector("#scissorOption");
const nameButton = document.querySelector("#nameButton");
const winnerParagraph = document.querySelector("#winnerParagraph");
const playerScoreParagraph = document.querySelector("#playerScore");
const playerChoiceParagraph = document.querySelector("#playerChoice");
const computerScoreParagraph = document.querySelector("#computerScore");
const computerChoiceParagraph = document.querySelector("#computerChoiceParagraph")
const playAgainButton = document.querySelector("#playAgainButton");
const playAgainPopUp = document.querySelector("#popUpWindow");



let playerChoice;
let computerChoice;
let nameInputValue;
let playerScore = 0;
let computerScore = 0;

const rpsOptions = [rockOption, paperOption, scissorOption];
const rpsOptionsString = ["Rock", "Paper", "Scissor"];

for(let i = 0; i < rpsOptions.length; i++) {
    rpsOptions[i].addEventListener("click", () => {
        playerChoice = i;
        computerChoice = Math.floor(Math.random()*3);
        play(rpsOptions[playerChoice], rpsOptions[computerChoice]);
        computerChoiceParagraph.innerText = `Computer chose: ${rpsOptionsString[computerChoice]}`;
        playerChoiceParagraph.innerText = `Player chose: ${rpsOptionsString[playerChoice]}`;
        if(computerScore === 1) {
            playAgainPopUp.style.cssText = ` display: inline;`; 
            rpsContainer.style.cssText = "display: none;"
        } 
    })
};

nameButton.addEventListener("click", event => {
    event.preventDefault();
    nameInputValue = document.querySelector("#nameInput").value;
    nameParagraph.innerText = `Welcome ${nameInputValue}!`;
});

playAgainButton.addEventListener("click", playAgainEvent => {
    playAgainEvent.preventDefault(); 
    playerScore = 0; 
    computerScore = 0; 
    playerScoreParagraph.innerText = `Player Score: ${playerScore}`;
    computerScoreParagraph.innerText = `Computer Score: ${computerScore}`;
    winnerParagraph.innerText = "";
    computerChoiceParagraph.innerText = "";
    playAgainPopUp.style.cssText = ` display: none;`
    rpsContainer.style.cssText = "display: flex;"
});
    

export async function play(playerChoice, computerChoice) {
    let result; 
    if (playerChoice === computerChoice) {
        playerScoreParagraph.innerText = `Player Score: ${playerScore}`;
        computerScoreParagraph.innerText = `Computer Score: ${computerScore}`;
        result = "It's a tie!";
    } else if (
        playerChoice === rockOption && computerChoice === scissorOption ||
        playerChoice === scissorOption && computerChoice === paperOption ||
        playerChoice === paperOption && computerChoice === rockOption ) {
        playerScore++;
        playerScoreParagraph.innerText = `Player Score: ${playerScore}`;
        result = "You win!";
     } else {
        computerScore++;
        computerScoreParagraph.innerText = `Computer Score: ${computerScore}`;
        addHighscore(playerScore, nameInputValue);
        result = "You lose!";
     }

    if(playerScore === 3) {
        if(nameInputValue === undefined || nameInputValue === ""){
            winnerParagraph.innerText = "Player won the game!";
        }else {
            winnerParagraph.innerText = `${nameInputValue} won the game!`;
        }
    }else if(computerScore === 3) {
        winnerParagraph.innerText = "Computer won the game!";
    }else {
        return winnerParagraph.innerText = result;
    }

    await getHighscore();
}

