
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  test('renders Header component', () => {
    render(<Header onAddTask={jest.fn()} />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
  });

  test('calls onAddTask when form is submitted', () => {
    const onAddTaskMock = jest.fn();
    render(<Header onAddTask={onAddTaskMock} />);

    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const formElement = screen.getByRole('form');

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.submit(formElement);

    expect(onAddTaskMock).toHaveBeenCalledWith('New Task');
    expect(inputElement).toHaveValue('');
  });
});
