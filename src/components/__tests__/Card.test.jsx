import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Card from '../Card';

it('should renders Card component correctly', () => {
  render(
    <BrowserRouter>
      <Card title='Card Title' subtitle='Card Subtitle' bodyMetadata={[]} className='' />
    </BrowserRouter>
  );
  let textContent = screen.getByText(/Card Title/i);
  expect(textContent).toBeVisible();
  textContent = screen.getByText(/Card Subtitle/i);
  expect(textContent).toBeVisible();
});

it('should renders Card component having footer and highlighted', () => {
  render(
    <BrowserRouter>
      <Card title='Card Title' subtitle='Card Subtitle' bodyMetadata={[]} haveFooter={true} isHeighlighted={true} className='' />
    </BrowserRouter>
  );
  let UnHighlighButtonText = screen.getByText(/Unpin/i);
  expect(UnHighlighButtonText).toBeVisible();
});

it('should renders Card component with date in body formated correctly', () => {
  render(
    <BrowserRouter>
      <Card title='Card Title' subtitle='Card Subtitle' bodyMetadata={[{ type: 'date', content: '1999-06-19' }]} className='' />
    </BrowserRouter>
  );
  let formatedDate = screen.getByText(/June 19, 1999/i);
  expect(formatedDate).toBeVisible();
});

it('should renders Card component with url in body be existing', () => {
  render(
    <BrowserRouter>
      <Card
        title='Card Title'
        subtitle='Card Subtitle'
        bodyMetadata={[{ type: 'url', content: 'test', url: 'http://en.wikipedia.org' }]}
        className=''
      />
    </BrowserRouter>
  );
  const link = screen.getByRole('link', { name: /test/i });
  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'http://en.wikipedia.org');
});

it('should call savePreference and removePreference on highlight and unhighlight actions', () => {
  const mockSavePreference = vi.fn();
  const mockRemovePreference = vi.fn();

  render(
    <BrowserRouter>
      <Card
        title='Card Title'
        subtitle='Card Subtitle'
        bodyMetadata={[]}
        className=''
        detailsUrl='/details'
        isHeighlighted={false}
        haveFooter={true}
        footerMetadata={{
          savePreference: mockSavePreference,
          removePreference: mockRemovePreference
        }}
      />
    </BrowserRouter>
  );
  const pinButton = screen.getByRole('button', { name: /Pin/i });
  fireEvent.click(pinButton);
  expect(mockSavePreference).toHaveBeenCalledTimes(1);

  render(
    <BrowserRouter>
      <Card
        title='Card Title'
        subtitle='Card Subtitle'
        bodyMetadata={[]}
        className=''
        detailsUrl='/details'
        isHeighlighted={true}
        haveFooter={true}
        footerMetadata={{
          savePreference: mockSavePreference,
          removePreference: mockRemovePreference
        }}
      />
    </BrowserRouter>
  );
  const unpinButton = screen.getByRole('button', { name: /Unpin/i });
  fireEvent.click(unpinButton);
  expect(mockRemovePreference).toHaveBeenCalledTimes(1);
});
