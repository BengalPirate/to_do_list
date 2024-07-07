import { Task as TaskType } from '../../App'; // Import Task type
import styles from './tasks.module.css';
import { Task } from '../Task'; // Import Task component

interface TasksProps {
  tasks: TaskType[];
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function Tasks({ tasks, onComplete, onDelete }: TasksProps) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  return (
    <section className={styles.tasks}>
      <header className={styles.header}>
        <div>
          <p>Created Tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed</p>
          <span>{completedTasks} of {tasksQuantity}</span>
        </div>
      </header>
      <div className={styles.list}>
        {tasks.map(task => (
          <Task key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}
