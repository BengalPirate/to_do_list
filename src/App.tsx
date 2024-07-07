import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import Lifestream from './styles/lifestream'; // Import the Lifestream component

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

const LOCAL_STORAGE_KEY = "todo:savedTasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function loadSavedTasks() {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }

  useEffect(() => {
    loadSavedTasks();
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3001/tasks");
        if (!response.ok) {
          console.error('Failed to fetch tasks', response.statusText);
          return;
        }
        const backendTasks: Task[] = await response.json();
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        const localTasks: Task[] = saved ? JSON.parse(saved) : [];
        const mergedTasks = [...localTasks, ...backendTasks];
        setTasks(mergedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }

    fetchTasks();
  }, []);

  function setTasksAndSave(newTasks: Task[]) {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  }

  async function addTask(taskTitle: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false,
    };

    // Save to local storage first
    const updatedTasks = [...tasks, newTask];
    setTasksAndSave(updatedTasks);

    // Then try to save to the backend
    try {
      const response = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        console.error('Failed to add task to backend', response.statusText);
        throw new Error("Failed to add task to backend");
      } else {
        console.log('Successfully added task to backend');
      }
    } catch (error) {
      console.error("Error adding task to backend:", error);
    }
  }

  async function deleteTaskById(taskId: string) {
    // Remove from local storage first
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasksAndSave(updatedTasks);

    // Then try to remove from the backend
    try {
      const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error('Failed to delete task from backend', response.statusText);
        throw new Error("Failed to delete task from backend");
      } else {
        console.log('Successfully deleted task from backend');
      }
    } catch (error) {
      console.error("Error deleting task from backend:", error);
    }
  }

  async function toggleTaskCompletedById(taskId: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          isCompleted: !task.isCompleted,
        };
      }
      return task;
    });
    setTasksAndSave(updatedTasks);

    // Then try to update the backend
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskToUpdate),
        });

        if (!response.ok) {
          console.error('Failed to update task in backend', response.statusText);
          throw new Error("Failed to update task in backend");
        } else {
          console.log('Successfully updated task in backend');
        }
      } catch (error) {
        console.error("Error updating task in backend:", error);
      }
    }
  }

  async function updateTaskById(taskId: string, newTitle: string) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          title: newTitle,
        };
      }
      return task;
    });
    setTasksAndSave(updatedTasks);

    // Then try to update the backend
    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      try {
        const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskToUpdate),
        });

        if (!response.ok) {
          console.error('Failed to update task in backend', response.statusText);
          throw new Error("Failed to update task in backend");
        } else {
          console.log('Successfully updated task in backend');
        }
      } catch (error) {
        console.error("Error updating task in backend:", error);
      }
    }
  }

  return (
    <>
      <Lifestream /> {/* Add the Lifestream component */}
      <Header onAddTask={addTask} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onUpdate={updateTaskById}
      />
    </>
  );
}

export default App;
