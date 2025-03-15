//Importar colorThief y crear una instancia

import ColorThief from "colorthief";

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
const tituloGaleria = document.querySelector(".img-tittle");
const columnOne = document.querySelector(".col1");
const columnTwo = document.querySelector(".col2");
const columnThree = document.querySelector(".col3");
const columns = [columnOne, columnTwo, columnThree];
let pageIcons;
let galleryIndex;

const tittles = [
  {
    index: 1,
    texto: "Lista para la semana",
  },
  {
    index: 2,
    texto: "Piquero Camanay",
  },
  {
    index: 3,
    texto: "Travesura",
  },
  {
    index: 4,
    texto: "PEQUEÑA - Tabla de personaje",
  },
  {
    index: 5,
    texto: "POLLO - Tabla de personaje",
  },
  {
    index: 6,
    texto: "Portarretrato de tres monitos",
  },
  {
    index: 7,
    texto: "Retrato XURY 1",
  },
  {
    index: 8,
    texto: "Retrato XURY",
  },
  {
    index: 9,
    texto: "Sobre un Conejo",
  },
  {
    index: 10,
    texto: "POLLO - Tabla de poses",
  },
  {
    index: 11,
    texto: "La melena de Leo 2",
  },
  {
    index: 12,
    texto: "La melena de Leo 1",
  },
  {
    index: 13,
    texto: "La melena de Leo 3",
  },
  {
    index: 14,
    texto: "La Melena de Leo muckup open",
  },
];

const initGallery = () => {
  /*Ordenar imagenes por indice*/
  const imageArray = Array.prototype.slice.call(imagenes, 0).sort((a, b) => {
    const indexA = parseInt(a.dataset.index);
    const indexB = parseInt(b.dataset.index);
    return indexA - indexB;
  });
  /*Remover contenido de columnas */
  columns.forEach((c) => (c.innerHTML = ""));

  if (window.screen.width > 896) {
    imageArray.forEach((img, i) => {
      if (img.dataset.index == 14) {
        columnThree.appendChild(img);
      } else {
        const parent = columns[i % columns.length];
        parent.appendChild(img);
      }
    });
  }
  if (window.screen.width <= 896 && window.screen.width > 592) {
    /* 2 columnas */
    imageArray.forEach((img) => {
      if ((img.dataset.index * 1) % 2 != 0) {
        columnOne.appendChild(img);
      } else {
        columnTwo.appendChild(img);
      }
    });
  }

  /*1 columna */
  if (window.screen.width <= 592) {
    imageArray.forEach((img) => {
      columnOne.appendChild(img);
    });
  }
};

//Quitar pagina de carga cuando las imagenes esten listas

setTimeout(() => {
  galeriaPrincipal.style.display = "grid";
  pantallaDeCarga.style.display = "none";
}, 1500);

//Crear los iconos de paginacion con base a la cantidad total de imagenes

const addPagination = () => {
  if (window.screen.width <= 896) return;
  let i = imagenes.length;
  imagenes.forEach(() => {
    pagination.insertAdjacentHTML(
      "afterbegin",
      `<div class="pagination-icon" data-page=${i}></div>`
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
    if (icon.dataset.page === imagenGaleria.dataset.index)
      icon.style.backgroundColor = "#48d1bf";
  });
};

//Funcion para regresar los iconos a su estado normal al cerrar la galeria

const paginationClear = () => {
  pageIcons.forEach((icon) => (icon.style.backgroundColor = "transparent"));
};

//Funcion para agregar los textos a la galeria

const addTextToGallery = function () {
  const text = tittles.filter((i) => i.index == galleryIndex);
  tituloGaleria.textContent = text[0].texto;
};

//Funcion para mostrar la galeria

const showGallery = (e) => {
  galleryIndex = e.target.dataset.index * 1;
  const topPosition = window.scrollY;
  const capturedColor = colorThief.getColor(e.target);
  imagenGaleria.src = e.target.src;
  imagenGaleria.dataset.index = e.target.dataset.index;
  overlay.style.top = `${topPosition}px`;
  overlay.style.display = "flex";
  overlay.style.backgroundColor = `rgba(${capturedColor[0]},${capturedColor[1]},${capturedColor[2]}, 0.95)`;
  navList.style.marginRight = "7rem";
  titulo.style.marginRight = "1rem";
  overlay.classList.remove("hidden");
  document.documentElement.style.overflow = "hidden";
  paginationStart();
  addTextToGallery();
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
        : currentIndex * 1 + 1;
    let nextImg = document.querySelector(`img[data-index="${currentIndex}"]`);
    imagenGaleria.src = nextImg.src;
    newColor = colorThief.getColor(nextImg);
  } else if (direccion === 0) {
    currentIndex =
      currentIndex - 1 <= 0
        ? (currentIndex = imagenes.length)
        : currentIndex * 1 - 1;
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
    if (e.currentTarget.classList.contains("right")) {
      galleryIndex = changePage(1, galleryIndex);
    } else if (e.currentTarget.classList.contains("left")) {
      galleryIndex = changePage(0, galleryIndex);
    }
    paginationStart();
    addTextToGallery();
  })
);

pageIcons.forEach((p) => {
  p.addEventListener("click", () => {
    paginationClear();
    p.style.backgroundColor = "#48d1bf";
    const img = document.querySelector(`img[data-index="${p.dataset.page}"]`);
    const newColor = colorThief.getColor(img);
    overlay.style.backgroundColor = `rgba(${newColor[0]},${newColor[1]},${newColor[2]}, 0.95)`;
    imagenGaleria.src = img.src;
    galleryIndex = p.dataset.page * 1;
    imagenGaleria.dataset.index = p.dataset.page * 1;
    addTextToGallery();
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
        galleryIndex = changePage(1, galleryIndex);
      } else if (e.key === "ArrowLeft") {
        galleryIndex = changePage(0, galleryIndex);
      }
      paginationStart();
      addTextToGallery();
    }
  }
});

initGallery();

window.addEventListener("resize", initGallery);

/*Gestos de la galeria en pantallas tactiles */

let initialTouch;
let finalTouch;

imagenGaleria.addEventListener("touchstart", (e) => {
  initialTouch = e.changedTouches[0].clientX;
});

imagenGaleria.addEventListener("touchend", (e) => {
  finalTouch = e.changedTouches[0].clientX;
  if (Math.abs(finalTouch - initialTouch) >= window.screen.width * 0.15) {
    if (finalTouch < initialTouch) {
      galleryIndex = changePage(1, galleryIndex);
    } else {
      galleryIndex = changePage(0, galleryIndex);
    }
  }
  addTextToGallery();
});
