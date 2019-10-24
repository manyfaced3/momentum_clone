const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");
let toDoForm = document.querySelector(".js-toDoForm");

let USER_LS = "currentUser",
  SHOWING = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function submitF(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askName() {
  form.classList.add(SHOWING);
  form.addEventListener("submit", submitF);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING);
  greeting.classList.add(SHOWING);
  greeting.innerText = `Hello, ${text}`;
  toDoForm.classList.add(SHOWING);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
