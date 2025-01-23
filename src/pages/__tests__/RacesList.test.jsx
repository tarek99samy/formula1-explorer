import { render, screen } from '@testing-library/react';
import RacesList from '../RacesList';

describe('RacesList Page', () => {
  it('displays a message when no races are available', () => {
    render(<RacesList />);
    expect(screen.getByText(/No races available/i)).toBeInTheDocument();
  });
});
