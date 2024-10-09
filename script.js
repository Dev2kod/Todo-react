let todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    const filteredTodos = filterTodos();
    const sortedTodos = sortTodos(filteredTodos);

    sortedTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <span class="due-date">${todo.dueDate}</span>
            <span class="priority ${todo.priority}">${todo.priority}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        li.querySelector('input').addEventListener('change', () => toggleTodo(index));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(index));
        todoList.appendChild(li);
    });

    updateTodoCount();
}

function addTodo(text, dueDate, priority) {
    todos.push({ text, completed: false, dueDate, priority, dateAdded: new Date() });
    saveTodos();
    renderTodos();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

function filterTodos() {
    const activeFilter = document.querySelector('.filters button.active').id;
    return todos.filter(todo => {
        if (activeFilter === 'filter-active') return !todo.completed;
        if (activeFilter === 'filter-completed') return todo.completed;
        return true;
    });
}

function sortTodos(todosToSort) {
    const sortBy = document.getElementById('sort-by').value;
    return todosToSort.sort((a, b) => {
        if (sortBy === 'due-date') return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === 'priority') {
            const priorityOrder = { low: 0, medium: 1, high: 2 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return new Date(a.dateAdded) - new Date(b.dateAdded);
    });
}

function updateTodoCount() {
    const count = todos.filter(todo => !todo.completed).length;
    document.getElementById('todo-count').textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}

document.getElementById('add-todo-btn').addEventListener('click', () => {
    const text = document.getElementById('new-todo').value.trim();
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;
    if (text) {
        addTodo(text, dueDate, priority);
        document.getElementById('new-todo').value = '';
        document.getElementById('due-date').value = '';
        document.getElementById('priority').value = 'low';
    }
});

document.getElementById('clear-completed-btn').addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
});

document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filters button.active').classList.remove('active');
        button.classList.add('active');
        renderTodos();
    });
});

document.getElementById('sort-by').addEventListener('change', renderTodos);

renderTodos();
