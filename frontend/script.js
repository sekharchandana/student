const API_URL = 'http://localhost:3000/api/tasks';

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksContainer = document.getElementById('tasksContainer');

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    
    if (!title) {
        showMessage('Please enter a task title', 'error');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });
        
        if (response.ok) {
            taskForm.reset();
            showMessage('Task added successfully!', 'success');
            loadTasks();
        } else {
            const error = await response.json();
            showMessage(error.error || 'Failed to add task', 'error');
        }
    } catch (error) {
        showMessage('Error connecting to server', 'error');
        console.error('Error:', error);
    }
});

// Load all tasks
async function loadTasks() {
    try {
        tasksContainer.innerHTML = '<p class="loading">Loading tasks...</p>';
        
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        if (tasks.length === 0) {
            tasksContainer.innerHTML = '<p class="empty">No tasks yet. Add your first task above!</p>';
            return;
        }
        
        tasksContainer.innerHTML = '';
        tasks.forEach(task => {
            tasksContainer.appendChild(createTaskElement(task));
        });
    } catch (error) {
        tasksContainer.innerHTML = '<p class="error">Error loading tasks. Make sure the server is running.</p>';
        console.error('Error:', error);
    }
}

// Create task element
function createTaskElement(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskDiv.id = `task-${task._id}`;
    
    taskDiv.innerHTML = `
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-actions">
            <button class="btn btn-toggle" onclick="toggleTask('${task._id}')">
                ${task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button class="btn btn-edit" onclick="editTask('${task._id}')">Edit</button>
            <button class="btn btn-delete" onclick="deleteTask('${task._id}')">Delete</button>
        </div>
    `;
    
    return taskDiv;
}

// Toggle task completion
async function toggleTask(id) {
    try {
        const taskElement = document.getElementById(`task-${id}`);
        const currentCompleted = taskElement.classList.contains('completed');
        
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !currentCompleted })
        });
        
        if (response.ok) {
            loadTasks();
        } else {
            const error = await response.json();
            showMessage(error.error || 'Failed to update task', 'error');
        }
    } catch (error) {
        showMessage('Error updating task', 'error');
        console.error('Error:', error);
    }
}

// Edit task
async function editTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const task = await response.json();
        
        const newTitle = prompt('Enter new title:', task.title);
        if (newTitle === null) return;
        
        const newDescription = prompt('Enter new description:', task.description || '');
        
        const updateResponse = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle.trim(),
                description: newDescription ? newDescription.trim() : '',
                completed: task.completed
            })
        });
        
        if (updateResponse.ok) {
            showMessage('Task updated successfully!', 'success');
            loadTasks();
        } else {
            const error = await updateResponse.json();
            showMessage(error.error || 'Failed to update task', 'error');
        }
    } catch (error) {
        showMessage('Error updating task', 'error');
        console.error('Error:', error);
    }
}

// Delete task
async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showMessage('Task deleted successfully!', 'success');
            loadTasks();
        } else {
            const error = await response.json();
            showMessage(error.error || 'Failed to delete task', 'error');
        }
    } catch (error) {
        showMessage('Error deleting task', 'error');
        console.error('Error:', error);
    }
}

// Show message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    messageDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(messageDiv, container.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

