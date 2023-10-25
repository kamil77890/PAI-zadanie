document.addEventListener("DOMContentLoaded", () => {
  const songsContainer = document.querySelector("#songs");
  const rightAside = document.querySelector(".right-side");
  const wykonawca = document.querySelector(".wykonawca");
  const liked = document.querySelector(".liked");
  const favoritesButton = document.querySelector("#favoritesButton");
  const gentres = document.querySelector("#typeOfMusic");
  const form = document.querySelector("form");
  const selectMusic = document.querySelector("#selectMusic");
  const favorites = document.querySelector("#favorites");

  const music = [];

  async function fetchAndDisplaySongs() {
    const response = await fetch(
      "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
    );
    const data = await response.json();

    data.forEach((song) => {
      const section = document.createElement("section");
      section.classList.add("song");
      section.innerHTML = `
        <span><img class="imgSongs" src="${song.coverUrl}" alt="song" /> ${
        song.title
      }</span>
        <span>${song.genre}</span>
        <span>${song.bpm}</span>
        <span>${song.duration}</span>
        <span class="like">
          <img src="${
            song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
          }" alt="like" data-liked="${song.liked}" />
        </span>`;

      section.addEventListener("click", () => infoFunction(song));
      songsContainer.appendChild(section);

      const likeButton = section.querySelector(".like img");
      likeButton.addEventListener("click", () =>
        handleLikeButtonClick(songs, likeButton)
      );
      music.push(song);
      const songs = music.map((song) => ({ ...song, liked: false }));
    });
  }

  fetchAndDisplaySongs();

  function handleLikeButtonClick(songs, likeButton) {
    songs.liked = !songs.liked;
    likeButton.src = songs.liked
      ? "./img/heart-solid.svg"
      : "./img/heart-regular.svg";
  }

  function showFavorites(songs) {
    const songsContainer = document.querySelector("#songs");
    const favorites = document.querySelector("#favorites");

    // Ukryj kontener zwykłych utworów
    songsContainer.style.display = "none";

    // Wyświetl kontener ulubionych utworów
    favorites.style.display = "flex";

    // Wyczyść wcześniejszą zawartość kontenera ulubionych
    favorites.innerHTML = "";

    // Przeiteruj przez wszystkie utwory
    songs.forEach((song) => {
      if (song.liked) {
        const section = document.createElement("section");
        section.classList.add("song");
        section.innerHTML = `
          <span><img class="imgSongs" src="${song.coverUrl}" alt="song" /> ${
          song.title
        }</span>
          <span>${song.genre}</span>
          <span>${song.bpm}</span>
          <span>${song.duration}</span>
          <span class="like">
            <img src="${
              song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
            }" alt="like" data-liked="${song.liked}" />
          </span>`;

        section.addEventListener("click", () => infoFunction(song));

        // Dodaj sekcję do kontenera ulubionych utworów
        favorites.appendChild(section);

        const likeButton = section.querySelector(".like img");
        likeButton.addEventListener("click", () =>
          handleLikeButtonClick(song, likeButton)
        );
      }
    });
  }

  favoritesButton.addEventListener("click", showFavorites);

  function infoFunction(song) {
    rightAside.style.display = "block";
    const titleElement = document.querySelector(".title");
    const backgroundElement = document.querySelector(".background");
    titleElement.querySelector("h1").innerHTML = song.title;
    backgroundElement.innerHTML = `<img class="background" src="${song.coverUrl}" alt="song" />`;
    const list = song.artists;
    wykonawca.innerHTML = "";
    list.forEach((artist, index) => {
      if (index > 0) {
        wykonawca.innerHTML += ", ";
      }
      wykonawca.innerHTML += artist;
    });
    liked.innerHTML = `<img src="${
      song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
    }" alt="like"/>`;
  }

  async function styleMusic() {
    const responce = await fetch(
      "https://gist.githubusercontent.com/techniadrian/6ccdb1c837d431bb84c2dfedbec2e435/raw/60783ebfa89c6fd658aaf556b9f7162553ac0729/genres.json"
    );
    const data = await responce.json();
    data.forEach((song) => {
      if (song !== " ") {
        gentres.innerHTML += `<option value="${song}">${song}</option>`;
      }
    });
  }

  styleMusic();
  //-----------beta testy----------------
  function search_song(event) {
    event.preventDefault();

    const searchValue = document.querySelector("#search").value.toLowerCase();

    const filtered = songs.filter((song) => {
      return song.title.toLowerCase().includes(searchValue);
    });

    songsContainer.innerHTML = "";
    filtered.forEach((song) => {
      const section = document.createElement("section");
      section.classList.add("song");
      section.innerHTML = `
        <span><img class="imgSongs" src="${song.coverUrl}" alt="song" /> ${
        song.title
      }</span>
        <span>${song.genre}</span>
        <span>${song.bpm}</span>
        <span>${song.duration}</span>
        <span class="like">
          <img src="${
            song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
          }" alt="like" data-liked="${song.liked}" />
        </span>`;

      section.addEventListener("click", () => infoFunction(song));
      songsContainer.appendChild(section);

      const likeButton = section.querySelector(".like img");
      likeButton.addEventListener("click", () =>
        handleLikeButtonClick(song, likeButton)
      );
    });
  }

  form.addEventListener("submit", search_song);

  function StyleMusic(event) {
    event.preventDefault();
    const selectMusic = document.querySelector("#typeOfMusic").value;
    const filtered = songs.filter((song) => {
      return song.genre.includes(selectMusic);
    });
    if (selectMusic === "All") {
      songsContainer.innerHTML = "";
      filtered = fetchAndDisplaySongs();
    }
    songsContainer.innerHTML = "";
    filtered.forEach((song) => {
      const section = document.createElement("section");
      section.classList.add("song");
      section.innerHTML = `
        <span><img class="imgSongs" src="${song.coverUrl}" alt="song" /> ${
        song.title
      }</span>
      <span>${song.genre}</span>
      <span>${song.bpm}</span>
      <span>${song.duration}</span>
      <span class="like">
        <img src="${
          song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
        }" alt="like" data-liked="${song.liked}" />
      </span>`;

      section.addEventListener("click", () => infoFunction(song));
      songsContainer.appendChild(section);

      const likeButton = section.querySelector(".like img");
      likeButton.addEventListener("click", () =>
        handleLikeButtonClick(song, likeButton)
      );
    });
  }

  selectMusic.addEventListener("change", StyleMusic);
});
