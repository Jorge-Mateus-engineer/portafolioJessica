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
const textoGaleria = document.querySelector(".img-text");
const columnOne = document.querySelector(".col1");
const columnTwo = document.querySelector(".col2");
const columnThree = document.querySelector(".col3");
const columns = [columnOne, columnTwo, columnThree];
let pageIcons;
let galleryIndex;

const data = [
  {
    index: 1,
    texto:
      "A veces no hay mucho que decir además de que estás cansada y necesitas un empujón, pero esto no debería ser motivo para dejar de estar estilizada y a la moda. Esta ilustración se realizó en técnica de collage con trozos de periódico y algunos fragmentos de revista sobre cartulina iris.",
  },
  {
    index: 2,
    texto:
      "Este divertido pingüino fue creado con una referencia fotográfica encontrada en Instagram. Utilicé la técnica de acuarela con puntillismo, trazos largos y bolígrafos.",
  },
  {
    index: 3,
    texto:
      "Pintura sobre cartón cartulina con pintura Tipo 1 utilizando colores complementarios cálidos y fríos en alto contraste con el fondo de la imagen.",
  },
  {
    index: 4,
    texto:
      "En algún lugar llegó el otoño iluminando el lugar y todos los diferentes tonos de marrón y naranja, Un ambiente perfecto para contemplar el paisaje. Pintura hecha con acuarelas sobre papel corrugado Canson.",
  },
  {
    index: 5,
    texto:
      "Cabeza de zorro dibujada con bolígrafo de punta de balín con técnica de línea sobre línea desde colores claros a los más oscuros. ",
  },
  {
    index: 6,
    texto:
      "Pintura hecha con acuarelas utilizando técnica de largas pinceladas y puntillismo para dar textura a la imagen. La composición se tomó de una imagen de referencia.",
  },
  {
    index: 7,
    texto:
      "Érase una vez un conejo de nariz roja que saltaba por ahí en los jardines robando zanahorias. Collage utilizando revistas con imágenes de diferentes materiales sobre cartulina iris.",
  },
  {
    index: 8,
    texto:
      "Bajo la luz de un atardecer sobre una costa de Italia, hay una iglesia que es acariciada por el sol cada día. Imagen hecha con tiza sobre cartulina texturizada.",
  },
  {
    index: 9,
    texto:
      "Utilizando como inspiracion el canario coronado amarillo, se hizo el rediseño de Nico para ser la nueva mascota del mundial de fútbol de Brasil. Un divertido amiguito que refleja el dinamismo que tiene el mundial con colores característicos del lugar.",
  },
  {
    index: 10,
    texto:
      "En una época tan especial como lo es navidad, frecuentemente la familia quiere ser inmortalizada. Este retrato fue hecho en Procreate con diferentes pinceles procurando ser fieles a las características de cada uno de los integrantes, de sus gustos y las afinidades que tienen entre sí con la calidez que tiene esta época del año.",
  },
  {
    index: 11,
    texto:
      "Utilizando técnicas tradicionales como la pintura acrilica con tecnica de difumino mojado sobre mojado, se consiguen gradaciones de color para conseguir profundidad y textura en la imagen. Este juguetón amigo está sacando la lengua tal como hacen muchos niños cuando juegan.",
  },
  {
    index: 14,
    texto:
      "En un ejercicio de hacer evidente la personalidad y los gustos de esta persona. Dos monitos, uno durmiendo y otro en contacto directo con la cara del personaje da a entender la relación que tienen y reflejan dos partes de la persona que pueden no verse solo con una foto de su cara.",
  },
  {
    index: 13,
    texto:
      "Al ir de viaje y no poder ver el paisaje ni siquiera a lo lejos, veo solamente el clima interrumpido por los postes y los cables como sus fieles acompañantes. El horizonte está altamente distorsionado por el clima. La pintura está hecha de manera tradicional en acrílico sobre papel Canson con textura.",
  },
  {
    index: 12,
    texto:
      "A modo caricatura con técnica tradicional, hay una chica que además de su cabello largo y saco, tiene curiosamente un tapabocas. En tinta china con técnica de pincel húmedo sobre papel acuarela está plasmada ella de manera rápida y espontánea.",
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
      const parent = columns[i % columns.length];
      parent.appendChild(img);
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

//Funcion para agregar los textos a la galeria

const addTextToGallery = function () {
  const text = data.filter((i) => i.index == galleryIndex);
  textoGaleria.textContent = text[0].texto;
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
    const img = document.querySelector(`img[data-index="${p.dataset.pag}"]`);
    const newColor = colorThief.getColor(img);
    overlay.style.backgroundColor = `rgba(${newColor[0]},${newColor[1]},${newColor[2]}, 0.95)`;
    imagenGaleria.src = img.src;
    galleryIndex = parseInt(p.dataset.pag);
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
