import '../styles/components/LoadingSkeleton.scss';
import { Skeleton } from 'primereact/skeleton';

const SkeletonCard = () => (
  <div className='loading-skeleton__container' data-testid='skeleton-card'>
    <div className='loading-skeleton__container__headers'>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} width='100%' />
        ))}
    </div>
    <Skeleton width='100%' height='100px' />
  </div>
);

export default function LoadingSkeleton() {
  return (
    <div className='loading-skeleton'>
      {Array(2)
        .fill(0)
        .map((_, rowIndex) => (
          <div key={rowIndex} className='loading-skeleton__row'>
            {Array(3)
              .fill(0)
              .map((_, colIndex) => (
                <SkeletonCard key={colIndex} />
              ))}
          </div>
        ))}
    </div>
  );
}
