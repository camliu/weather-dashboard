import { CommandGroup, CommandItem } from '@/components/ui/command';
import { useLocationStore } from '@/store/locationStore';

interface CurrentCommandGroupProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentLocation = ({ setOpen }: CurrentCommandGroupProps) => {
  const locationData = useLocationStore.use.currentLocationData();
  const coordinates = useLocationStore.use.currentCoordinates();
  const setLocation = useLocationStore.use.setLocation();

  const handleSelect = (): void => {
    if (coordinates) setLocation(coordinates);
    setOpen(false);
  };

  return locationData ? (
    <CommandGroup heading='Your current location'>
      <CommandItem onSelect={handleSelect}>
        <span>{locationData.name}</span>
        <span className='text-muted-foreground '>{locationData.state}</span>
        <span className='text-muted-foreground '>{locationData.country}</span>
      </CommandItem>
    </CommandGroup>
  ) : null;
};

export default CurrentLocation;
