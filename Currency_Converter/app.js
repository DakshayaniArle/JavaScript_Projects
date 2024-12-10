// const base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies";
let api ='https://v6.exchangerate-api.com/v6/d7e4b98d822adb334b998352/latest/USD';
const dropdowns = document.querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(let currCountry in countryList){
        let newOption = document.createElement("option");
        newOption.value = currCountry;
        newOption.innerText=currCountry;
        if(select.name === "from" && currCountry ==="USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCountry ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

// console.log(toCurr.value);
// console.log(fromCurr.value); 
const updateExchangeRate = ()=>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if(amtVal=="" || amtVal<1){
        amount.value="1";
        amtVal=1;
    }
    // console.log(fromCurr.value);
    // console.log(toCurr.value);
    /*const URL = `${base_url}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(URL);
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[fromCurr.value][toCurr.value];
    console.log(rate);*/
    
    fetch(api)
      .then((resp)=>resp.json())
      .then((data)=>{
        let fromExchangeRate = data.conversion_rates[fromCurr.value];
        let toExchangeRate = data.conversion_rates[toCurr.value];
        // console.log(fromCurr.value);
        // console.log(toCurr.value);
        // console.log(fromExchangeRate);
        // console.log(toExchangeRate)
        const convertedAmount = (amtVal/fromExchangeRate)*toExchangeRate;
        console.log(convertedAmount);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
      });

}

const updateFlag=(element) =>{
    let currCode =element.value;
    let countryCode =countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newSrc;
};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})

window.addEventListener("load",()=>{
    updateExchangeRate();
})