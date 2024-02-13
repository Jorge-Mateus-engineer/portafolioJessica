const track = document.getElementById("image-track");
const imageList = document.querySelectorAll(".image");
const galleryImg = document.getElementById("gallery-img");
const overlay = document.querySelector(".gallery-overlay");

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
  overlay.classList.remove("hidden");
};

const hideGallery = (e) => {
  galleryImg.src = " ";
  overlay.classList.add("hidden");
  removeDimensions();
};

imageList.forEach((image) => {
  image.addEventListener("click", showGallery);
});

overlay.addEventListener("click", hideGallery);
