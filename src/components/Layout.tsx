import { PropsWithChildren } from 'react';
import Header from './header/Header';
import { Button } from './ui/button';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 container mx-auto p-4'>{children}</main>
      <footer className='text-sm text-muted-foreground font-light flex justify-center w-full p-4'>
        <p>
          Weather data powered by{' '}
          <Button
            asChild
            variant='link'
            className='pl-0 text-muted-foreground font-light'
          >
            <a href='https://openweathermap.org/api' target='_blank'>
              OpenWeather API
            </a>
          </Button>
        </p>
      </footer>
    </div>
  );
};
export default Layout;
