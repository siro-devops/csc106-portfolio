/* ============================================
   Academic Planner — Task Manager
   Demonstrates: arrays, functions, event handling,
   DOM manipulation, dynamic content updates
   ============================================ */

// ---------- 1. Data: array of task objects ----------
let tasks = [];

// ---------- 2. DOM references ----------
const form       = document.getElementById('planner-form');
const input      = document.getElementById('task-input');
const taskList   = document.getElementById('task-list');
const emptyMsg   = document.getElementById('empty-msg');

// ---------- 3. Add a task ----------
function addTask(text) {
    const task = {
        id: Date.now(),           // unique id
        text: text.trim(),
        completed: false
    };
    tasks.push(task);
    renderTasks();
}

// ---------- 4. Toggle completed ----------
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );
    renderTasks();
}

// ---------- 5. Delete a task ----------
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// ---------- 6. Render the list (DOM manipulation) ----------
function renderTasks() {
    // clear the list
    taskList.innerHTML = '';

    // show/hide the "empty" message
    emptyMsg.style.display = tasks.length === 0 ? 'block' : 'none';

    // build a <li> for each task
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        // task text (clicking it toggles complete)
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        span.style.cursor = 'pointer';
        span.title = 'Click to mark as ' + (task.completed ? 'incomplete' : 'complete');
        span.addEventListener('click', () => toggleTask(task.id));

        // actions container
        const actions = document.createElement('div');
        actions.className = 'task-actions';

        // complete button
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? '↩️' : '✅';
        completeBtn.title = task.completed ? 'Mark incomplete' : 'Mark complete';
        completeBtn.addEventListener('click', () => toggleTask(task.id));

        // delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.title = 'Delete task';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// ---------- 7. Form submit event handler ----------
form.addEventListener('submit', (event) => {
    event.preventDefault();          // stop page reload
    const text = input.value.trim();
    if (text === '') return;         // ignore empty
    addTask(text);
    input.value = '';                // clear input
    input.focus();
});

// ---------- 8. Initial render ----------
renderTasks();