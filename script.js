let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        const task = {
            text: taskText,
            date: new Date(),
        };
        pendingTasks.push(task);
        taskInput.value = ''; // Clear input
        renderTasks();
    }
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pendingTasksList');
    const completedTasksList = document.getElementById('completedTasksList');
    
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    pendingTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text} <small>(Added: ${formatDate(task.date)})</small>
            <div>
                <button class="complete-btn" onclick="completeTask(${index})">Complete</button>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index}, 'pending')">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text} <small>(Completed: ${formatDate(task.completedDate)})</small>
            <div>
                <button class="delete-btn" onclick="deleteTask(${index}, 'completed')">Delete</button>
            </div>
        `;
        completedTasksList.appendChild(li);
    });
}

function completeTask(index) {
    const task = pendingTasks.splice(index, 1)[0];
    task.completedDate = new Date();
    completedTasks.push(task);
    renderTasks();
}

function deleteTask(index, type) {
    if (type === 'pending') {
        pendingTasks.splice(index, 1);
    } else {
        completedTasks.splice(index, 1);
    }
    renderTasks();
}

function editTask(index) {
    const newTaskText = prompt("Edit your task:", pendingTasks[index].text);
    if (newTaskText) {
        pendingTasks[index].text = newTaskText;
        renderTasks();
    }
}

function formatDate(date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Initial render
renderTasks();
