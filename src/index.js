import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//All this code has to be refactored to follow the SOLID principle
document.querySelector("#navInbox").addEventListener("click", () => {
  document.querySelector("#navInbox").classList.add("active");
  document.querySelector("#contentInbox").classList.add("active");

  document.querySelector("#navToday").classList.remove("active");
  document.querySelector("#contentToday").classList.remove("active");

  document.querySelector("#navThisWeek").classList.remove("active");
  document.querySelector("#contentThisWeek").classList.remove("active");
});

document.querySelector("#navToday").addEventListener("click", () => {
  document.querySelector("#navInbox").classList.remove("active");
  document.querySelector("#contentInbox").classList.remove("active");

  document.querySelector("#navToday").classList.add("active");
  document.querySelector("#contentToday").classList.add("active");

  document.querySelector("#navThisWeek").classList.remove("active");
  document.querySelector("#contentThisWeek").classList.remove("active");
});

document.querySelector("#navThisWeek").addEventListener("click", () => {
  document.querySelector("#navInbox").classList.remove("active");
  document.querySelector("#contentInbox").classList.remove("active");

  document.querySelector("#navToday").classList.remove("active");
  document.querySelector("#contentToday").classList.remove("active");

  document.querySelector("#navThisWeek").classList.add("active");
  document.querySelector("#contentThisWeek").classList.add("active");
});

const tasklist = [];

class Task {
  constructor(id, task, date) {
    this.id = id;
    this.task = task;
    this.date = date;
  }
}

function getWeek(date) {
  const currentDate = new Date(date);
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

  const weekNumber = Math.ceil(days / 7);
  return weekNumber;
}

function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex((obj) => obj.id == id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

// add the functionality to the add button to add elements
document.querySelector("#addTask").addEventListener("click", () => {
  const taskInput = document.querySelector("#inputTask").value;
  const id = Date.now();

  const taskHTML = () =>
    `
    <div class="col-12 taskContainer d-flex" id="${id}">
    <a class="col-5 btn btn-sm">${taskInput}</a>
    <input type="date" class="col-2 text-center date"/>
    <button class="btn btn-sm deleteTask">❌</button>
    </div>
    `;

  const task = new Task(id, taskInput, "");
  tasklist.push(task);
  document.querySelector("#inputTask").value = "";

  document.querySelector("#tasks").insertAdjacentHTML("afterbegin", taskHTML());
});

document.querySelector("#tasks").addEventListener("click", (event) => {
  if (event.target.classList.contains("deleteTask")) {
    removeObjectWithId(tasklist, event.target.parentElement.id);

    console.log(tasklist);
    event.target.parentElement.remove();
  }
});

document.querySelector("#tasks").addEventListener("change", (event) => {
  if (event.target.classList.contains("date")) {
    const id = event.target.parentElement.id;
    const objIndex = tasklist.findIndex((obj) => obj.id == id);
    tasklist[objIndex].date = event.target.value;
    console.log(getWeek(event.target.value));
    console.log(tasklist);
  }
});

document.querySelector("#navToday").addEventListener("click", () => {
  document.querySelector("#weeklyTasks").innerHTML = "";
  const currentWeek = getWeek(new Date());
  const weeklyTasks = tasklist.filter(
    (task) => getWeek(task.date) == currentWeek
  );

  weeklyTasks.map((task) => {
    const weeklytaskHTML = () =>
      `
    <div class="col-12 taskContainer d-flex" id="${task.id}">
    <a class="col-5 btn">${task.task}</a>
    <p>${task.date}</p>
    </div>
    `;
    document
      .querySelector("#weeklyTasks")
      .insertAdjacentHTML("afterbegin", weeklytaskHTML());
  });
});

document.querySelector("#navToday").addEventListener("click", () => {
  document.querySelector("#nextWeeklyTasks").innerHTML = "";
  const nextWeek = getWeek(new Date()) + 1;
  const nextWeeklyTasks = tasklist.filter(
    (task) => getWeek(task.date) == nextWeek
  );

  nextWeeklyTasks.map((task) => {
    const nextWeeklytaskHTML = () =>
      `
    <div class="col-12 taskContainer d-flex" id="${task.id}">
    <a class="col-5 btn">${task.task}</a>
    <p>${task.date}</p>
    </div>
    `;
    document
      .querySelector("#nextWeeklyTasks")
      .insertAdjacentHTML("afterbegin", nextWeeklytaskHTML());
  });
});
