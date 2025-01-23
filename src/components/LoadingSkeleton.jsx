import { Skeleton } from 'primereact/skeleton';

const SkeletonCard = () => (
  <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
    <div className='flex flex-column mb-3'>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <Skeleton key={index} width='100%' className='mb-2' />
        ))}
    </div>
    <Skeleton width='100%' height='100px' />
  </div>
);

export default function LoadingSkeleton() {
  return (
    <div className='flex flex-column gap-3 w-full'>
      {Array(2)
        .fill(0)
        .map((_, rowIndex) => (
          <div key={rowIndex} className='flex gap-3'>
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
