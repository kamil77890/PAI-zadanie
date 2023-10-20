document.addEventListener("DOMContentLoaded", () => {
  const songsContainer = document.querySelector("#songs");
  const rightAside = document.querySelector(".right-side");
  const wykonawca = document.querySelector(".wykonawca");
  const liked = document.querySelector(".liked");
  const favoritesButton = document.querySelector("#favorites");

  const songs = [];
  const favorites = [];

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
    song.liked = !song.liked;
    likeButton.src = song.liked
      ? "./img/heart-solid.svg"
      : "./img/heart-regular.svg";

    if (song.liked) {
      favorites.push(song);
    }
  }

  function showFavorites() {
    songsContainer.style.display = "none";
    favoritesButton.style.display = "flex";
    favorites.forEach((item) => {
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
      favoritesButton.appendChild(section);

      const likeButton = section.querySelector(".like img");
      likeButton.addEventListener("click", () =>
        handleLikeButtonClick(item, likeButton)
      );
    });
  }

  favoritesButton.addEventListener("click", showFavorites);

  function infoFunction(item) {
    rightAside.style.display = "block";
    const titleElement = document.querySelector(".title");
    const backgroundElement = document.querySelector(".background");
    titleElement.querySelector("h1").innerHTML = item.title;
    backgroundElement.innerHTML = `<img class="background" src="${item.coverUrl}" alt="song" />`;
    const list = item.artists;
    wykonawca.innerHTML = "";
    list.forEach((artist, index) => {
      if (index > 0) {
        wykonawca.innerHTML += ", ";
      }
      wykonawca.innerHTML += artist;
    });
    liked.innerHTML = `<img src="${
      item.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
    }" alt="like"/>`;
  }
});
