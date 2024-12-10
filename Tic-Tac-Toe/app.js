let boxes = document.querySelectorAll(".box");
let newbtn =document.querySelector("#new-btn");
let resbtn = document.querySelector("#reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count=0;

const validWinners=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){
            box.innerText = "O";
            box.style.color ="crimson";
            turnO = false;
        }else{
            box.innerText ="X";
            box.style.color="rgb(8, 127, 167)";
            turnO=true;
        }
        box.disabled=true;
        count++;

        let isWinner = checkWinner();

        if(count==9 && !isWinner){
            gameDraw();
        }
    });
});

const checkWinner=()=>{
    for(let pattern of validWinners){
        let posVal1 = boxes[pattern[0]].innerText;
        let posVal2 = boxes[pattern[1]].innerText;
        let posVal3 = boxes[pattern[2]].innerText;

        if(posVal1 !="" && posVal2 !="" && posVal3!=""){
            if(posVal1===posVal2 && posVal2===posVal3){
                showWinner(posVal1);
                return true;
            }
        }
    }
};

const showWinner = (winner)=>{
    msg.innerText=`Congratulations,The winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const gameDraw =()=>{
    msg.innerText="The Game was Draw";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame =()=>{
    turnO=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

resbtn.addEventListener("click",resetGame);
newbtn.addEventListener("click",resetGame);
