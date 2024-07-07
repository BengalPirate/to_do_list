import express from 'express';
import pkg from 'pg';
import fs from 'fs';

const { Pool } = pkg;

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgresuser',
  host: 'db',
  database: 'tododb',
  password: 'postgrespassword',
  port: 5432,
});

app.use(express.json());

// Helper function to read tasks from local storage
const readLocalTasks = () => {
  if (!fs.existsSync('tasks.json')) {
    return [];
  }
  const data = fs.readFileSync('tasks.json', 'utf-8');
  return JSON.parse(data);
};

// Helper function to write tasks to local storage
const writeLocalTasks = (tasks) => {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

// Route to get tasks
app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    const dbTasks = result.rows;
    const localTasks = readLocalTasks();
    const allTasks = [...dbTasks, ...localTasks];
    res.json(allTasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server Error');
  }
});

// Route to add a task
app.post('/tasks', async (req, res) => {
  try {
    const { title, isCompleted } = req.body;
    const result = await pool.query('INSERT INTO tasks (title, isCompleted) VALUES ($1, $2) RETURNING *', [title, isCompleted]);
    const newTask = result.rows[0];
    const localTasks = readLocalTasks();
    localTasks.push(newTask);
    writeLocalTasks(localTasks);
    res.json(newTask);
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
