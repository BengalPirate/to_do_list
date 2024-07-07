
import { render, screen } from '@testing-library/react';
import { Tasks } from '../components/Tasks';
import { Task as TaskType } from '../App';

const mockTasks: TaskType[] = [
  { id: '1', title: 'Test Task 1', isCompleted: false },
  { id: '2', title: 'Test Task 2', isCompleted: true },
];

describe('Tasks', () => {
  test('renders Tasks component', () => {
    render(<Tasks tasks={mockTasks} onComplete={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/created tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });

  test('displays the correct number of tasks', () => {
    render(<Tasks tasks={mockTasks} onComplete={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/created tasks/i).nextSibling).toHaveTextContent('2');
  });

  test('displays the correct number of completed tasks', () => {
    render(<Tasks tasks={mockTasks} onComplete={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/completed/i).nextSibling).toHaveTextContent('1 of 2');
  });
});
