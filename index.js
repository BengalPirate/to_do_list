import express from 'express';
import cors from 'cors';
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

app.use(cors());
app.use(express.json());

const readLocalTasks = () => {
  if (!fs.existsSync('tasks.json')) {
    return [];
  }
  const data = fs.readFileSync('tasks.json', 'utf-8');
  return JSON.parse(data);
};

const writeLocalTasks = (tasks) => {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2));
};

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    const dbTasks = result.rows;
    const localTasks = readLocalTasks();
    const allTasks = [...localTasks, ...dbTasks];
    res.json(allTasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server Error');
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { id, title, isCompleted } = req.body;
    console.log('Adding task:', req.body);
    const result = await pool.query(
      'INSERT INTO tasks (id, title, isCompleted) VALUES ($1, $2, $3) RETURNING *',
      [id, title, isCompleted]
    );
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

app.delete('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    const localTasks = readLocalTasks().filter(task => task.id !== id);
    writeLocalTasks(localTasks);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server Error');
  }
});

app.put('/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, isCompleted = $2 WHERE id = $3 RETURNING *',
      [title, isCompleted, id]
    );
    const updatedTask = result.rows[0];
    const localTasks = readLocalTasks().map(task => {
      if (task.id === id) {
        return updatedTask;
      }
      return task;
    });
    writeLocalTasks(localTasks);
    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
