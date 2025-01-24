import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Error from '../Error';

it('should renders Error component correctly', () => {
  render(
    <BrowserRouter>
      <Error />
    </BrowserRouter>
  );
  let message = screen.getByText(/Unexpected Error/i);
  expect(message).toBeVisible();
  message = screen.getByText(/Something went wrong, please try again/i);
  expect(message).toBeVisible();
  message = screen.getByText(/Go back to Home/i);
  expect(message).toBeVisible();
});
