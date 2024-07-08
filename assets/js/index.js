document.addEventListener('DOMContentLoaded', () => {
    const tasks = [
        { id: 1, description: 'Tarea 1', completed: false },
        { id: 2, description: 'Tarea 2', completed: false },
        { id: 3, description: 'Tarea 3', completed: true }
    ];

    const taskList = document.getElementById('task-list');
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');

    const updateTaskList = () => {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item' + (task.completed ? ' completed' : '');
            taskItem.innerHTML = `
                <span class="task-id"><strong>ID:</strong>${task.id}</span>
                <span class="description">${task.description}</span>
                <div class="task-actions">
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                    <button onclick="deleteTask(${task.id})">Borrar</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
        updateCounters();
    };

    const updateCounters = () => {
        totalTasks.textContent = tasks.length;
        completedTasks.textContent = tasks.filter(task => task.completed).length;
    };

    window.toggleTask = id => {
        const task = tasks.find(task => task.id === id);
        task.completed = !task.completed;
        updateTaskList();
    };

    window.deleteTask = id => {
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);
        updateTaskList();
    };

    addTaskBtn.addEventListener('click', () => {
        const description = newTaskInput.value.trim();
        if (description) {
            const newTask = {
                id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                description,
                completed: false
            };
            tasks.push(newTask);
            newTaskInput.value = '';
            updateTaskList();
        }
    });

    updateTaskList();
});