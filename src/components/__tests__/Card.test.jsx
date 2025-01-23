import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card Component', () => {
  it('renders the card title and subtitle correctly', () => {
    render(
      <Card
        title='Test Title'
        subtitle='Test Subtitle'
        className='test-class'
        bodyMetadata={[]}
        detailsUrl='/details'
        isHeighlighted={false}
        haveFooter={false}
      />
    );

    expect(screen.getByText(/Test Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Subtitle/i)).toBeInTheDocument();
  });
});
