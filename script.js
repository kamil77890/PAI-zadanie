//miłego oglądania :D

document.addEventListener("DOMContentLoaded", () => {
  const songsContainer = document.querySelector("#songs");
  const rightAside = document.querySelector(".right-side");
  const wykonawca = document.querySelector(".wykonawca");
  const liked = document.querySelector(".liked");
  const favoritesButton = document.querySelector("#favoritesButton");
  const gentres = document.querySelector("#typeOfMusic");
  const form = document.querySelector("form");
  const favorites = document.querySelector("#favorites");
  const songsButton = document.querySelector("#songButton");
  const speedOfMusic = document.querySelector("#speedOfMusic");

  const music = [];
  const songs = new Set();

  const link =
    "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json";

  async function fetchAndDisplaySongs() {
    const response = await fetch(link);
    const data = await response.json();
    songsContainer.innerHTML = "";
    data.forEach((song) => {
      if (!songs.has(song.title)) {
        music.push(song);
        songs.add(song.title);
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
      }
    });
  }
  fetchAndDisplaySongs();

  function displayAllSongs() {
    songsContainer.style.display = "block";
    rightAside.style.display = "none";
    favorites.style.display = "none";

    songsContainer.innerHTML = "";

    music.forEach((song) => {
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

  songsButton.addEventListener("click", displayAllSongs);

  function displayFavoriteSongs() {
    songsContainer.style.display = "none";
    rightAside.style.display = "none";
    favorites.style.display = "block";
    sortLenght.innerHTML = "";
    favorites.innerHTML = "";

    music.forEach((song) => {
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
        favorites.appendChild(section);

        const likeButton = section.querySelector(".like img");
        likeButton.addEventListener("click", () =>
          handleLikeButtonClick(song, likeButton)
        );
      }
    });
  }

  function sortFunction(songs) {
    const sortedSongs = [...songs];
    sortedSongs.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
    return sortedSongs;
  }

  function displaySortedSongs(sortedSongs) {
    favorites.innerHTML = "";
    songsContainer.innerHTML = "";

    sortedSongs.forEach((song) => {
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

  const input = document.querySelector("#search");

  function inputFunction() {
    const searchedValue = input.value.toLowerCase();
    const elements = document.querySelectorAll(".song");

    elements.forEach((element) => {
      const songsContainer = element.textContent.toLowerCase();
      element.classList.toggle(
        "container__item--active",
        searchedValue && songsContainer.includes(searchedValue)
      );
    });
  }

  input.addEventListener("change", inputFunction);

  function showFavorites() {
    displayFavoriteSongs();
  }

  favoritesButton.addEventListener("click", displayFavoriteSongs);

  function infoFunction(song) {
    rightAside.style.display = "block";
    const titleElement = document.querySelector(".title");
    const backgroundElement = document.querySelector(".background");
    titleElement.querySelector("h1").innerHTML = song.title;
    backgroundElement.innerHTML = `<img class="background" src="${song.coverUrl}" alt="song" />`;

    const list = song.artists;
    wykonawca.innerHTML = list.join(", ");
    liked.innerHTML = `<img src="${
      song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
    }" alt="like"/>`;
  }

  function handleLikeButtonClick(song, likeButton) {
    song.liked = !song.liked;
    likeButton.src = song.liked
      ? "./img/heart-solid.svg"
      : "./img/heart-regular.svg";
  }

  async function styleMusic() {
    const response = await fetch(
      "https://gist.githubusercontent.com/techniadrian/6ccdb1c837d431bb84c2dfedbec2e435/raw/60783ebfa89c6fd658aaf556b9f7162553ac0729/genres.json"
    );
    const data = await response.json();
    data.forEach((song) => {
      if (song !== " ") {
        gentres.innerHTML += `<option value="${song}">${song}</option>`;
      }
    });
  }

  styleMusic();

  function search_song(event) {
    event.preventDefault();

    const searchValue = document.querySelector("#search").value.toLowerCase();
    const filtered = music.filter((song) => {
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
    const selectMusic = gentres.value;
    songsContainer.innerHTML = "";

    if (selectMusic === "All") {
      displayAllSongs();
    } else {
      const filtered = music.filter((song) => {
        return song.genre.includes(selectMusic);
      });

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
  }

  selectMusic.addEventListener("input", StyleMusic);

  const boxElements = document.querySelectorAll(".box");
  boxElements.forEach((box) => {
    box.addEventListener("click", () => {
      boxElements.forEach((element) => {
        element.classList.remove("activeElement");
      });

      box.classList.add("activeElement");
    });
  });

  function displayFilteredSongs(filtered) {
    if (filtered.length === 0) {
      alert("No idiota");
    } else {
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
    console.log("filtered songs", filtered);
  }

  function BPMSearch(songs, songsContainer, event) {
    event.preventDefault();
    const bpmValue = speedOfMusic.value;
    songsContainer.innerHTML = "";

    if (bpmValue === "All") {
      displayAllSongs();
    } else if (bpmValue === "Slow") {
      const filtered = songs.filter((song) => parseInt(song.bpm) < 100);
      displayFilteredSongs(filtered);
    } else if (bpmValue === "Medium") {
      const filtered = songs.filter((song) => {
        const bpm = parseInt(song.bpm);
        return bpm >= 100 && bpm <= 130;
      });
      displayFilteredSongs(filtered);
    } else if (bpmValue === "Fast") {
      const filtered = songs.filter((song) => parseInt(song.bpm) > 130);
      displayFilteredSongs(filtered);
    }
  }

  speedOfMusic.addEventListener("input", (event) => {
    BPMSearch(music, songsContainer, event);
  });
});
