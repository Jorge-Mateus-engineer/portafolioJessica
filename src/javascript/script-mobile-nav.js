const projectsContainer = document.querySelector(".projects-container");
const navButton = document.querySelector(".mobile-nav-btn");
const closeMobileBtn = document.querySelector(".close-mobile");
const mobileOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavList = document.querySelector(".mobile-nav-list");

/*Navegacion mobil */

const showNav = function () {
  mobileOverlay.classList.remove("hidden-nav-overlay");
  document.documentElement.style.overflow = "hidden";
  navButton.style.opacity = 0;
};

const hideNav = function () {
  mobileOverlay.classList.add("hidden-nav-overlay");
  document.documentElement.style.overflow = "";
  navButton.style.opacity = 1;
};

navButton.addEventListener("touchstart", showNav);
navButton.addEventListener("click", showNav);

closeMobileBtn.addEventListener("touchstart", hideNav);
closeMobileBtn.addEventListener("click", hideNav);
