const diseño = document.querySelector(".p1");
const imgDiseño = document.querySelector(".img-diseño");
const tituloDiseño = document.querySelector(".titulo-diseño");
const ilustracion = document.querySelector(".p2");
const imgIlustracion = document.querySelector(".img-ilustracion");
const tituloIlustracion = document.querySelector(".titulo-ilustracion");
const fotografia = document.querySelector(".p3");
const imgFotografia = document.querySelector(".img-fotografia");
const tituloFotografia = document.querySelector(".titulo-fotografia");

//Event listeners para las animaciones basicas

diseño.addEventListener("mouseover", () => {
  imgDiseño.style.filter = "blur(5px)";
  ilustracion.style.transform = "translateX(10%)";
  fotografia.style.transform = "translateX(10%)";
  tituloDiseño.style.opacity = "1";
});

diseño.addEventListener("mouseout", () => {
  imgDiseño.style.filter = "blur(0)";
  ilustracion.style.transform = "translateX(0)";
  fotografia.style.transform = "translateX(0)";
});

ilustracion.addEventListener("mouseover", () => {
  imgIlustracion.style.filter = "blur(5px)";
  fotografia.style.transform = "translateX(10%)";
  tituloIlustracion.style.opacity = "1";
});

ilustracion.addEventListener("mouseout", () => {
  imgIlustracion.style.filter = "blur(0)";
  fotografia.style.transform = "translateX(0)";
});

fotografia.addEventListener("mouseover", () => {
  imgFotografia.style.filter = "blur(5px)";
  tituloFotografia.style.opacity = "1";
});

fotografia.addEventListener("mouseout", () => {
  imgFotografia.style.filter = "blur(0)";
});

//Event listeners para los hipervinculos

ilustracion.addEventListener("click", (e) => {
  const url = ilustracion.dataset.href;
  window.location.href = url;
});
