var ExpApp = /** @class */ (function () {
    function ExpApp() {
        var _this = this;
        this.ExpTasks = [];
        this.nameInputHTML = document.getElementById("nameInput");
        this.amountInputHTML = document.getElementById("amountInput");
        this.categoryInputHTML = document.getElementById("categoryInput");
        this.dateInputHTML = document.getElementById("dateInput");
        this.ExpItemsHTML = document.getElementById("ExpItems");
        var addButton = document.getElementById("addButton");
        addButton.addEventListener("click", function () { return _this.addNewTask(); });
    }
    ExpApp.prototype.addNewTask = function () {
        var result = document.getElementById("result");
        var taskText = this.nameInputHTML.value;
        var amount = parseFloat(this.amountInputHTML.value);
        var category = this.categoryInputHTML.value;
        var date = this.dateInputHTML.value;
        if (taskText !== "" && !isNaN(amount) && category !== "" && date !== "") {
            result.innerText = '';
            var newTask = {
                id: (new Date()).getTime(),
                task: taskText,
                name: taskText,
                amount: amount,
                category: category,
                date: date,
                completed: false
            };
            this.ExpTasks.push(newTask);
            this.renderTasks();
            this.nameInputHTML.value = '';
            this.amountInputHTML.value = '';
            this.categoryInputHTML.value = '';
            this.dateInputHTML.value = '';
        }
        else {
            result.innerText = "All fields must be filled!";
        }
    };
    ExpApp.prototype.markCompleted = function (id) {
        var targetTask = this.ExpTasks.find(function (el) { return el.id === id; });
        if (targetTask) {
            targetTask.completed = !targetTask.completed;
            this.renderTasks();
        }
        else {
            alert('Invalid task ID');
        }
    };
    ExpApp.prototype.removeTask = function (id) {
        this.ExpTasks = this.ExpTasks.filter(function (el) { return el.id !== id; });
        this.renderTasks();
    };
    ExpApp.prototype.renderTasks = function () {
        var _this = this;
        this.ExpItemsHTML.innerHTML = '';
        this.ExpTasks.forEach(function (expTask) {
            var taskClass = expTask.completed ? 'completed' : 'notcompleted';
            var taskText = expTask.completed ? "<span style=\"text-decoration: line-through;\">".concat(expTask.task, "</span>  ") : expTask.task;
            var listItem = document.createElement("li");
            listItem.className = taskClass;
            listItem.innerHTML = "\n                ".concat(taskText, " - ").concat(expTask.amount, " - ").concat(expTask.category, " - ").concat(expTask.date, "\n                <button onclick=\"expApp.markCompleted(").concat(expTask.id, ")\">Done</button>\n                <button onclick=\"expApp.removeTask(").concat(expTask.id, ")\">Delete</button>\n            ");
            _this.ExpItemsHTML.appendChild(listItem);
        });
    };
    return ExpApp;
}());
var expApp = new ExpApp();
