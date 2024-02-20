import * as calendarios from "../img/Diseno/Calendarios/*.jpg";
import * as carteles from "../img/Diseno/Carteles/*.jpg";
import * as logos from "../img/Diseno/*.jpg";

const cards = document.querySelectorAll(".project-card");
const imgContainer = document.querySelector(".img-container");
const overlay = document.querySelector(".overlay-diseno");

const showGallery = function (e) {
  overlay.classList.remove("hidden-diseno");
  overlay.scrollTop = 0;
  const content = e.target.parentNode.dataset.content;

  switch (content) {
    case "calendarios":
      for (let i = 1; i <= Object.keys(calendarios).length; i++) {
        const imageElement = document.createElement("img");
        imageElement.src = calendarios[i];
        imgContainer.appendChild(imageElement);
      }
      break;
    case "carteles":
      const keysCarteles = Object.keys(carteles);
      keysCarteles.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = carteles[k];
        imageElement.classList.add("img-tall");
        imgContainer.appendChild(imageElement);
      });
      break;
    case "logo":
      const keysLogos = Object.keys(logos);
      keysLogos.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = logos[k];
        imgContainer.appendChild(imageElement);
      });
      break;
  }
};

cards.forEach((c) => {
  c.addEventListener("click", showGallery);
});

overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  overlay.classList.add("hidden-diseno");
  imgContainer.innerHTML = "";
});
