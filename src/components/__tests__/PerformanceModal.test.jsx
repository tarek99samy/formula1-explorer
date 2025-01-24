import { render, screen, waitFor } from '@testing-library/react';
import { beforeAll, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getMockChartsData } from '../../api/mock.api';
import PerformanceModal from '../PerformanceModal';

const testQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = vi.fn();
});

it('should renders PerformanceModal component with loading spinner inside', () => {
  vi.mock('primereact/chart', () => ({
    Chart: () => <div data-testid='mock-chart' />
  }));
  render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <PerformanceModal
          visible={true}
          setVisible={vi.fn()}
          queryKey='performance-visualization'
          queryFunction={vi.fn().mockRejectedValue(new Error('error'))}
        />
      </QueryClientProvider>
    </BrowserRouter>
  );

  const spinner = screen.getByTestId('performance-modal-spinner');
  expect(spinner).toBeVisible();
  expect(screen.queryByTestId('mock-chart')).not.toBeInTheDocument();
});

it('should renders PerformanceModal component with 1 chart after loading finished', async () => {
  render(
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <PerformanceModal visible={true} setVisible={vi.fn()} queryKey='performance-visualization' queryFunction={getMockChartsData} />
      </QueryClientProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getAllByTestId('performance-modal-chart')).toHaveLength(1);
  });
});
