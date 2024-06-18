document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const categoryInput = document.getElementById('categoryInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');

    addTaskButton.addEventListener('click', addTask);

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('done-button')) {
            moveToCompleted(event.target);
        }
    });

    completedList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-button')) {
            deleteTask(event.target);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        const dueDate = dueDateInput.value;
        const category = categoryInput.value;

        if (taskText !== '' && dueDate !== '') {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleString();
            const formattedDueDate = new Date(dueDate).toLocaleString();
            const li = document.createElement('li');

            const taskInfo = document.createElement('div');
            taskInfo.classList.add('task-info');
            taskInfo.innerHTML = `<span>${taskText}</span><span>${formattedDate}</span>`;

            const dueInfo = document.createElement('div');
            dueInfo.classList.add('task-info');
            dueInfo.innerHTML = `<span>Due: ${formattedDueDate}</span>`;

            const categoryInfo = document.createElement('div');
            categoryInfo.classList.add('category');
            categoryInfo.textContent = `Category: ${category}`;

            const taskButtons = document.createElement('div');
            taskButtons.classList.add('task-buttons');
            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.classList.add('done-button');
            taskButtons.appendChild(doneButton);

            li.appendChild(taskInfo);
            li.appendChild(dueInfo);
            li.appendChild(categoryInfo);
            li.appendChild(taskButtons);
            taskList.appendChild(li);

            taskInput.value = '';
            dueDateInput.value = '';
            categoryInput.value = 'Work';
        }
    }

    function moveToCompleted(button) {
        const li = button.closest('li');
        li.classList.add('completed');
        button.textContent = 'Delete';
        button.classList.remove('done-button');
        button.classList.add('delete-button');
        taskList.removeChild(li);
        completedList.appendChild(li);
    }

    function deleteTask(button) {
        const li = button.closest('li');
        completedList.removeChild(li);
    }
});