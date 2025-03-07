import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? (
        <Moon className='absolute h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Sun className='h-[1.2rem] w-[1.2rem]' />
      )}
    </Button>
  );
}
