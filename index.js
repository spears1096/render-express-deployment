const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.get('/', (req, res) => {
  const priorityFilter = req.query.priority || 'all';
  const filteredTodos = priorityFilter === 'all' 
    ? todos 
    : todos.filter(todo => todo.priority === priorityFilter);
  
  res.render('index', { 
    todos: filteredTodos, 
    priorityFilter 
  });
});

app.post('/add', (req, res) => {
  const { task, priority } = req.body;
  
  if (!task.trim()) {
    return res.status(400).send('<script>alert("Task cannot be empty!");window.history.back();</script>');
  }
  
  const newTodo = {
    id: Date.now(),
    task: task.trim(),
    priority
  };
  
  todos.push(newTodo);
  res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.redirect('/');
  
  res.render('edit', { todo });
});

app.post('/edit/:id', (req, res) => {
  const { task, priority } = req.body;
  const id = parseInt(req.params.id);
  
  if (!task.trim()) {
    return res.status(400).send('<script>alert("Task cannot be empty!");window.history.back();</script>');
  }
  
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, task: task.trim(), priority } : todo
  );
  
  res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== parseInt(req.params.id));
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
