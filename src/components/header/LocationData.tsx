import { useLocationStore } from '@/store/locationStore';

const LocationData = () => {
  const locationData = useLocationStore.use.locationData();

  return (
    <div className='flex flex-wrap items-end sm:flex-1 order-2 sm:order-1'>
      {locationData && (
        <>
          <div className='text-2xl pr-0.5'>{locationData?.name}</div>
          {locationData?.state && (
            <div className='text-muted-foreground'>, {locationData.state}</div>
          )}
          <div className='text-muted-foreground'>, {locationData?.country}</div>
        </>
      )}
    </div>
  );
};
export default LocationData;
