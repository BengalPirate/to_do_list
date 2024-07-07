import { render, screen, fireEvent } from '@testing-library/react';
import { Task } from '../components/Task/index';

const mockTask = { id: '1', title: 'Test Task', isCompleted: false };

test('calls onComplete when complete button is clicked', () => {
  const onCompleteMock = jest.fn();
  render(<Task task={mockTask} onComplete={onCompleteMock} onDelete={jest.fn()} onUpdate={jest.fn()} />);

  const completeButton = screen.getByRole('button', { name: /complete/i });
  fireEvent.click(completeButton);

  expect(onCompleteMock).toHaveBeenCalledWith('1');
});

test('calls onDelete when delete button is clicked', () => {
  const onDeleteMock = jest.fn();
  render(<Task task={mockTask} onComplete={jest.fn()} onDelete={onDeleteMock} onUpdate={jest.fn()} />);

  const deleteButton = screen.getByRole('button', { name: /delete/i });
  fireEvent.click(deleteButton);

  expect(onDeleteMock).toHaveBeenCalledWith('1');
});

test('renders input field when edit button is clicked', () => {
  render(<Task task={mockTask} onComplete={jest.fn()} onDelete={jest.fn()} onUpdate={jest.fn()} />);

  const editButton = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(editButton);

  const input = screen.getByDisplayValue(mockTask.title);
  expect(input).toBeInTheDocument();
});

test('calls onUpdate when save button is clicked after editing', () => {
  const onUpdateMock = jest.fn();
  render(<Task task={mockTask} onComplete={jest.fn()} onDelete={jest.fn()} onUpdate={onUpdateMock} />);

  const editButton = screen.getByRole('button', { name: /edit/i });
  fireEvent.click(editButton);

  const input = screen.getByDisplayValue(mockTask.title);
  fireEvent.change(input, { target: { value: 'Updated Task' } });

  const saveButton = screen.getByRole('button', { name: /save/i });
  fireEvent.click(saveButton);

  expect(onUpdateMock).toHaveBeenCalledWith('1', 'Updated Task');
});
