import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import LoadingSkeleton from '../LoadingSkeleton';

it('should renders 6 skeleton cards in LoadingSkeleton component', () => {
  render(<LoadingSkeleton />);
  const skeletonCards = screen.getAllByTestId('skeleton-card');
  expect(skeletonCards).toHaveLength(6);
});
