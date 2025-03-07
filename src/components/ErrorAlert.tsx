import { AlertCircle, MapPin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

interface ErrorAlertProps {
  title: string;
  errorMessage: string;
  button: string;
  handler?: () => void;
}

const ErrorAlert = ({
  title,
  errorMessage,
  button,
  handler,
}: ErrorAlertProps) => {
  return (
    <div className='flex justify-center w-full '>
      <Alert variant='destructive' className='max-w-md'>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{errorMessage}</p>
          <Button variant='outline' onClick={handler} className='w-fit'>
            <MapPin className='mr-2 h-4 w-4' />
            {button}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
};
export default ErrorAlert;
