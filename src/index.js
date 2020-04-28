// <⚠️ DONT DELETE THIS ⚠️>
// import "./styles.css";
// <⚠️ /DONT DELETE THIS ⚠️>

const input = document.querySelector(".js-input");
const pendingList = document.getElementById("pendingList");
const finishedList = document.getElementById("finishedList");

const PENDING = "PENDING";
const FINISHED = "FINISHED";

let toDos = [];
let finished = [];

function saveToDos() {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
}
function saveFinish() {
  localStorage.setItem(FINISHED, JSON.stringify(finished));
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
function handleFinish(event) {
  const button = event.target;
  const li = button.parentNode;
  const span = li.children[0];
  const text = span.innerText;
  pendingList.removeChild(li);

  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();

  paintFinishedList(text);
}
function handlePending(event) {
  const button = event.target;
  const li = button.parentNode;
  const span = li.children[0];

  const text = span.innerText;

  finishedList.removeChild(li);

  paintPendingList(text);

  const cleanFinish = finished.filter(function (finish) {
    return finish.id !== parseInt(li.id);
  });
  finished = cleanFinish;
  saveFinish();
}
function handleInputChange(event) {
  const currentValue = input.value;
  paintPendingList(currentValue);
}
function handleFinishDelete(event) {
  console.log("inin");
  const button = event.target;
  const li = button.parentNode;
  finishedList.removeChild(li);

  const cleanFinish = finished.filter(function (finish) {
    return finish.id !== parseInt(li.id);
  });
  finished = cleanFinish;
  saveFinish();
}
input.addEventListener("change", handleInputChange);

function paintFinishedList(text) {
  console.log("inPaint");
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  const finishDelBtn = document.createElement("button");
  finishDelBtn.innerText = "✖";
  const pendingBtn = document.createElement("button");
  pendingBtn.innerText = "⤴";
  const newId = finished.length + 1;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(finishDelBtn);
  li.appendChild(pendingBtn);

  finishedList.appendChild(li);

  finishDelBtn.addEventListener("click", handleFinishDelete);
  pendingBtn.addEventListener("click", handlePending);

  const finishObj = {
    id: newId,
    text: text,
  };
  finished.push(finishObj);
  saveFinish();
}
function paintPendingList(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = text;
  const delBtn = document.createElement("button");
  delBtn.innerText = "✖";
  const finishBtn = document.createElement("button");
  finishBtn.innerText = "✔";

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

function loadPendingList() {
  const loadedPending = localStorage.getItem(PENDING);
  if (loadedPending !== null) {
    const parsedToDos = JSON.parse(loadedPending);
    parsedToDos.forEach(function (toDo) {
      paintPendingList(toDo.text);
    });
  }
}
function loadFinishedList() {
  const loadedFinished = localStorage.getItem(FINISHED);
  if (loadedFinished !== null) {
    const parsedFinished = JSON.parse(loadedFinished);
    parsedFinished.forEach(function (finish) {
      paintFinishedList(finish.text);
    });
  }
}

function init() {
  loadFinishedList();
  loadPendingList();
}
init();
