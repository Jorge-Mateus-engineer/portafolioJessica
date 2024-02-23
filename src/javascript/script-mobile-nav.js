const projectsContainer = document.querySelector(".projects-container");
const navButton = document.querySelector(".mobile-nav-btn");
const closeMobileBtn = document.querySelector(".close-mobile");
const mobileOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavList = document.querySelector(".mobile-nav-list");

/*Navegacion mobil */

mobileOverlay.addEventListener("touchstart", (e) => {
  // e.preventDefault();
  // e.stopPropagation();
});

navButton.addEventListener("touchstart", () => {
  mobileOverlay.classList.remove("hidden-nav-overlay");
  document.documentElement.style.overflow = "hidden";
  navButton.style.opacity = 0;
});

closeMobileBtn.addEventListener("touchstart", () => {
  mobileOverlay.classList.add("hidden-nav-overlay");
  document.documentElement.style.overflow = "";
  navButton.style.opacity = 1;
});
