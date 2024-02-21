const track = document.getElementById("image-track");
const imageList = document.querySelectorAll(".image");
const galleryImg = document.getElementById("gallery-img");
const overlay = document.querySelector(".gallery-overlay");
const buttons = document.querySelectorAll(".arrow");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

const handleButtonClick = (e) => {
  const direction = e.target.dataset.direction * 1;
  const currentPercentage = track.dataset.percentage * 1;
  const displacement =
    direction == 1 ? currentPercentage * 1 - 5 : currentPercentage * 1 + 5;

  if (currentPercentage >= 0 && direction == 0) return;
  if (currentPercentage <= -100 && direction == 1) return;
  track.animate(
    {
      transform: `translate(${displacement}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + displacement}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
  track.dataset.percentage = `${displacement}`;
  track.dataset.prevPercentage = currentPercentage;
};

buttons.forEach((b) => b.addEventListener("click", handleButtonClick));

/* -- For touch events -- */

track.onmousedown = (e) => handleOnDown(e);

track.ontouchstart = (e) => handleOnDown(e.touches[0]);

track.onmouseup = (e) => handleOnUp(e);

track.ontouchend = (e) => handleOnUp(e.touches[0]);

track.onmousemove = (e) => handleOnMove(e);

track.ontouchmove = (e) => handleOnMove(e.touches[0]);

/*Gallery Overlay */

let isDragging = false;
let startY;
let startX;
let startScrollTop;
let startScrollLeft;

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
  galleryImg.src = e.target.src;
  setDimensions();
  overlay.classList.remove("hidden-photo");
};

const hideGallery = (e) => {
  if (e.target.tagName === "IMG") return;
  galleryImg.src = " ";
  overlay.classList.add("hidden-photo");
  galleryImg.style.transform = `scale(1)`;
  removeDimensions();
};

const handleMouseOver = (e) => {
  if (e.target.tagName === "IMG") {
    e.target.addEventListener("wheel", handleWheel);
  }
};

function handleWheel(e) {
  e.preventDefault();
  let scale = 1.0;
  scale += e.deltaY * -0.02;
  scale = Math.min(Math.max(0.8, scale), 3);
  galleryImg.style.transform = `scale(${scale})`;
}

function handleMouseDown(e) {
  isDragging = true;
  startY = e.clientY;
  startX = e.clientX;
  startScrollTop = overlay.scrollTop;
  startScrollLeft = overlay.scrollLeft;
}

function handleMouseMove(e) {
  if (isDragging) {
    const deltaY = e.clientY - startY;
    const deltaX = e.clientX - startX;
    overlay.scrollTop = startScrollTop - deltaY;
    overlay.scrollLeft = startScrollLeft - deltaX;
  }
}

function handleMouseUp() {
  isDragging = false;
}

imageList.forEach((image) => {
  image.addEventListener("click", showGallery);
});

overlay.addEventListener("click", hideGallery);

overlay.addEventListener("mouseover", handleMouseOver);

overlay.addEventListener("mousedown", handleMouseDown);

document.addEventListener("mousemove", handleMouseMove);

document.addEventListener("mouseup", handleMouseUp);
