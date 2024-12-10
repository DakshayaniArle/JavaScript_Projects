let choices = document.querySelectorAll(".choice");
console.log(choices);
let msg = document.querySelector("#msg");
let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#comp-score");


let userScore =0;
let compScore=0;



const genCompChoice = () =>{
    const options =["rock","paper","scissors"];
    const randIx = Math.floor(Math.random() * 3);
    return options[randIx];

}

const drawGame = ()=>{
        msg.innerText="Game Was Draw.Play Again!";
        msg.style.backgroundColor="rgb(20, 20, 48)";
}
const showWinner = (userWin,userChoice,compChoice) =>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.style.backgroundColor="green";
        msg.innerText=`you Win! Your ${userChoice} beats ${compChoice}`;
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.style.backgroundColor="red";
        msg.innerText=`you Lost! ${compChoice} beats your ${userChoice}`;
    }
}; 

const playGame =(userChoice)=>{
    const compChoice = genCompChoice();

    if(userChoice===compChoice){
        drawGame();
    }
    else{
        let userWin = true;
        if(userChoice==="rock"){
            //paper,scissors
            userWin = compChoice==="paper"?false:true;
        }
        else if(userChoice==="paper"){
            //rock,scissors
            userWin = compChoice==="scissors"?false:true;
        }
        else if(userChoice==="scissors"){
            //rock,paper
            userWin = compChoice==="rock"?false:true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice) =>{
   choice.addEventListener("click",()=>{
    const userChoice = choice.getAttribute("id");
    console.log(userChoice);
    playGame(userChoice);
   });
});