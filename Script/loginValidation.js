document
  .getElementById("formValidation")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = "";
    const errors = [];

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email is not valid.");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters.");
    }

    const storedUser = JSON.parse(localStorage.getItem("userData")) || {
      email: email,
      password: password,
    };
    console.log(storedUser);

    if (storedUser.email !== email || storedUser.password !== password) {
      errors.push("Invalid email or password.");
    }

    if (errors.length > 0) {
      errorMessages.innerHTML = errors.join("<br>");
    } else {
      localStorage.setItem("LoggedUserEmail", email);
      localStorage.setItem("Token", "USER");
      window.location.href = "index.html";
    }
  });
