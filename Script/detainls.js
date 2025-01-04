//fetch one product
var urlParams = new URLSearchParams(window.location.search);
var id = urlParams.get("productId");
// var id=2
var img = document.getElementsByTagName("img")[0];
var title = document.getElementById("name");
var brand = document.getElementById("brand");
var price = document.getElementById("price");
var description = document.getElementById("description");

var proData;
fetch("https://fakestoreapi.in/api/products/" + id)
  .then((res) => res.json())
  .then((res) => {
    proData = res.product;
    console.log(proData);
    img.src = proData.image;
    title.innerText = proData.title;
    brand.innerText = proData.brand;
    price.innerText = proData.price + " $";
    description.innerText = proData.description;
  })
  .catch((err) => console.error("Error fetching the product:", err));
//plus and minus 
   var number=document.getElementById("number");
   // Prevents typing in the input
   number.addEventListener("keydown", function(event) {
    event.preventDefault(); 
   });
   if(number.value==""){
    number.value=1;
    console.log(number.value)
   }
   function plusFun(){
    number.value=Number(number.value)+1;
   }
   function minusFun(){
    if(Number(number.value)>0){
        number.value=Number(number.value)-1;
    }
   }

//add to cart
function addToCart(){
    var quantity;
    if(Number(number.value)>0 ){
        quantity=number.value;
        if (localStorage.getItem(`cart-${id}`) !== null) {
            alert("Oops! This product is already in your cart. 😊");
        }
        else{
            var pro={
                proId:proData.id,
                proTitle:proData.title,
                proImg:proData.image,
                proPrice:proData.price,
                proQuantity:quantity,
            }
            
            localStorage.setItem(`cart-${id}`,JSON.stringify(pro))
            console.log(JSON.parse(localStorage.getItem(`cart-${id}`)).proId);
            window.location.href = 'cart.html';
        }
       }
    else{
        alert("enter a valid quantity");
    }
    
    }
//localStorage.clear();
// JSON.parse(localStorage.getItem(id))

//scroll to top of the page
function fun(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
   }