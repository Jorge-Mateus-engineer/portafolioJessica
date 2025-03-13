import * as carteles from "../img/Diseno/Carteles/*.webp";
import * as logos from "../img/Diseno/*.jpg";
import * as corral from "../img/Diseno/Camapana_el_corral/*.webp"
import * as frisby from "../img/Diseno/Campana_frisby/*.webp"
import * as cordilleras from "../img/Diseno/Campana_tres_cordilleras/*.webp"
import * as universidades from "../img/Diseno/Campana_universidades/*.webp"
import * as xp from "../img/Diseno/Campana_XP/*.webp"

const main = document.querySelector("main");
const cards = document.querySelectorAll(".project-card");
const imgContainer = document.querySelector(".img-container");
const overlay = document.querySelector(".overlay-diseno");

const hideGallery = function (e) {
  e.stopPropagation();
  if (window.screen.width <= 832) {
    overlay.style.top = null;
    main.style.touchAction = null;
  }

  if(e.key === "Escape" && e.type === "keydown"){
    overlay.classList.add("hidden-diseno");
    imgContainer.innerHTML = "";
  } else if (e.type === "click") {
    overlay.classList.add("hidden-diseno");
    imgContainer.innerHTML = "";
  }
}

const showGallery = function (e) {
  overlay.classList.remove("hidden-diseno");
  overlay.scrollTop = 0;
  if (window.screen.width <= 832) {
    overlay.style.top = `${0}px`;
    main.style.touchAction = "none";
  }
  const content = e.target.parentNode.dataset.content;

  switch (content) {
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
    case "corral":
      const keysCorral = Object.keys(corral);
      keysCorral.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = corral[k];
        imageElement.classList.add("img-tall");
        imgContainer.appendChild(imageElement);
      });
      break;
    case "frisby":
      const keysFrisby = Object.keys(frisby);
      keysFrisby.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = frisby[k];
        imageElement.classList.add("img-tall");
        imgContainer.appendChild(imageElement);
      });
      break;
    case "cordilleras":
      const keysCordilleras = Object.keys(cordilleras);
      keysCordilleras.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = cordilleras[k];
        imageElement.classList.add("img-tall");
        imgContainer.appendChild(imageElement);
      });
      break;
    case "universidades":
      const keysUniversidades = Object.keys(universidades);
      keysUniversidades.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = universidades[k];
        imageElement.classList.add("img-tall");
        imgContainer.appendChild(imageElement);
      });
      break;
    case "xp":
      const keysXP = Object.keys(xp);
      keysXP.forEach((k) => {
        const imageElement = document.createElement("img");
        imageElement.src = xp[k];
        imageElement.classList.add("img-tall");
        imgContainer.appendChild(imageElement);
      });
      break;
  }
};

cards.forEach((c) => {
  c.addEventListener("click", showGallery);
});

overlay.addEventListener("click", hideGallery);

window.addEventListener("keydown", hideGallery)

window.addEventListener("popstate", function (event) {
  event.preventDefault();
  // This event will be triggered when the user presses the "back" button
  console.log("Back button pressed");
});
