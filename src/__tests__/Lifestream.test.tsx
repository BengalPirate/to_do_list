// src/__tests__/Lifestream.test.tsx
import { render, screen } from '@testing-library/react';
import Lifestream from '../styles/lifestream';

describe('Lifestream', () => {
  test('renders canvas element', () => {
    render(<Lifestream />);
    const canvasElement = screen.getByRole('img');
    expect(canvasElement).toBeInTheDocument();
  });
});
