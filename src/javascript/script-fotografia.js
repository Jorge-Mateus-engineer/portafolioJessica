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

handleButtonClick = (e) => {
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

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

/*Gallery Overlay */

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
  galleryImg.src = " ";
  overlay.classList.add("hidden-photo");
  removeDimensions();
};

imageList.forEach((image) => {
  image.addEventListener("click", showGallery);
});

overlay.addEventListener("click", hideGallery);
