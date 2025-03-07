import { ModeToggle } from '../ui/mode-toggle';
import LocationData from './LocationData';
import SearchBar from './searchBar/SearchBar';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full backdrop-blur'>
      <div className='container mx-auto flex flex-wrap sm:flex-nowrap items-center p-4 gap-4'>
        <LocationData />
        <div className='flex order-1 sm:order-2 gap-4 w-full sm:w-fit'>
          <div className='w-full sm:w-fit'>
            <SearchBar />
          </div>
          <div className='flex items-center'>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
