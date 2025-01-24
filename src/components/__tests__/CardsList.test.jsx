import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getMockData, getMockDataFail } from '../../api/mock.api';
import CardsList from '../CardsList';

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

it('Should renders CardsList component correctly with toggle view and load more not existing', () => {
  const mockQueryFunction = vi.fn().mockResolvedValue(getMockData());
  render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <CardsList title='Cards List Title' queryKey='cardslist' queryFunction={mockQueryFunction} />
      </QueryClientProvider>
    </BrowserRouter>
  );
  const textContent = screen.getByText(/Cards List Title/i);
  expect(textContent).toBeVisible();
  expect(mockQueryFunction).toHaveBeenCalledTimes(1);

  const toggleViewButton = screen.getByTestId('toggle-view-type');
  expect(toggleViewButton).toBeVisible();

  const loadMoreButton = screen.queryByText(/Load more/i);
  expect(loadMoreButton).not.toBeInTheDocument();
});

it('Should renders CardsList component with loading skeleton and without content', () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <CardsList title='Cards List Title' queryKey='cardslist' queryFunction={vi.fn().mockRejectedValue(new Error('error'))} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  const skeletonCards = screen.getAllByTestId('skeleton-card');
  expect(skeletonCards).toHaveLength(6);
});

it('Should render CardsList component with 5 cards, click load more, then having 10 cards', async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <CardsList title='Cards List Title' queryKey='cardslist' queryFunction={getMockData} pageStep={5} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getAllByTestId('card')).toHaveLength(5);
  });

  const loadMoreButton = screen.getByText(/Load more/i);
  expect(loadMoreButton).toBeVisible();
  fireEvent.click(loadMoreButton);

  await waitFor(() => {
    expect(screen.getAllByTestId('card')).toHaveLength(10);
  });
});

it('Should render CardsList component and fallback to Error component due to error from query function', async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <CardsList title='Cards List Title' queryKey='cardslist' queryFunction={getMockDataFail} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Unexpected Error/i)).toBeVisible();
  });
});
