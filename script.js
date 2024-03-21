// Load tasks from local storage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.name;

        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeTask(index));

        // Create complete button
        const completeButton = document.createElement('button');
        completeButton.textContent = task.completed ? 'Mark Incomplete' : 'Mark Complete';
        completeButton.classList.add('complete-button');
        completeButton.addEventListener('click', () => toggleTask(index));

        li.appendChild(removeButton);
        li.appendChild(completeButton);

        if (task.completed) {
            li.classList.add('completed');
        }

        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        renderTasks();
        saveTasks();
    }
}

// Function to remove task
function removeTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
}

// Function to toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial rendering of tasks
renderTasks();
