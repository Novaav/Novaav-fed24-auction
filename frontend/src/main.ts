import "./style.css";

const registerButton = document.getElementById("goToRegister");
registerButton?.addEventListener("click", () => {
  location.href = "/register.html";
});

const loginButton = document.getElementById("goToLogin");
loginButton?.addEventListener("click", () => {
  location.href = "/login.html";
});
