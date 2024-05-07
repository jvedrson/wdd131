const buttonMenu = document.querySelector("#menu");
const navbar = document.querySelector(".navigation");

buttonMenu.addEventListener("click", () => {
  navbar.classList.toggle("open");
  buttonMenu.classList.toggle("open");
});
