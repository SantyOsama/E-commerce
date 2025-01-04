//create row
let wholeTable=document.getElementsByTagName("table")[0];
let table=document.getElementsByTagName("tbody")[0];
let emptyelem=document.getElementById("empty");

if(localStorage.length<3){
wholeTable.style.display="none";
emptyelem.style.display="block";
}
//get cart elements from local storage
 for(let i=0; i<localStorage.length;i++){
    
     const key=localStorage.key(i);
     if(!key.startsWith("cart-")) continue;
     try {
        
     const value=JSON.parse(localStorage.getItem(key));
     // console.log(value);
       let row=document.createElement("tr");
      
          let c1=document.createElement("td");
          let img1=document.createElement("img");
          img1.src=value.proImg;
          img1.classList.add("img");
          c1.appendChild(img1);
          row.appendChild(c1);
          
  
          let c2=document.createElement("td");
          c2.innerText=value.proTitle;
          row.appendChild(c2);
          
  
          let c3=document.createElement("td");
          c3.innerText=value.proPrice+" $";
          row.appendChild(c3);
          
  
          let c4=document.createElement("td");
        // bootsrap
        
        // bootsrap
        
          let input=document.createElement("input");
          input.type = "text";
          input.classList.add("number");
          input.value=value.proQuantity;
          input.addEventListener("keydown", function(event) {
            event.preventDefault(); 
           });
          let minus=document.createElement("button");
          minus.setAttribute("id","minus");
          minus.innerHTML='<i class="fa-solid fa-minus btn-icon"></i>';
          minus.addEventListener("click", function(){
              if(value.proQuantity>0){
                  value.proQuantity--;
                  input.value=value.proQuantity;
                  localStorage.setItem(key,JSON.stringify(value));
                  updateCheckout();
              }
              if(value.proQuantity===0){
                  row.remove();
                  localStorage.removeItem(key);
                  updateCheckout();
              }
              
          })
  
          let plus=document.createElement("button");
          plus.setAttribute("id","plus");
          plus.innerHTML='<i class="fa-solid fa-plus btn-icon"></i>';
         plus.addEventListener("click", function(){
            value.proQuantity++;
            input.value=value.proQuantity;
            localStorage.setItem(key,JSON.stringify(value));
            updateCheckout();
      })
  
          c4.appendChild(minus);
          c4.appendChild(input);
          c4.appendChild(plus);
          row.appendChild(c4);
          table.appendChild(row)
        } catch (e) {
            console.error(`Error parsing localStorage key "${key}":`, e);
          }
        
  
 }
 //checkout
 function updateCheckout() {
let subPriceElem=document.getElementById("sub-price");
let totalPriceElem=document.getElementById("total-price");

subPriceElem.innerHTML = "";

let sum=0;
for(let i=0; i<localStorage.length;i++){
    console.log("succeed")
    const key=localStorage.key(i);

    if (!localStorage.getItem(key) || !key.startsWith("cart-")) {
        continue;
    }
    const value=JSON.parse(localStorage.getItem(key));
    const onePriceElem=document.createElement("div");
    onePriceElem.innerText=(value.proPrice*value.proQuantity).toFixed(2) +" $";
    subPriceElem.appendChild(onePriceElem);
    sum+=Number(value.proPrice*value.proQuantity)
}
totalPriceElem.innerText=sum.toFixed(2) +" $";
 }
 updateCheckout();
//localStorage.clear();
// shipping confirmed
let checkoutBtn=document.getElementById("checkout");
checkoutBtn.onclick=function(){
    if(localStorage.length>2){
        for(let i=0; i<localStorage.length;i++){
    
            const key=localStorage.key(i);
            if(!key.startsWith("cart-")) continue;
            localStorage.removeItem(key);
            window.location.href = 'shipped_confirmed.html';
        }
    }
    else{
        alert("nothing to be shipped. 😊");
    }

}
console.log(checkoutBtn);
//checkoutBtn.onclick();
//plus and minus
// let number=document.getElementById("number");
// if(number.value===""){
//  number.value=0;
// }
// function plusFun(){
//  number.value=Number(number.value)+1;
// }
// function minusFun(){
//  if(Number(number.value)>0){
//      number.value=Number(number.value)-1;
//  }
// }
//scroll to top of the page
function fun(){
    console.log("correct");
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
   }