import { Skeleton } from './ui/skeleton';

const Loading = () => {
  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <Skeleton className='h-[200px] sm:h-[600px]  w-full rounded-lg' />
        <div className='grid gap-4'>
          <Skeleton className='h-[200px] sm:h-[334px] w-full rounded-lg' />
          <Skeleton className='h-[200px] sm:h-[250px] w-full rounded-lg' />
        </div>
      </div>
    </div>
  );
};
export default Loading;
