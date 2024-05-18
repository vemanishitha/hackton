interface ExpTask {
    id: number;
    task: string;
    name: string;
    amount: number;
    category: string;
    date: string;
    completed: boolean;
}

class ExpApp {
    ExpTasks: ExpTask[];

    nameInputHTML: HTMLInputElement;
    amountInputHTML: HTMLInputElement;
    categoryInputHTML: HTMLInputElement;
    dateInputHTML: HTMLInputElement;

    ExpItemsHTML: HTMLUListElement;

    constructor() {
        this.ExpTasks = [];

        this.nameInputHTML = document.getElementById("nameInput") as HTMLInputElement;
        this.amountInputHTML = document.getElementById("amountInput") as HTMLInputElement;
        this.categoryInputHTML = document.getElementById("categoryInput") as HTMLInputElement;
        this.dateInputHTML = document.getElementById("dateInput") as HTMLInputElement;

        this.ExpItemsHTML = document.getElementById("ExpItems") as HTMLUListElement;

        const addButton = document.getElementById("addButton") as HTMLButtonElement;
        addButton.addEventListener("click", () => this.addNewTask());
    }

    addNewTask() {
        const result: HTMLElement = document.getElementById("result") as HTMLElement;

        const taskText = this.nameInputHTML.value;
        const amount = parseFloat(this.amountInputHTML.value);
        const category = this.categoryInputHTML.value;
        const date = this.dateInputHTML.value;

        if (taskText !== "" && !isNaN(amount) && category !== "" && date !== "") {
            result.innerText = '';
            const newTask: ExpTask = {
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
        } else {
            result.innerText = "All fields must be filled!";
        }
    }

    markCompleted(id: number) {
        const targetTask = this.ExpTasks.find((el) => el.id === id);
        if (targetTask) {
            targetTask.completed = !targetTask.completed;
            this.renderTasks();
        } else {
            alert('Invalid task ID');
        }
    }

    removeTask(id: number) {
        this.ExpTasks = this.ExpTasks.filter((el) => el.id !== id);
        this.renderTasks();
    }

    renderTasks() {
        this.ExpItemsHTML.innerHTML = '';
        this.ExpTasks.forEach((expTask: ExpTask) => {
            const taskClass = expTask.completed ? 'completed' : 'notcompleted';
            const taskText = expTask.completed ? `<span style="text-decoration: line-through;">${expTask.task}</span>  ` : expTask.task;

            const listItem = document.createElement("li");
            listItem.className = taskClass;
            listItem.innerHTML = `
                ${taskText} - ${expTask.amount} - ${expTask.category} - ${expTask.date}
                <button onclick="expApp.markCompleted(${expTask.id})">Done</button>
                <button onclick="expApp.removeTask(${expTask.id})">Delete</button>
            `;
            this.ExpItemsHTML.appendChild(listItem);
        });
    }
}

const expApp = new ExpApp();