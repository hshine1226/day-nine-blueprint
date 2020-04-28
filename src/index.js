// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const input = document.querySelector(".js-input");
const pending = document.querySelector(".pending");
const pendingList = document.getElementById("pendingList");
const finishedList = document.getElementById("finishedList");

const PENDING = "PENDING";
const FINISHED = "FINISHED";
const TODOS_LS = "toDos";
let toDos = [];
let finished = [];

function saveToDos() {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
}

function handleDelete(event) {
  const button = event.target;
  const li = button.parentNode;
  pendingList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}
function saveFinish() {
  localStorage.setItem(FINISHED, JSON.stringify(finished));
}
function paintFinish(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  const pendingBtn = document.createElement("button");
  const newId = finished.length + 1;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(pendingBtn);
  pendingBtn.innerText = "Pending";
  finishedList.appendChild(li);

  const finishObj = {
    id: newId,
    text: text,
  };
  finished.push(finishObj);
  saveFinish();
}
function handleFinish(event) {
  const button = event.target;
  const li = button.parentNode;
  const span = li.children[0];
  const text = span.innerText;

  paintFinish(text);
}
function paintPendingList(text) {
  li = document.createElement("li");
  span = document.createElement("span");
  span.innerText = text;
  delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  finishBtn = document.createElement("button");
  finishBtn.innerText = "Finish";

  const newId = toDos.length + 1;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishBtn);
  li.id = newId;
  pendingList.appendChild(li);

  delBtn.addEventListener("click", handleDelete);
  finishBtn.addEventListener("click", handleFinish);

  input.value = "";

  const toDoObj = {
    id: newId,
    text: text,
  };
  toDos.push(toDoObj);
  saveToDos();
}
function handleInputChange(event) {
  const currentValue = input.value;
  paintPendingList(currentValue);
}

function loadPendingList() {
  const loadedPending = localStorage.getItem(PENDING);
  if (loadedPending != null) {
    const parsedToDos = JSON.parse(loadedPending);
    parsedToDos.forEach(function (toDo) {
      paintPendingList(toDo.text);
    });
  }
}

input.addEventListener("change", handleInputChange);

function init() {
  loadPendingList();
}
init();
