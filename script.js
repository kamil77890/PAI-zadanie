const aside = document.querySelector("aside");
const openButton = document.querySelector("#open");
const closeButton = document.querySelector("#close");
const songsContainer = document.querySelector("#songs");
const leftAside = document.querySelector(".right-side");

const songs = [];

openButton.addEventListener("click", () => {
  aside.classList.toggle("aside-open");
  aside.classList.remove("aside-closed");
  displayFlexSet();
});

closeButton.addEventListener("click", () => {
  aside.classList.toggle("aside-closed");
  aside.classList.remove("aside-open");
  displayNoneSet();
});

function displayNoneSet() {
  aside.style.display = "none";
}

function displayFlexSet() {
  aside.style.display = "flex";
}

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
  leftAside.style.display = "block";
  const titleElement = document.querySelector(".title");
  const backgroundElement = document.querySelector(".background");
  titleElement.querySelector("h1").innerHTML = item.title;
  backgroundElement.innerHTML = `<img class="background" src="${item.coverUrl}" alt="song" />`;
}
