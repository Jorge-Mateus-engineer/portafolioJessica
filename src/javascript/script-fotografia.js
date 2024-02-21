const track = document.getElementById("image-track");
const imageList = document.querySelectorAll(".image");
const galleryImg = document.getElementById("gallery-img");
const imgContainer = document.querySelector(".img-container");
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
let scale = 1.0;

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
  galleryImg.animate(
    {
      transform: `scale(1)`,
    },
    { duration: 100, fill: "forwards" }
  );
  removeDimensions();
  Object.keys(galleryImg.dataset).forEach((key) => {
    galleryImg.dataset[key] = "0";
  });
};

const handleMouseOver = (e) => {
  if (e.target.tagName === "IMG") {
    e.target.addEventListener("wheel", handleWheel);
  }
};

function handleWheel(e) {
  e.preventDefault();
  scale += e.deltaY * -0.002;
  scale = Math.min(Math.max(0.8, scale), 3);
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
    galleryImg.dataset.xDownAt = e.clientX;
    galleryImg.dataset.yDownAt = e.clientY;
  }
}

function handleMouseMove(e) {
  if (isDragging) {
    if (galleryImg.dataset.xDownAt == "0" || galleryImg.dataset.yDownAt == "0")
      return;
    if (scale > 1) {
      const deltaX = parseFloat(galleryImg.dataset.xDownAt) - e.clientX;
      const deltaY = parseFloat(galleryImg.dataset.yDownAt) - e.clientY;
      const maxDeltaX = (galleryImg.offsetWidth * scale) / 2;
      const maxDeltaY = (galleryImg.offsetHeight * scale) / 2;
      const percentageX = (deltaX / maxDeltaX) * -100;
      const percentageY = (deltaY / maxDeltaY) * -100;
      const nextPercentageX =
        parseFloat(galleryImg.dataset.prevXPercentage) + percentageX;
      const nextPercentageY =
        parseFloat(galleryImg.dataset.prevYPercentage) + percentageY;
      galleryImg.dataset.percentageX = nextPercentageX;
      galleryImg.dataset.percentageY = nextPercentageY;
      galleryImg.animate(
        {
          transform: `scale(${scale}) translate(${nextPercentageX}%, ${nextPercentageY}%)`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  }
}

function handleMouseUp(e) {
  isDragging = false;
  if (scale > 1) {
    galleryImg.dataset.xDownAt = "0";
    galleryImg.dataset.yDownAt = "0";
    galleryImg.dataset.prevXPercentage = galleryImg.dataset.percentageX;
    galleryImg.dataset.prevYPercentage = galleryImg.dataset.percentageY;
  }
}

imageList.forEach((image) => {
  image.addEventListener("click", showGallery);
});

overlay.addEventListener("click", hideGallery);

overlay.addEventListener("mouseover", handleMouseOver);

imgContainer.addEventListener("mousedown", handleMouseDown);

imgContainer.addEventListener("mousemove", handleMouseMove);

imgContainer.addEventListener("mouseup", handleMouseUp);

document.addEventListener("keydown", (e) => {
  if (!overlay.classList.contains("hidden-photo")) {
    if (e.key === "Escape") {
      hideGallery(e);
    }
  }
});
