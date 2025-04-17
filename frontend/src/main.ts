import "./styles/main.css";
import "./styles/base.css";

fetch("/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    const container = document.getElementById("navbar-container");
    if (container) {
      container.innerHTML = html;
      setupNavbarEventListeners();
    }
  });

function setupNavbarEventListeners() {
  const registerButton = document.getElementById("goToRegister");
  registerButton?.addEventListener("click", () => {
    location.href = "/register.html";
  });

  const loginButton = document.getElementById("goToLogin");
  loginButton?.addEventListener("click", () => {
    location.href = "/login.html";
  });

  const auctionButton = document.getElementById("goToAuction");
  auctionButton?.addEventListener("click", () => {
    location.href = "/auction.html";
  });
}

// // 3. Bildspel / slideshow
// let slideIndex = 0;
// const slides = document.querySelectorAll('.slide') as NodeListOf<HTMLImageElement>;

// function showSlides() {
//   slides.forEach((slide) => slide.classList.remove('active'));
//   slideIndex = (slideIndex + 1) % slides.length;
//   slides[slideIndex].classList.add('active');
// }

// setInterval(showSlides, 4000);
// showSlides();
