import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../Footer';

it('should renders Footer component correctly', () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  let message = screen.getByText(/Formula-1 Explorer/i);
  expect(message).toBeVisible();
  message = screen.getByText(/All rights reserved/i);
  expect(message).toBeVisible();
});
