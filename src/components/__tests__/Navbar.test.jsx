import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';

describe('Navbar Component', () => {
  it('renders navigation links', () => {
    render(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Seasons/i)).toBeInTheDocument();
  });
});
