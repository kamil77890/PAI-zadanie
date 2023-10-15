const aside = document.querySelector("aside");
const openButton = document.querySelector("#open");

openButton.addEventListener("click", () => {
  aside.classList.toggle("aside-open");
  aside.classList.remove("aside-closed");
  setInterval(displayFlexSet, 5);
});

const closeButton = document.querySelector("#close");

closeButton.addEventListener("click", () => {
  aside.classList.toggle("aside-closed");
  aside.classList.remove("aside-open");
  setInterval(displayNoneSet, 511);
});

function displayNoneSet() {
  aside.style.display = "none";
}
function displayFlexSet() {
  aside.style.display = "flex";
}

const songsContainer = document.querySelector("#songs");

async function songs() {
  const json = await fetch(
    "https://gist.githubusercontent.com/techniadrian/c39f844edbacee0439bfeb107227325b/raw/81eec7847b1b3dfa1c7031586405c93e9a9c1a2d/songs.json"
  );
  const response = await json.json();
  response.forEach((item) => {
    item = + songsContainer;
  });
}
songs();
