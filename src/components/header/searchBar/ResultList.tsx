import { CommandGroup, CommandItem } from '@/components/ui/command';
import { Loader2 } from 'lucide-react';
import { useLocationStore } from '@/store/locationStore';
import { GeolocationData } from '@/api/types';

interface CityCommandGroupProps {
  city: GeolocationData[];
  isLoading: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

const ResultList = ({
  city: city,
  isLoading: isCityLoading,
  setOpen,
  setQuery,
}: CityCommandGroupProps) => {
  const setLocation = useLocationStore.use.setLocation();

  const handleCitySelect = (cityValue: string): void => {
    const [lat, lon] = cityValue.split('|');
    setLocation({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
    setOpen(false);
    setQuery('');
  };

  return (
    <CommandGroup>
      {isCityLoading && (
        <div className='flex items-center justify-center p-4'>
          <Loader2 className='h-4 w-4 animate-spin' />
        </div>
      )}
      {city.map((city, index) => (
        <CommandItem
          key={index}
          value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
          onSelect={handleCitySelect}
        >
          <span>{city.name}</span>
          <span className='text-muted-foreground '>{city.state}</span>
          <span className='text-muted-foreground '>{city.country}</span>
        </CommandItem>
      ))}
    </CommandGroup>
  );
};

export default ResultList;
