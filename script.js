const aside = document.querySelector("aside");
const openButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");
const songsContainer = document.querySelector("#songs");
const rightAside = document.querySelector(".right-side");

const songs = [];

async function fetchAndDisplaySongs() {
  const response = await fetch(
    "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
  );
  const data = await response.json();

  data.forEach((item) => {
    const section = document.createElement("section");
    section.classList.add("song");
    section.innerHTML = `
      <span><img class="imgSongs" src="${item.coverUrl}" alt="song" /> ${
      item.title
    }</span>
      <span>${item.genre}</span>
      <span>${item.bpm}</span>
      <span>${item.duration}</span>
      <span class="like">
        <img src="${
          item.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
        }" alt="like" data-liked="${item.liked}" />
      </span>`;

    section.addEventListener("click", () => infoFunction(item));
    songsContainer.appendChild(section);

    const likeButton = section.querySelector(".like img");
    likeButton.addEventListener("click", () =>
      handleLikeButtonClick(item, likeButton)
    );

    songs.push(item);
  });
}

fetchAndDisplaySongs();

function handleLikeButtonClick(song, likeButton) {
  if (song.liked) {
    likeButton.setAttribute("src", "./img/heart-regular.svg");
  } else {
    likeButton.setAttribute("src", "./img/heart-solid.svg");
  }
  song.liked = !song.liked;
}

// Search bar
function search_song() {
  let input = document.querySelector("input").value.toLowerCase();
  const songs = document.querySelectorAll(".song");

  songs.forEach((song) => {
    const title = song
      .querySelector("span:first-child")
      .textContent.toLowerCase();
    if (title.includes(input)) {
      song.style.display = "list-item";
    } else {
      song.style.display = "none";
    }
  });
}

function infoFunction(item) {
  rightAside.style.display = "block";
  const titleElement = document.querySelector(".title");
  const backgroundElement = document.querySelector(".background");
  titleElement.querySelector("h1").innerHTML = item.title;
  backgroundElement.innerHTML = `<img class="background" src="${item.coverUrl}" alt="song" />`;
}

// losowy kod z internetu
import lottieWeb from "https://cdn.skypack.dev/lottie-web";

const playIconContainer = document.getElementById("play-icon");
const audioPlayerContainer = document.getElementById("audio-player-container");
const seekSlider = document.getElementById("seek-slider");
const volumeSlider = document.getElementById("volume-slider");
const muteIconContainer = document.getElementById("mute-icon");
let playState = "play";
let muteState = "unmute";

const playAnimation = lottieWeb.loadAnimation({
  container: playIconContainer,
  path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/pause/pause.json",
  renderer: "svg",
  loop: false,
  autoplay: false,
  name: "Play Animation",
});

const muteAnimation = lottieWeb.loadAnimation({
  container: muteIconContainer,
  path: "https://maxst.icons8.com/vue-static/landings/animated-icons/icons/mute/mute.json",
  renderer: "svg",
  loop: false,
  autoplay: false,
  name: "Mute Animation",
});

playAnimation.goToAndStop(14, true);

playIconContainer.addEventListener("click", () => {
  if (playState === "play") {
    playAnimation.playSegments([14, 27], true);
    playState = "pause";
  } else {
    playAnimation.playSegments([0, 14], true);
    playState = "play";
  }
});

muteIconContainer.addEventListener("click", () => {
  if (muteState === "unmute") {
    muteAnimation.playSegments([0, 15], true);
    muteState = "mute";
  } else {
    muteAnimation.playSegments([15, 25], true);
    muteState = "unmute";
  }
});

const showRangeProgress = (rangeInput) => {
  if (rangeInput === seekSlider) {
    audioPlayerContainer.style.setProperty(
      "--seek-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  } else {
    audioPlayerContainer.style.setProperty(
      "--volume-before-width",
      (rangeInput.value / rangeInput.max) * 100 + "%"
    );
  }
};

seekSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
});
volumeSlider.addEventListener("input", (e) => {
  showRangeProgress(e.target);
});
