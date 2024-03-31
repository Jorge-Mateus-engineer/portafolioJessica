const track = document.getElementById("image-track");
const imageList = document.querySelectorAll(".image");
const overlay = document.querySelector(".gallery-overlay");
const imgContainer = document.querySelector(".img-container");
const galleryImg = document.getElementById("gallery-img");
const galleryButtons = document.querySelectorAll(".gallery-arrow");

let galleryIndex;
let isDragging = false;
let scale = 1.0;
let xDownAt = 0;
let yDownAt = 0;
let prevXPercentage = 0;
let prevYPercentage = 0;
let percentageXImg = 0;
let percentageYImg = 0;

const resetZoomParams = () => {
  xDownAt = 0;
  yDownAt = 0;
  prevXPercentage = 0;
  prevYPercentage = 0;
  percentageXImg = 0;
  percentageYImg = 0;

  galleryImg.animate(
    {
      transform: `scale(1)`,
    },
    { duration: 100, fill: "forwards" }
  );
};

const setDimensions = () => {
  const width = galleryImg.naturalWidth;
  const height = galleryImg.naturalHeight;

  if (width > height) {
    galleryImg.style.width = "100%";
  } else {
    galleryImg.style.height = "100%";
  }
};

const removeDimensions = () => {
  galleryImg.style.width = null;
  galleryImg.style.height = null;
};

const showGallery = (e) => {
  galleryIndex = e.target.dataset.index * 1;
  galleryImg.src = e.target.src;
  setDimensions();
  overlay.classList.remove("hidden-photo");
};

const hideGallery = (e) => {
  if (
    e.target.tagName === "IMG" ||
    e.target.tagName === "svg" ||
    e.target.tagName === "path"
  )
    return;
  galleryImg.src = " ";
  overlay.classList.add("hidden-photo");
  removeDimensions();
  resetZoomParams();
};

const changePage = (direction) => {
  let src;
  if (direction == 0) {
    galleryIndex = galleryIndex - 1 <= 0 ? imageList.length : galleryIndex - 1;
  } else if (direction == 1) {
    galleryIndex = galleryIndex + 1 > imageList.length ? 1 : galleryIndex + 1;
  }
  removeDimensions();
  imageList.forEach((img) => {
    if (parseInt(img.dataset.index) == galleryIndex) {
      galleryImg.src = img.src;
    }
  });

  // galleryImg.src = src;

  setDimensions();
  resetZoomParams();
};

const handleMouseOver = (e) => {
  if (e.target.tagName === "IMG") {
    e.target.addEventListener("wheel", handleWheel);
  }
};

function handleWheel(e) {
  /*PreventDefault para evitar el scrolleo por defecto */
  e.preventDefault();
  /*Mapear la cantidad total de scroll con la escala junto con un factor de ajuste para suavizar el zoom */
  scale += e.deltaY * -0.002;
  /*Poner limites a la escala para evitar zoom exesivo */
  scale = Math.min(Math.max(1, scale), 3);
  /*Animar la imagen para mantener la suavidad del movimiento */
  galleryImg.animate(
    {
      transform: `scale(${scale})`,
    },
    { duration: 200, fill: "forwards" }
  );
}

function handleMouseDown(e) {
  isDragging = true;
  if (scale > 1) {
    /*Obtener las coordenadas iniciales del cursor */
    [xDownAt, yDownAt] = [e.clientX, e.clientY];
  }
}

function handleMouseMove(e) {
  if (isDragging) {
    /*Solo permitir el movimiento cuando el cursor se haya movido */
    if (xDownAt == "0" || yDownAt == "0") return;
    /*Solo permitir el movimiento de la imagen cuando hay zoom */
    if (scale > 1) {
      /*Calcular los delta absolutos en ambas direcciones */
      const [deltaX, deltaY] = [
        parseFloat(xDownAt) - e.clientX,
        parseFloat(yDownAt) - e.clientY,
      ];
      /*Calcular el maximo desplazamiento con base a las dimensiones escaladas de la imagen */
      const [maxDeltaX, maxDeltaY] = [
        (galleryImg.offsetWidth * scale) / 2, //Ancho para X
        (galleryImg.offsetHeight * scale) / 2, //Altura para Y
      ];
      /*Calcular el porcentage de desplazamiento con base a los deltas */
      const [percentageX, percentageY] = [
        (deltaX / maxDeltaX) * -100,
        (deltaY / maxDeltaY) * -100,
      ];
      /*Calcular el procentage final de dezplacamiento con base a el valor de algun desplazamiento previo */
      const [nextPercentageX, nextPercentageY] = [
        prevXPercentage + percentageX,
        prevYPercentage + percentageY,
      ];
      /*Guardar los nuevos porcentages de desplazamiento */
      [percentageXImg, percentageYImg] = [nextPercentageX, nextPercentageY];
      /*Animar la imagen para un resultado mas suave */
      galleryImg.animate(
        {
          transform: `scale(${scale}) translate(${nextPercentageX}%, ${nextPercentageY}%)`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  }
}

function handleMouseUp() {
  isDragging = false;
  if (scale > 1) {
    /*Re iniciar condiciones iniciales para calculo de deltas */
    [xDownAt, yDownAt] = ["0", "0"];
    /*Guardar el ultimo porcentage de desplazamiento para calculo de nuevos desplazamientos */
    [prevXPercentage, prevYPercentage] = [percentageXImg, percentageYImg];
  }
}

imageList.forEach((image) => {
  image.addEventListener("click", showGallery);
});

overlay.addEventListener("click", hideGallery);

overlay.addEventListener("mouseover", handleMouseOver);

galleryButtons.forEach((b) =>
  b.addEventListener("click", (e) => {
    let pathDir;
    if (e.target.tagName === "path") {
      pathDir = e.target.parentNode.classList[1];
    }
    if (
      e.target.classList[1] == "left" ||
      pathDir == "left" ||
      e.key == "ArrowLeft"
    ) {
      changePage(0);
    } else if (
      e.target.classList[1] == "right" ||
      pathDir == "right" ||
      e.key == "ArrowRight"
    ) {
      changePage(1);
    }
  })
);

imgContainer.addEventListener("mousedown", handleMouseDown);

imgContainer.addEventListener("mousemove", handleMouseMove);

imgContainer.addEventListener("mouseup", handleMouseUp);

if (window.screen.width <= 736) {
  let initialTouch;
  let finalTouch;
  let touchCount;

  overlay.addEventListener("touchstart", (e) => {
    touchCount = e.touches.length;
    initialTouch = e.changedTouches[0].clientX;
  });

  overlay.addEventListener("touchend", (e) => {
    if (touchCount > 1) return;
    finalTouch = e.changedTouches[0].clientX;
    if (Math.abs(finalTouch - initialTouch) >= window.screen.width * 0.15) {
      if (finalTouch < initialTouch) {
        changePage(1);
      } else {
        changePage(0);
      }
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("hidden-photo")) {
    if (e.key === "Escape") {
      hideGallery(e);
    } else if (e.key == "ArrowLeft") {
      changePage(0);
    } else if (e.key == "ArrowRight") {
      changePage(1);
    }
  }
});
