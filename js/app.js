import setLocalStorage from "./note.js";

// --------------------- theme ---------------------- //

const themeToggleBtn = document.querySelector(".theme-btn");
const ThemeBtn = document.querySelectorAll(".theme .btn");
const systemBtn = document.querySelector(".system-theme-btn");
let themeChooserVisible = false;

let setTheme = () => {
  document.querySelector(".theme").classList.add("screen--hidden");
  themeChooserVisible = false;
};

themeToggleBtn.addEventListener("click", () => {
  if (themeChooserVisible) {
    setTheme();
  } else if (!themeChooserVisible) {
    document.querySelector(".theme").classList.remove("screen--hidden");
    themeChooserVisible = true;
  }
});

ThemeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.body.setAttribute("data-theme", btn.getAttribute("data-value"));
    setTheme();
    localStorage.setItem("theme", btn.getAttribute("data-value"));
  });
});

let determineTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-theme", "dark");
  } else if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.setAttribute("data-theme", "light");
  }
};

systemBtn.addEventListener("click", () => {
  determineTheme();
  setTheme();
});

determineTheme();

// --------------------- profile choose ---------------------- //

// choosing profile ids first time

const profileChooser = document.querySelector(".profile-chooser");
const nameInput = document.querySelector("#name");
const profileImg = document.querySelectorAll(".profile-pic div img");
const okBtn = document.querySelector(".ok-btn");
const attributionContainer = document.querySelector(".attribution-container");

profileImg.forEach((img) => {
  img.addEventListener("click", () => {
    for (let x of profileImg) {
      x.classList.remove("selected");
    }
    img.classList.add("selected");
  });
});

okBtn.addEventListener("click", () => {
  if (nameInput.value == "" || nameInput.value == " ") {
    document.querySelector(".profile p").innerHTML == "userName";
  }

  document.querySelector(".profile p").innerHTML = nameInput.value;

  let src = document.querySelector(".selected").getAttribute("src");
  document.querySelector(".profile img").setAttribute("src", src);

  profileChooser.classList.add("display--none");
  setLocalStorage();
});

// changing the details

const profile = document.querySelector(".profile");

profile.addEventListener("click", () => {
  nameInput.value = document.querySelector(".profile p").innerHTML;
  profileImg.forEach((img) => {
    img.classList.remove("selected");
    if (
      img.getAttribute("src") ==
      document.querySelector(".profile img").getAttribute("src")
    ) {
      img.classList.add("selected");
    }
  });

  profileChooser.classList.remove("display--none");
});

// --------------------- side-bar ---------------------- //

const sidebar = document.querySelector(".side-bar");
const sidebarCloseBtn = document.querySelector(".close-btn");
const sidebarBtn = document.querySelector(".sidebar-menu-btn");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.add("translate-0");
});

sidebarCloseBtn.addEventListener("click", () => {
  sidebar.classList.remove("translate-0");
  document.body.removeAttribute("class");
});

// --------------------- attribution container ---------------------- //

setTimeout(() => attributionContainer.classList.add("screen--hidden"), 5000);
