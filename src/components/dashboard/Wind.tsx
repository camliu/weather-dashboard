import type { Wind } from '@/api/types';
import { Card } from '../ui/card';
import { Navigation2, WindIcon } from 'lucide-react';

interface WindProps {
  data: Wind;
}
const convertSpeedToKmh = (speed: number) => (speed * 3.6).toFixed(1);

const getWindDirection = (degree: number) => {
  const direction = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index =
    Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 22.5) % 16;
  return direction[index];
};

const windSpeedDescriptions = new Map([
  [0.5, 'Calm'],
  [1.6, 'Light Air'],
  [3.4, 'Light Breeze'],
  [5.5, 'Gentle Breeze'],
  [8.0, 'Moderate Breeze'],
  [10.8, 'Fresh Breeze'],
  [13.9, 'Strong Breeze'],
  [17.2, 'Near Gale'],
  [20.8, 'Gale'],
  [24.5, 'Strong Gale'],
  [28.5, 'Storm'],
  [32.7, 'Violent Storm'],
  [Infinity, 'Hurricane'],
]);

const getWindDescription = (speed: number): string => {
  for (const [limit, description] of windSpeedDescriptions) {
    if (speed < limit) {
      return description;
    }
  }
  return 'Hurricane';
};

const Wind = ({ data }: WindProps) => {
  const detail = [
    { title: 'Speed', value: `${convertSpeedToKmh(data.speed)} km/h` },
    {
      title: 'Direction',
      value: `${data.deg}° ${getWindDirection(data.deg)}`,
      icon: Navigation2,
    },
  ];

  return (
    <Card className='flex-1 h-fit'>
      <div className='p-6 flex flex-col gap-4'>
        <div className='flex items-center gap-2'>
          <WindIcon className='h-4 w-4 text-muted-foreground' />
          <p className='text-xs uppercase text-muted-foreground'>wind</p>
        </div>

        <div className='w-full'>
          <p className='p-2 text-sm text-muted-foreground'>
            {getWindDescription(data.speed)}
          </p>
          {detail.map((item, index) => {
            return (
              <div
                className='flex justify-between text-sm p-2 border-t'
                key={index}
              >
                <p>{item.title}</p>
                <div className='flex gap-2'>
                  {item.icon ? (
                    <item.icon
                      className='h-5 w-5 text-muted-foreground'
                      strokeWidth={1.5}
                      style={{
                        transform: `rotate(${data.deg + 180}deg)`,
                      }}
                    />
                  ) : null}
                  <p className='text-muted-foreground'>{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
export default Wind;
