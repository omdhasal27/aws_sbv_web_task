// ==========================================
// TASK 3: Plain JavaScript To-Do App
// ==========================================

// 1. Array to hold all our task objects in memory
// Structure of each task object: { id: number, text: string, completed: boolean }
let tasks = [];

// Variable to keep track of current active filter ('all', 'active', or 'completed')
let currentFilter = 'all';

// Get HTML element references using standard DOM methods
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const itemCounter = document.getElementById('itemCounter');

const filterAll = document.getElementById('filterAll');
const filterActive = document.getElementById('filterActive');
const filterCompleted = document.getElementById('filterCompleted');

// ==========================================
// LOCAL STORAGE FUNCTIONS
// ==========================================

// Function to save the tasks array to browser localStorage
function saveToLocalStorage() {
    // Convert array to string format because localStorage only stores text
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Function to load tasks from browser localStorage when the page opens
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('myTasks');
    if (savedData) {
        // Parse the JSON string back into a JavaScript array
        tasks = JSON.parse(savedData);
    }
}

// ==========================================
// CORE FUNCTIONS (ADD, TOGGLE, EDIT, DELETE)
// ==========================================

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim();

    // Do nothing if input box is empty
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a new task object
    const newTask = {
        id: Date.now(),      // Unique number generated using current timestamp
        text: taskText,
        completed: false    // New tasks are incomplete by default
    };

    // Push the object into our tasks array
    tasks.push(newTask);

    // Save updated list and clear input field
    saveToLocalStorage();
    taskInput.value = '';

    // Refresh UI display
    renderTasks();
}

// Function to toggle complete/incomplete status of a task
function toggleComplete(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed; // Reverse boolean value
            break;
        }
    }
    saveToLocalStorage();
    renderTasks();
}

// Function to delete a task by its ID
function deleteTask(id) {
    // Keep only tasks that do NOT match the given ID
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
}

// Function to edit a task's text
function editTask(id) {
    // Find task object
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Use prompt to get updated text from user
    const newText = prompt('Edit your task:', task.text);

    // Check if user entered valid text
    if (newText !== null && newText.trim() !== '') {
        task.text = newText.trim();
        saveToLocalStorage();
        renderTasks();
    }
}

// ==========================================
// RENDER FUNCTION (Display list on screen)
// ==========================================

function renderTasks() {
    // Clear list container first
    taskList.innerHTML = '';

    // 1. Filter tasks according to current filter mode
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => t.completed === false);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed === true);
    }

    // 2. Loop through filtered tasks and create HTML elements dynamically
    filteredTasks.forEach(task => {
        const li = document.createElement('li');

        // Checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleComplete(task.id);

        // Span to display task text
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        if (task.completed) {
            textSpan.classList.add('completed');
        }

        // Action buttons container
        const btnGroup = document.createElement('div');

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTask(task.id);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        // Assemble elements together
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });

    // 3. Update the item counter (count tasks where completed === false)
    const activeTasksCount = tasks.filter(t => t.completed === false).length;
    itemCounter.textContent = `${activeTasksCount} items left`;
}

// ==========================================
// EVENT LISTENERS AND INITIAL STARTUP
// ==========================================

// Add button click
addBtn.addEventListener('click', addTask);

// Pressing Enter key inside input box triggers add function
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Filter button clicks
filterAll.addEventListener('click', () => {
    currentFilter = 'all';
    renderTasks();
});

filterActive.addEventListener('click', () => {
    currentFilter = 'active';
    renderTasks();
});

filterCompleted.addEventListener('click', () => {
    currentFilter = 'completed';
    renderTasks();
});

// INITIAL EXECUTION ON PAGE LOAD:
// Load saved tasks from LocalStorage and render them on screen when page opens
loadFromLocalStorage();
renderTasks();