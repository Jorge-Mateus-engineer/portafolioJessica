//Importar colorThief y crear una instancia

import ColorThief from "../node_modules/colorthief/dist/color-thief.mjs";

const colorThief = new ColorThief();

//Declaracion de Variables

const imagenes = document.querySelectorAll(".img-el");
const titulo = document.querySelector("h1");
const navList = document.querySelector(".nav-list");
const galeriaPrincipal = document.querySelector(".main-gallery");
const pantallaDeCarga = document.querySelector(".loading-screen");
const overlay = document.querySelector(".overlay-gallery");
const imagenGaleria = document.getElementById("gallery-img");
const pagination = document.querySelector(".pagination");
const flechasGaleria = document.querySelectorAll(".gallery-arrow");
let pageIcons;
let galleryIndex;

//Quitar pagina de carga cuando las imagenes esten listas

setTimeout(() => {
  galeriaPrincipal.style.display = "grid";
  pantallaDeCarga.style.display = "none";
}, 2500);

//Crear los iconos de paginacion con base a la cantidad total de imagenes

const addPagination = () => {
  let i = imagenes.length;
  imagenes.forEach(() => {
    pagination.insertAdjacentHTML(
      "afterbegin",
      `<div class="pagination-icon" data-pag=${i}></div>`
    );
    i--;
  });
};

addPagination();

//Seleccionar todos los iconos creados

pageIcons = document.querySelectorAll(".pagination-icon");

//Funcion para seleccionar el icono correspondiente al indice de la imagen seleccionada

const paginationStart = () => {
  pageIcons.forEach((icon) => {
    if (icon.dataset.pag === imagenGaleria.dataset.index)
      icon.style.backgroundColor = "#48d1bf";
  });
};

//Funcion para regresar los iconos a su estado normal al cerrar la galeria

const paginationClear = () => {
  pageIcons.forEach((icon) => (icon.style.backgroundColor = "transparent"));
};

const firstImageFrame = () => {
  if (imagenGaleria.dataset.index == "1") {
    imagenGaleria.style.border = "1px solid white";
  } else {
    imagenGaleria.style.border = "1px solid var(--greys-color)";
  }
};

//Funcion para mostrar la galeria

const showGallery = (e) => {
  const topPosition = window.scrollY;
  const capturedColor = colorThief.getColor(e.target);
  imagenGaleria.src = e.target.src;
  imagenGaleria.dataset.index = e.target.dataset.index;
  overlay.style.top = `${topPosition}px`;
  overlay.style.display = "flex";
  overlay.style.backgroundColor = `rgba(${capturedColor[0]},${capturedColor[1]},${capturedColor[2]}, 0.9)`;
  navList.style.marginRight = "7rem";
  titulo.style.marginRight = "1rem";
  overlay.classList.remove("hidden");
  document.documentElement.style.overflow = "hidden";
  firstImageFrame();
  paginationStart();
};

//Funcion para ocultar la galeria

const hideGallery = () => {
  overlay.classList.add("hidden");
  document.documentElement.style.overflow = "auto";
  navList.style.marginRight = "6rem";
  titulo.style.marginRight = "0rem";
  overlay.style.display = "none";
  overlay.classList.add("hidden");
  paginationClear();
};

//Agregar un event listener a todas las imagenes con el callback de msotrar la galeria

imagenes.forEach((img) => img.addEventListener("click", showGallery));

//Detener la propagacion del evento click en los iconos y la imagen

pageIcons.forEach((icon) =>
  icon.addEventListener("click", (e) => e.stopPropagation())
);

imagenGaleria.addEventListener("click", (e) => e.stopPropagation());

overlay.addEventListener("click", hideGallery);

//Implementacion de la paginacion

//Paginacion - logica general
//La direccion 1 es derecha, 0 es izquierda

const changePage = function (direccion, currentIndex) {
  let newColor;
  if (direccion === 1) {
    currentIndex =
      currentIndex + 1 > imagenes.length
        ? (currentIndex = 1)
        : currentIndex + 1;
    let nextImg = document.querySelector(`img[data-index="${currentIndex}"]`);
    imagenGaleria.src = nextImg.src;
    newColor = colorThief.getColor(nextImg);
  } else if (direccion === 0) {
    currentIndex =
      currentIndex - 1 <= 0
        ? (currentIndex = imagenes.length)
        : currentIndex - 1;
    let nextImg = document.querySelector(`img[data-index="${currentIndex}"]`);
    imagenGaleria.src = nextImg.src;
    newColor = colorThief.getColor(nextImg);
  }
  overlay.style.backgroundColor = `rgba(${newColor[0]},${newColor[1]},${newColor[2]}, 0.95)`;
  imagenGaleria.dataset.index = currentIndex;
  return currentIndex;
};

//Paginacion con los botones de flecha

flechasGaleria.forEach((flecha) =>
  flecha.addEventListener("click", (e) => {
    e.stopPropagation(); //Para que no se cierre el overlay
    paginationClear(); //Para reiniciar los iconos de paginacion
    if (!galleryIndex) {
      galleryIndex = parseInt(imagenGaleria.dataset.index);
    }
    console.log(`Starting: ${galleryIndex}`);
    if (e.currentTarget.classList.contains("right")) {
      galleryIndex = changePage(1, galleryIndex);
    } else if (e.currentTarget.classList.contains("left")) {
      galleryIndex = changePage(0, galleryIndex);
    }
    console.log(`Changed: ${galleryIndex}`);
    firstImageFrame();
    paginationStart();
  })
);

pageIcons.forEach((p) => {
  p.addEventListener("click", () => {
    paginationClear();
    p.style.backgroundColor = "#48d1bf";
    const img = document.querySelector(`img[data-index="${p.dataset.pag}"]`);
    const newColor = colorThief.getColor(img);
    overlay.style.backgroundColor = `rgba(${newColor[0]},${newColor[1]},${newColor[2]}, 0.95)`;
    imagenGaleria.src = img.src;
    galleryIndex = parseInt(p.dataset.pag);
    firstImageFrame();
  });
});

//Paginacion con las flechas del teclado y cerrar overlay con tecla esc

document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("hidden")) {
    if (e.key === "Escape") {
      hideGallery();
    } else {
      paginationClear(); //Para reiniciar los iconos de paginacion
      galleryIndex = parseInt(imagenGaleria.dataset.index);
      if (e.key === "ArrowRight") {
        galleryIndex = cambiarPagina(1, galleryIndex);
      } else if (e.key === "ArrowLeft") {
        galleryIndex = cambiarPagina(0, galleryIndex);
      }
      firstImageFrame();
      paginationStart();
    }
  }
});
