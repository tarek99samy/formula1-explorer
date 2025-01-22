import { Skeleton } from 'primereact/skeleton';

export default function LoadingSkeleton() {
  return (
    <div className='flex flex-column gap-3 w-full'>
      <div className='flex gap-3'>
        <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
          <div className='flex flex-column mb-3'>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
          </div>
          <Skeleton width='100%' height='100px'></Skeleton>
        </div>
        <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
          <div className='flex flex-column mb-3'>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
          </div>
          <Skeleton width='100%' height='100px'></Skeleton>
        </div>
        <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
          <div className='flex flex-column mb-3'>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
          </div>
          <Skeleton width='100%' height='100px'></Skeleton>
        </div>
      </div>
      <div className='flex gap-3'>
        <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
          <div className='flex flex-column mb-3'>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
          </div>
          <Skeleton width='100%' height='100px'></Skeleton>
        </div>
        <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
          <div className='flex flex-column mb-3'>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
          </div>
          <Skeleton width='100%' height='100px'></Skeleton>
        </div>
        <div className='w-4 border-round border-1 surface-border p-4 surface-card'>
          <div className='flex flex-column mb-3'>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
            <Skeleton width='100%' className='mb-2'></Skeleton>
          </div>
          <Skeleton width='100%' height='100px'></Skeleton>
        </div>
      </div>
    </div>
  );
}
