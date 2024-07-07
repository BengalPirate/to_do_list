import styles from './task.module.css';
import { TbTrash } from 'react-icons/tb';
import { Task as TaskType } from '../../App'; // Import the Task type
import { BsFillCheckCircleFill } from 'react-icons/bs';

interface TaskProps {
  task: TaskType;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function Task({ task, onComplete, onDelete }: TaskProps) {
  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      <p className={task.isCompleted ? styles.textCompleted : ''}>{task.title}</p>
      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
