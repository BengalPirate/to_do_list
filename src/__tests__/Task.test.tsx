
import { render, screen, fireEvent } from '@testing-library/react';
import { Task } from '../components/Task';
import { Task as TaskType } from '../App';

const mockTask: TaskType = {
  id: '1',
  title: 'Test Task',
  isCompleted: false,
};

describe('Task', () => {
  test('renders Task component', () => {
    render(<Task task={mockTask} onComplete={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/test task/i)).toBeInTheDocument();
  });

  test('calls onComplete when complete button is clicked', () => {
    const onCompleteMock = jest.fn();
    render(<Task task={mockTask} onComplete={onCompleteMock} onDelete={jest.fn()} />);

    const completeButton = screen.getByRole('button', { name: '' });
    fireEvent.click(completeButton);

    expect(onCompleteMock).toHaveBeenCalledWith('1');
  });

  test('calls onDelete when delete button is clicked', () => {
    const onDeleteMock = jest.fn();
    render(<Task task={mockTask} onComplete={jest.fn()} onDelete={onDeleteMock} />);

    const deleteButton = screen.getByRole('button', { name: '' });
    fireEvent.click(deleteButton);

    expect(onDeleteMock).toHaveBeenCalledWith('1');
  });
});
