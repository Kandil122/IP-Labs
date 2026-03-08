class Task {
    constructor(description) {
        this.id = Date.now() + Math.random();
        this.description = description;
        this.completed = false;
    }
}

const tasks = [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function addTask() {
    const description = taskInput.value.trim();

    if (!description) {
        taskInput.focus();
        return;
    }

    const newTask = new Task(description);
    tasks.push(newTask);
    taskInput.value = "";

    renderTasks();
}

function toggleTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;

    task.completed = !task.completed;
    renderTasks();
}

function deleteTask(taskId) {
    const taskIndex = tasks.findIndex((item) => item.id === taskId);
    if (taskIndex === -1) return;

    tasks.splice(taskIndex, 1);
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.description;
        taskText.addEventListener("click", () => toggleTask(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "Delete";
        deleteBtn.type = "button";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        li.appendChild(taskText);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
