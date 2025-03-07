import { useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { useLocationByCityQuery } from '@/queries/useGeolocationQuery';
import CurrentLocation from './CurrentLocation';
import ResultList from './ResultList';

const SearchBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');

  const { data, isLoading } = useLocationByCityQuery(query);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setQuery('');
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        variant='outline'
        className='w-full sm:w-3xs justify-start text-muted-foreground'
      >
        Search city
      </Button>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <CommandInput placeholder='Search city' onValueChange={setQuery} />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No cities found.</CommandEmpty>
          )}
          {data && data.length > 0 ? (
            <ResultList
              setOpen={setOpen}
              setQuery={setQuery}
              city={data}
              isLoading={isLoading}
            />
          ) : (
            <CurrentLocation setOpen={setOpen} />
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
export default SearchBar;
