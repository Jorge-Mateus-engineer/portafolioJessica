const diseno = document.querySelector(".p1");
const ilustracion = document.querySelector(".p2");
const fotografia = document.querySelector(".p3");

const logoInstagram = document.querySelector(".insta-logo");
const dropdown = document.querySelector(".dropdown-insta");

//Event listeners para las animaciones basicas

if (window.screen.width >= 736) {
  diseno.addEventListener("mouseover", (e) => {
    ilustracion.style.transform = "translateX(10%)";
    fotografia.style.transform = "translateX(10%)";
    ilustracion.style.filter = "blur(5px)";
    fotografia.style.filter = "blur(5px)";
  });

  diseno.addEventListener("mouseout", () => {
    ilustracion.style.transform = "translateX(0)";
    fotografia.style.transform = "translateX(0)";
    ilustracion.style.filter = null;
    fotografia.style.filter = null;
  });

  ilustracion.addEventListener("mouseover", () => {
    fotografia.style.transform = "translateX(10%)";
    diseno.style.filter = "blur(5px)";
    fotografia.style.filter = "blur(5px)";
  });

  ilustracion.addEventListener("mouseout", () => {
    fotografia.style.transform = "translateX(0)";
    diseno.style.filter = null;
    fotografia.style.filter = null;
  });

  fotografia.addEventListener("mouseover", () => {
    fotografia.style.transform = "translateX(-15%)";
    diseno.style.filter = "blur(5px)";
    ilustracion.style.filter = "blur(5px)";
  });

  fotografia.addEventListener("mouseout", () => {
    fotografia.style.transform = "translateX(0)";
    diseno.style.filter = null;
    ilustracion.style.filter = null;
  });
}
//Event listeners para los hipervinculos

ilustracion.addEventListener("click", (e) => {
  const url = ilustracion.dataset.href;
  window.location.href = url;
});

fotografia.addEventListener("click", (e) => {
  const url = fotografia.dataset.href;
  window.location.href = url;
});

diseno.addEventListener("click", (e) => {
  const url = diseno.dataset.href;
  window.location.href = url;
});

//Mostrar el menu dropdown de links de instagram

logoInstagram.addEventListener("click", () => {
  dropdown.classList.toggle("hidden-dropdown");
});
