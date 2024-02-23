const projectsContainer = document.querySelector(".projects-container");
const navButton = document.querySelector(".mobile-nav-btn");
const mobileOverlay = document.querySelector(".mobile-nav-overlay");
const mobileNavList = document.querySelector(".mobile-nav-list");

/*Navegacion mobil */

mobileNavList.addEventListener("touchstart", (e) => {
  e.stopPropagation();
});

navButton.addEventListener("touchstart", () => {
  mobileOverlay.classList.remove("hidden-nav-overlay");
  if (projectsContainer) {
    projectsContainer.style.pointerEvents = "none";
  }
});

mobileOverlay.addEventListener("touchstart", (e) => {
  mobileOverlay.classList.add("hidden-nav-overlay");
  if (projectsContainer) {
    projectsContainer.style.pointerEvents = null;
  }
});
