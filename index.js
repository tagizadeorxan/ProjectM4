// var gi = require(`gitignore`);


window.onload = function(){
    //auto select first one
    let defaults = document.querySelector('.firstEdit');
     defaults.addEventListener("click",this.selectionOne);
     defaults.click();
    //auto select second one
    let defaultTwo = document.querySelector("#currencies-2> span:nth-child(2)")
    defaultTwo.addEventListener("click",this.selectionTwo);
    defaultTwo.click();
}



let currencisesOne = document.querySelectorAll("#currencies-1 > .select");
let currencisesTwo = document.querySelectorAll("#currencies-2 > .select");
let inputnumberone = document.querySelector("#input-number-1");
let inputnumbertwo = document.querySelector("#input-number-2");


//Select menu
let select1 = document.getElementById("select1");
let select2 = document.getElementById("select2");

select1.addEventListener("change",runOne);
select2.addEventListener("change",runTwo);

function runOne() {
    select1.style.backgroundImage ="initial";
    select1.style.backgroundColor = "#833AE0";
    select1.style.color = "white";
    for(let i=1;i<=4;i++) {
         currencisesOne[i-1].style.backgroundColor ="white";
         currencisesOne[i-1].style.color ="#C6C6C6";
         currencisesOne[i-1].style.border ="1px solid #C6C6C6";
    }
    altvalueChange(select1.value,1);
    let type =1;
    converter(type);
    
}

function runTwo() {
    select2.style.backgroundImage ="initial";
    select2.style.backgroundColor = "#833AE0";
    select2.style.color = "white";
    for(let i=1;i<=4;i++) {
        currencisesTwo[i-1].style.backgroundColor ="white";
        currencisesTwo[i-1].style.color ="#C6C6C6";
        currencisesTwo[i-1].style.border ="1px solid #C6C6C6";
    }
    altvalueChange(select2.value,2);
    let type =2;
    converter(type);
    
}

for(let i=0;i<currencisesOne.length;i++) {
    currencisesTwo[i].addEventListener("click",selectionTwo);
    currencisesOne[i].addEventListener("click",selectionOne);
   
}




function selectionOne (evt) {
   evt.preventDefault();
   event.target.style.backgroundColor = "#833AE0";
   event.target.style.color = "white";
   event.target.style.border = "1px solid #833AE0"

   
   for(let i=1;i<=4;i++) {
       if(Number(event.target.id)!=i) {
        currencisesOne[i-1].style.backgroundColor ="white";
        currencisesOne[i-1].style.color ="#C6C6C6";
        currencisesOne[i-1].style.border ="1px solid #C6C6C6";
       }
   }
    select1.style.backgroundImage = "url(images/arrowIcon.png)";
    select1.style.backgroundColor = "white";
    select1.style.color = "black";
    select1.value ="";
    
    

    let target = event.target.textContent;
    let place = 1;
   altvalueChange(target,place);
   let type =1;
   converter(type);
  
} 


function selectionTwo (evt) {
    evt.preventDefault();
    event.target.style.backgroundColor = "#833AE0";
    event.target.style.color = "white";
    event.target.style.border = "1px solid #833AE0"
    
    for(let i=1;i<=4;i++) {
        if(Number(event.target.id)!=i) {
            currencisesTwo[i-1].style.backgroundColor ="white";
            currencisesTwo[i-1].style.color ="#C6C6C6";
            currencisesTwo[i-1].style.border ="1px solid #C6C6C6";
        }
    }

    select2.style.backgroundImage = "url(images/arrowIcon.png)";
    select2.style.backgroundColor = "white";
    select2.style.color = "black";
    select2.value ="";

    let target = event.target.textContent;
    let place = 2;
    altvalueChange(target,place);
    let type =2;
    converter(type);
    
 } 


 function altvalueChange(value,place){
    if(place==1){
        document.getElementById("1th").textContent=value;
        document.getElementById("4th").textContent=value;
      
    } else if(place==2){
        document.getElementById("2th").textContent=value;
        document.getElementById("3th").textContent=value;
        
    }
    
 }

let first = 0;
let second = 0;

 function converter(type) {
     let firstCurrency = document.getElementById("1th").textContent;
     let secondCurrency = document.getElementById("2th").textContent;
    
     if(firstCurrency ==="currency" || secondCurrency ==="currency" ) {
         alert("choose currency");
     } else if(secondCurrency === "currency"){
         alert("please choose seconds currency");
     } else if (firstCurrency === secondCurrency) {
        document.getElementById("calculate1").textContent =1;  
        document.getElementById("calculate2").textContent =1;   
        first =1;
        seconds =1;
     }
     
     
     
     
     else { 
        // inputnumberone.addEventListener("input",calculateCurrencyeventOne);
        // inputnumbertwo.addEventListener("input",calculateCurrencyeventTwo);
        inputnumberone.addEventListener("input",calculateCurrencyeventOne);
        inputnumbertwo.addEventListener("input",calculateCurrencyeventTwo);
        
        fetch(`https://api.ratesapi.io/api/latest?base=${firstCurrency}&symbols=${secondCurrency}`,{ 
    method: "GET",
   }).then(data => data.json()).then((data) => {
       first = data.rates[secondCurrency];
   document.getElementById("calculate1").textContent =data.rates[secondCurrency];     
   });
        
   fetch(`https://api.ratesapi.io/api/latest?base=${secondCurrency}&symbols=${firstCurrency}`,{ 
    method: "GET",
   }).then(data => data.json()).then((data) => {
    second=data.rates[firstCurrency];
   document.getElementById("calculate2").textContent =data.rates[firstCurrency];     
   });
     

   if(type ===1){
    calculateCurrencyeventOne();
   } else if(type === 2) {
    calculateCurrencyeventTwo();
   }

     }
     

 }




  
  function showPage() {
    document.getElementById("content").style.filter = "none";
    document.getElementById("loading").classList.remove("show");
    document.getElementById("loading").classList.add("hide");
  }

  function showLoad () {
    document.getElementById("content").style.filter = "blur(2px)";
    document.getElementById("content").addEventListener("onload",console.log("obbaaaa"));
    document.getElementById("loading").classList.remove("hide");
    document.getElementById("loading").classList.add("show");
 
  }

 function calculateCurrencyeventOne() {

    showLoad();

    setTimeout( () => {
      let value1 = Number(document.getElementById("input-number-1").value);
   console.log(value1);
       
      document.getElementById("input-number-2").value = value1*first;
      console.log(first);
      console.log(second);
      console.log("yoxlama 2nci",document.getElementById("input-number-2").value);
    },1000);
    setTimeout(showPage,1000);
    
 }


 function calculateCurrencyeventTwo() {
    showLoad();
   setTimeout( () => {
    let value2 = Number(document.getElementById("input-number-2").value);
    console.log(value2);
     
    document.getElementById("input-number-1").value = value2*second;
    console.log(first);
    console.log(second);
    console.log("yoxlama 1nci",document.getElementById("input-number-1").value);
},1000);
setTimeout(showPage,1000);
}


converter(1);