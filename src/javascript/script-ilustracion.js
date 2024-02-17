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
let pageIcons;
let galleryIndex;

const data = [
  {
    index: 1,
    texto:
      "Algo que vale la pena decir A veces no hay mucho más que decir que estás cansada y necesitas un empujón, por supuesto esto no debería ser motivo para dejar de estar estilizada y a la moda. Esta ilustración fue realizada en técnica de collage con trozos de periódico y algunos trozos de revista sobre cartulina iris. ",
  },
  {
    index: 2,
    texto:
      "Este divertido pingüino fue hecho con referencia fotográfica encontrada en instagram realizada con técnica de acuarela usando puntillismo, trazos largos y bolígrafos. ",
  },
  {
    index: 3,
    texto:
      "Pintura sobre cartón cartulina con pintura Tipo 1 utilizando colores complementarios de cálidos y fríos en alto contraste con el fondo de la imagen. ",
  },
  {
    index: 4,
    texto:
      "En algún lugar llegó el otoño con todas las variantes de marrón y naranja, permitiendo que el sol ilumine el lugar. Un ambiente perfecto para contemplar el paisaje. Pintura hecha con acuarelas sobre papel corrugado canson. ",
  },
  {
    index: 5,
    texto:
      "Cabeza de zorro dibujada con esferos de colores marca Bic con técnica de línea sobre línea.",
  },
  {
    index: 6,
    texto:
      "Pintura hecha con acuarelas sobre papel acuarela utilizando largos brochazos y puntillismo como técnica para dar textura a la imagen. La composición fue tomada de una imagen de referencia. ",
  },
  {
    index: 7,
    texto:
      "Era una vez un cuento de un conejo de nariz roja que saltaba por ahí en los jardines robando zanahorias. Collage utilizando revistas con imágenes de diferentes materiales sobre cartulina iris fucsia. ",
  },
  {
    index: 8,
    texto:
      "Bajo la iluminación de un atardecer sobre una costa de Italia hay una iglesia que es acariciada por el sol cada día. Imagen hecha con tiza sobre cartulina texturizada color fucsia",
  },
  {
    index: 9,
    texto:
      "Utilizando como inspiracion el canario coronado amarillo y teniendo en cuenta una gama de colores brillantes y calidos, se hizo el rediseño de Nico para ser la nueva mascota del mundial de fútbol de Brasil.",
  },
  {
    index: 10,
    texto:
      "En una época tan especial como lo es navidad, frecuentemente los retratos y la familia quiere ser inmortalizada. Este retrato fue hecho en Procreate con diferentes pinceles procurando ser fieles a los rasgos de cada uno de los integrantes, de sus gustos y las afinidades que tienen entre sí.",
  },
  {
    index: 12,
    texto:
      "Utilizando técnicas tradicionales como la pintura acrilica con tecnica de difumino mojado sobre mojado, se consiguen gradaciones de color para conseguir profundidad y textura en la imagen. Este juguetón amigo está sacando la lengua cual niño pequeño siendo un gesto enternecedor.",
  },
  {
    index: 13,
    texto:
      "En un ejercicio de hacer evidente la personalidad y los gustos de esta persona. Dos monitos, uno durmiendo y otro en contacto directo con la cara del personaje da a entender la relación que tienen y reflejan dos partes de la persona que pueden no verse solo con una foto a su cara.",
  },
  {
    index: 11,
    texto:
      "Al ir de viaje y no podemos ver el paisaje ni siquiera a lo lejos, veo solamente el clima interrumpido por los postes y sus fieles acompañantes los cables. El horizonte está altamente distorsionado por el clima. De manera tradicional la pintura está hecha en acrílico sobre papel Canson con textura.",
  },
  {
    index: 14,
    texto:
      "A modo caricatura con técnica tradicional, registrado en el tiempo, hay una chica que además de su cabello largo y saco, tiene curiosamente un tapabocas. En tinta china con técnica de pincel húmedo sobre papel acuarela está plasmada ella de manera rápida y espontánea.",
  },
];

//Quitar pagina de carga cuando las imagenes esten listas

setTimeout(() => {
  galeriaPrincipal.style.display = "grid";
  pantallaDeCarga.style.display = "none";
}, 1500);

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

//Funcion para agregar los textos a la galeria

const addTextToGallery = function () {
  const text = data.filter((i) => i.index == galleryIndex);
  textoGaleria.textContent = text[0].texto;
};

//Funcion para mostrar la galeria

const showGallery = (e) => {
  galleryIndex = e.target.dataset.index * 1;
  console.log(galleryIndex);
  const topPosition = window.scrollY;
  const capturedColor = colorThief.getColor(e.target);
  console.log(colorThief.getPalette(e.target, 5));
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
    console.log(galleryIndex);
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
      paginationStart();
    }
  }
});
