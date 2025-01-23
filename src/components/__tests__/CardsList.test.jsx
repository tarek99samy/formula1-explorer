import { render, screen } from '@testing-library/react';
import CardsList from '../CardsList';

describe('CardsList Component', () => {
  it('renders cards based on the data provided', () => {
    const mockData = [
      { id: 1, title: 'Card 1', bodyMetadata: [], detailsUrl: '/' },
      { id: 2, title: 'Card 2', bodyMetadata: [], detailsUrl: '/' }
    ];

    render(
      <CardsList
        title='Test Cards List'
        queryKey='testKey'
        queryFunction={() => Promise.resolve({ MRData: { data: mockData } })}
        queryFunctionParams={{}}
      />
    );

    expect(screen.getByText(/Card 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Card 2/i)).toBeInTheDocument();
  });
});
