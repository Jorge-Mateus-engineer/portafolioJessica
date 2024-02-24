const track = document.getElementById("image-track");
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
