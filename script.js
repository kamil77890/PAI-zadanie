const aside = document.querySelector("aside");
const openButton = document.querySelector("#open");
const usersPanel = document.querySelector(".users");

openButton.addEventListener("click", () => {
  aside.classList.toggle("aside-open");
  aside.classList.remove("aside-closed");
  usersPanel.classList.remove("users-visible");
});

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click", () => {
  aside.classList.toggle("aside-closed");
  aside.classList.remove("aside-open");
  usersPanel.classList.toggle("users-visible");
});
