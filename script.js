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
  const songsButton = document.querySelector("#songButton");
  const Artist = document.querySelector("#Artist");
  const artistContainer = document.querySelector("#artistContainer");
  const info = document.querySelector(".info");

  const music = [];
  const songs = [];

  async function fetchAndDisplaySongs() {
    const response = await fetch(
      "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
    );
    const data = await response.json();

    data.forEach((song) => {
      music.push(song);
      songs.push({ ...song, liked: false });
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
  songsButton.addEventListener("click", fetchAndDisplaySongs);
  fetchAndDisplaySongs();

  function ArtistShowFunction() {
    songsContainer.style.display = "none";
    info.style.display = "none";
    artistContainer.style.display = "flex";
    artistContainer.innerHTML = "";

    const artistsMap = new Map();

    songs.forEach((song) => {
      song.artists.forEach((artist) => {
        artistsMap.set(artist, song.coverUrl);
      });
    });

    artistsMap.forEach((img, artist) => {
      const section = document.createElement("section");
      section.classList.add("artist");
      section.style.backgroundImage = `url('${img}')`;
      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");
      textContainer.innerHTML = `<h2>${artist}</h2>`;
      section.appendChild(textContainer);
      artistContainer.appendChild(section);
    });
  }

  Artist.addEventListener("click", ArtistShowFunction);
  //   function showFavorites(songs) {
  //     songsContainer.style.display = "none";
  //     favorites.style.display = "flex";
  //     const likedSong = songs.map((song) => song.liked);
  //     const allLiked = likedSong.every((liked) => liked === true);
  //     favorites.innerHTML = "";
  //     songs.forEach((song) => {
  //       if (allLiked) {
  //         const section = document.createElement("section");
  //         section.classList.add("song");
  //         section.innerHTML = `
  //           <span><img class="imgSongs" src="${song.coverUrl}" alt="song" /> ${
  //           song.title
  //         }</span>
  //           <span>${song.genre}</span>
  //           <span>${song.bpm}</span>
  //           <span>${song.duration}</span>
  //           <span class="like">
  //             <img src="${
  //               song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
  //             }" alt="like" data-liked="${song.liked}" />
  //           </span>`;

  //         section.addEventListener("click", () => infoFunction(song));

  //         favorites.appendChild(section);

  //         const likeButton = section.querySelector(".like img");
  //         likeButton.addEventListener("click", () =>
  //           handleLikeButtonClick(song, likeButton)
  //         );
  //       }
  //     });
  //   }

  //   favoritesButton.addEventListener("click", showFavorites);

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
  function handleLikeButtonClick(song, likeButton) {
    song.liked = !song.liked;
    likeButton.innerHTML = song.liked
      ? '<img src="./img/heart-solid.svg" />'
      : '<img src="./img/heart-regular.svg" />';
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
  //   function search_song(event) {
  //     event.preventDefault();

  //     const searchValue = document.querySelector("#search").value.toLowerCase();

  //     const filtered = songs.filter((song) => {
  //       return song.title.toLowerCase().includes(searchValue);
  //     });

  //     songsContainer.innerHTML = "";
  //     filtered.forEach((song) => {
  //       const section = document.createElement("section");
  //       section.classList.add("song");
  //       section.innerHTML = `
  //         <span><img class="imgSongs" src="${song.coverUrl}" alt="song" /> ${
  //         song.title
  //       }</span>
  //         <span>${song.genre}</span>
  //         <span>${song.bpm}</span>
  //         <span>${song.duration}</span>
  //         <span class="like">
  //           <img src="${
  //             song.liked ? "./img/heart-solid.svg" : "./img/heart-regular.svg"
  //           }" alt="like" data-liked="${song.liked}" />
  //         </span>`;

  //       section.addEventListener("click", () => infoFunction(song));
  //       songsContainer.appendChild(section);

  //       const likeButton = section.querySelector(".like img");
  //       likeButton.addEventListener("click", () =>
  //         handleLikeButtonClick(song, likeButton)
  //       );
  //     });
  //   }

  //   form.addEventListener("submit", search_song);

  function StyleMusic(event) {
    event.preventDefault();
    const selectMusic = document.querySelector("#typeOfMusic").value;

    if (selectMusic === "All") {
      songsContainer.innerHTML = "";
      fetchAndDisplaySongs();
    } else {
      const filtered = music.filter((song) => {
        return song.genre.includes(selectMusic);
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
  }

  selectMusic.addEventListener("change", StyleMusic);

  const boxElements = document.querySelectorAll(".box");
  boxElements.forEach((box) => {
    box.addEventListener("click", () => {
      boxElements.forEach((element) => {
        element.classList.remove("activeElement");
      });

      box.classList.add("activeElement");
    });
  });
});
