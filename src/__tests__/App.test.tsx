import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders App component and adds a new task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const taskElement = screen.getByText(/new task/i);
    expect(taskElement).toBeInTheDocument();
  });

  test('toggles task completion status', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const completeButton = screen.getAllByRole('button')[0]; // Assuming the first button is the complete button
    fireEvent.click(completeButton);

    const taskElement = screen.getByText(/new task/i);
    expect(taskElement).toHaveClass('textCompleted');
  });

  test('deletes a task', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getAllByRole('button')[2]; // Assuming the third button is the delete button
    fireEvent.click(deleteButton);

    const taskElement = screen.queryByText(/new task/i);
    expect(taskElement).not.toBeInTheDocument();
  });
});
