import "./style.scss";
import "bootstrap/dist/css/bootstrap.min.css";

// All this code has to be refactored to follow the SOLID principle
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

const task = (function () {
  class Task {
    constructor(id, task, date) {
      this.id = id;
      this.task = task;
      this.date = date;
    }
  }

  const tasklist = [];
  const taskHTML = (id, task, date) =>
    `<div class="col-12 taskContainer d-flex" id="${id}">
    <a class="col-5 btn btn-sm">${task}</a>
    <input type="date" value=${date} class="col-2 text-center date"/>
    <button class="btn btn-sm deleteTask">❌</button>
    </div>`;

  const removeObjectWithId = (arr, id) => {
    const objWithIdIndex = arr.findIndex((obj) => obj.id == id);
    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    return arr;
  };

  const formatDay = (dateStr) => {
    const [year, day, month] = dateStr.split("-");
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const resetDOM = () => {
    $taskList.innerHTML = "";
  };

  // casheDOM
  const $rightPan = document.querySelector("#right-pan");
  const $addButton = $rightPan.querySelector("#addTask");
  const $input = $rightPan.querySelector("#inputTask");
  const $taskList = $rightPan.querySelector("#tasks");

  // bindEvents
  $addButton.addEventListener("click", addTask);
  $taskList.addEventListener("click", deleteTask);
  $taskList.addEventListener("change", editDate);

  render();

  function render() {
    const data = {
      tasklist: tasklist,
    };

    resetDOM();

    data.tasklist.map((task) => {
      $taskList.insertAdjacentHTML(
        "afterbegin",
        taskHTML(task.id, task.task, formatDay(task.date))
      );
    });
  }

  function addTask() {
    const id = Date.now();
    const task = new Task(id, $input.value, "2022-01-01");
    tasklist.push(task);
    render();
    $input.value = "";
  }

  function deleteTask(event) {
    if (event.target.classList.contains("deleteTask")) {
      removeObjectWithId(tasklist, event.target.parentElement.id);
      render();
    }
  }

  function editDate(event) {
    if (event.target.classList.contains("date")) {
      const id = event.target.parentElement.id;
      const objIndex = tasklist.findIndex((obj) => obj.id == id);
      tasklist[objIndex].date = formatDay(event.target.value);
    }
  }
  return {
    tasklist: tasklist,
  };
})();
