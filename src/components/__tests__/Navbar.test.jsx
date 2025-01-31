import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

it('should renders Navbar component correctly', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  let message = screen.getByText(/Seasons/i);
  expect(message).toBeVisible();
  message = screen.getByText(/Latest Races of 2024/i);
  expect(message).toBeVisible();
  message = screen.getByText(/Latest Race Results/i);
  expect(message).toBeVisible();
});
