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

(function () {
  class Task {
    constructor(id, task, date) {
      this.id = id;
      this.task = task;
      this.date = date;
    }
  }

  const task = {
    tasklist: [],
    taskHTML: (id, task, date) =>
      `<div class="col-12 taskContainer d-flex" id="${id}">
    <a class="col-5 btn btn-sm">${task}</a>
    <input type="date" value=${date} class="col-2 text-center date"/>
    <button class="btn btn-sm deleteTask">❌</button>
    </div>`,

    removeObjectWithId: function (arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id == id);

      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }

      return arr;
    },

    formatDay: function (dateStr) {
      const [year, day, month] = dateStr.split("-");
      const formattedDay = day.padStart(2, "0");
      const formattedMonth = month.padStart(2, "0");
      return `${year}-${formattedMonth}-${formattedDay}`;
    },

    resetDOM: function () {
      this.$taskList.innerHTML = "";
    },

    init: function () {
      this.cacheDom();
      this.bindEvents();
      this.render();
    },

    cacheDom: function () {
      this.$rightPan = document.querySelector("#right-pan");
      this.$addButton = this.$rightPan.querySelector("#addTask");
      this.$input = this.$rightPan.querySelector("#inputTask");
      this.$taskList = this.$rightPan.querySelector("#tasks");
    },

    bindEvents: function () {
      this.$addButton.addEventListener("click", this.addTask.bind(this));
      this.$taskList.addEventListener("click", this.deleteTask.bind(this));
      this.$taskList.addEventListener("change", this.editDate.bind(this));
    },

    render: function () {
      const data = {
        tasklist: this.tasklist,
      };

      this.resetDOM();

      data.tasklist.map((task) => {
        this.$taskList.insertAdjacentHTML(
          "afterbegin",
          this.taskHTML(task.id, task.task, this.formatDay(task.date))
        );
      });
    },

    addTask: function () {
      const id = Date.now();
      const task = new Task(id, this.$input.value, "2022-01-01");
      this.tasklist.push(task);
      this.render();
      this.$input.value = "";
    },

    deleteTask: function (event) {
      if (event.target.classList.contains("deleteTask")) {
        this.removeObjectWithId(this.tasklist, event.target.parentElement.id);
        this.render();
      }
    },

    editDate: function (event) {
      if (event.target.classList.contains("date")) {
        const id = event.target.parentElement.id;
        const objIndex = this.tasklist.findIndex((obj) => obj.id == id);
        this.tasklist[objIndex].date = this.formatDay(event.target.value);

        console.log(this.tasklist);
      }
    },
  };
  task.init();
})();
