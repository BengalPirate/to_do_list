import styles from './task.module.css';
import { TbTrash, TbEdit } from 'react-icons/tb';
import { Task as TaskType } from '../../App'; // Import the Task type
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useState, ChangeEvent, FormEvent } from 'react';

interface TaskProps {
  task: TaskType;
  onComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, newTitle: string) => void; // Add onUpdate prop
}

export function Task({ task, onComplete, onDelete, onUpdate }: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  function handleUpdate(event: FormEvent) {
    event.preventDefault();
    onUpdate(task.id, newTitle);
    setIsEditing(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  return (
    <div className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      {isEditing ? (
        <form onSubmit={handleUpdate} className={styles.editForm}>
          <input 
            type="text" 
            value={newTitle} 
            onChange={handleChange} 
            className={styles.editInput}
          />
          <button type="submit" className={styles.saveButton}>Save</button>
        </form>
      ) : (
        <p className={task.isCompleted ? styles.textCompleted : ''}>{task.title}</p>
      )}
      
      <button className={styles.editButton} onClick={() => setIsEditing(true)}>
        <TbEdit size={20} />
      </button>
      <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
        <TbTrash size={20} />
      </button>
    </div>
  );
}
