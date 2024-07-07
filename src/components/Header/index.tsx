import todoLogo from '../../assets/todoLogo.svg';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styles from './header.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';

interface HeaderProps {
    onAddTask: (title: string) => void;
}

export function Header({ onAddTask }: HeaderProps) {
    const [title, setTitle] = useState<string>('');

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        onAddTask(title);
        setTitle(''); // Clear the input after adding the task
    }

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    return (
        <header className={styles.header}>
            <img src={todoLogo} alt="Todo Logo" />

            <form onSubmit={handleSubmit} className={styles.newTaskForm}>
                <input 
                    placeholder="Add a new task" 
                    type="text" 
                    value={title} 
                    onChange={onChangeTitle} 
                />
                <button type="submit">
                    Create
                    <AiOutlinePlusCircle size={20} />
                </button>
            </form>
        </header>
    );
}
