/*********** Slider **************/
let interval;
const imageSources = [
  "./Images/pro-1.png",
  "./Images/pro-2.png",
  "./Images/pro-3.png",
];
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", function () {
  const nameofUserElement = document.getElementById("nameofuser");
  const userEmail = localStorage.getItem("LoggedUserEmail");

  if (userEmail) {
    nameofUserElement.textContent =
      "welcome, " + userEmail.substring(0, 5) + "!";
    nameofUserElement.style.display = "inline"; // التأكد من ظهوره
  } else {
    nameofUserElement.textContent = "Welcome, Guest!"; // في حالة عدم وجود مستخدم
    nameofUserElement.style.display = "inline";
  }

  const sliderImageElement = document.getElementById("sliderImg");
  if (!sliderImageElement) return; // Check if the element exists

  function showImage(index) {
    sliderImageElement.src = imageSources[index];
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % imageSources.length;
    showImage(currentIndex);
  }

  function prevImage() {
    currentIndex =
      (currentIndex - 1 + imageSources.length) % imageSources.length;
    showImage(currentIndex);
  }
  function startSlider() {
    interval = setInterval(nextImage, 1000); // Change image every 3 seconds
  }

  function stopSlider() {
    clearInterval(interval);
  }

  document.getElementById("next")?.addEventListener("click", () => {
    nextImage();
    stopSlider();
    startSlider(); // Restart interval after manual navigation
  });

  document.getElementById("prev")?.addEventListener("click", () => {
    prevImage();
    stopSlider();
    startSlider(); // Restart interval after manual navigation
  });
  document.getElementById("next")?.addEventListener("click", nextImage);
  document.getElementById("prev")?.addEventListener("click", prevImage);
  showImage(currentIndex);
});

/**Login button or picture */
document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("Token");
  const loginButton = document.getElementById("loginButton");
  const logoutButton = document.getElementById("logoutButton");
  const Icon = document.getElementById("Icon");

  function updateUI() {
    if (token) {
      loginButton.style.display = "none";
      logoutButton.style.display = "block";
      Icon.style.display = "block";
    } else {
      loginButton.style.display = "block";
      logoutButton.style.display = "none";
      Icon.style.display = "none";
    }
  }
  if (loginButton) {
    loginButton?.addEventListener("click", () => {
      const fakeToken = "user123-token";
      localStorage.setItem("Token", fakeToken);
      window.location.href = "login.html";
    });
  }
  if (logoutButton) {
    logoutButton?.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "login.html";
    });
  }

  updateUI();
});

/************ Nav Bar ******/
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle?.addEventListener("click", function () {
  navMenu?.classList.toggle("active");
});

loginButton?.addEventListener("click", () => {
  window.location.href = "login.html";
});

logoutButton?.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "login.html";
});

/************** ALL CARDS *******************/
const cardContainer = document.querySelector(".cardContainer");
let allProducts = [];
const apiUrl = "https://fakestoreapi.in/api/products";

async function fetchCards() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    allProducts = data.products;
    renderCards(allProducts);
  } catch (error) {
    console.error("Error fetching cards:", error);
    cardContainer.innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
  }
}

function renderCards(products) {
  if (!cardContainer) {
    console.log("Card container not found.");
    return;
  }

  cardContainer.innerHTML = "";
  products.forEach((item) => {
    /* console.log(item);*/
    var obj = JSON.stringify(item);
    const card = document.createElement("article");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h3>${item.model} (${item.brand})</h3>
      <p>${item.title.slice(0, 70)}${item.title.length > 70 ? "..." : ""}</p>
      <p>Color: ${item.color}</p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <p>Price: <span>${item.price}</span> USD</p>
      </div>
      <button onclick="showDetails(${item.id})">Details</button>
    `;
    cardContainer.appendChild(card);
  });
}

function filterProducts(category) {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach((btn) => btn.classList.remove("act"));
  if (event.target) {
    event.target.classList.add("act");
  }

  if (category === "all") {
    renderCards(allProducts);
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    renderCards(filteredProducts);
  }
}
fetchCards();

function showDetails(productId) {
  window.location.href = `details.html?productId=${productId}`;
}

/************************ back function in error page **********************************/
function back() {
  history.back();
}

/************* Filter ***********/

function goToCart() {
  window.location.href = "cart.html";
}

//scroll to top of the page
function fun() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//localStorage.clear();
// JSON.parse(localStorage.getItem(id))

//scroll to top of the page
function fun() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
