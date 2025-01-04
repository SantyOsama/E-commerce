/************** login validation ***************/
document
  .getElementById("formValidation")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = "";
    const errors = [];
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email is not valid.");
    }
    const password = document.getElementById("password").value.trim();
    if (password.length < 8) {
      errors.push("Password must be 8 characters at least.");
    }
    if (errors.length > 0) {
      errorMessages.innerHTML = errors.join("<br>");
    } else {
      localStorage.setItem("Token", "USER");
      window.location.href = "index.html";
    }
  });
