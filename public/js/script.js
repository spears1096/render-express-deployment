// Client-side validation
document.querySelector('.todo-form')?.addEventListener('submit', (e) => {
    const taskInput = document.querySelector('input[name="task"]');
    if (!taskInput.value.trim()) {
        e.preventDefault();
        alert('Task cannot be empty!');
        taskInput.focus();
    }
});

// Edit form validation
document.querySelector('.edit-container form')?.addEventListener('submit', (e) => {
    const taskInput = document.querySelector('.edit-container input[name="task"]');
    if (!taskInput.value.trim()) {
        e.preventDefault();
        alert('Task cannot be empty!');
        taskInput.focus();
    }
});