import { ForecastData } from '@/api/types';
import { format } from 'date-fns';
import { Card } from '../ui/card';
import { formatDate } from '@/utils/format/formatTime';

interface DailyForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

const DailyForecast = ({ data }: DailyForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, cur) => {
    const date = formatDate(cur.dt);

    if (!acc[date]) {
      const { temp_min, temp_max } = cur.main;
      const [weather] = cur.weather;
      acc[date] = {
        temp_min,
        temp_max,
        weather,
        date: cur.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, cur.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, cur.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  const nextDays = Object.values(dailyForecasts).slice(0, 5);

  const formatTemp = (temp: number) => `${Math.round(temp)}`;

  return (
    <Card className='h-fit'>
      <div className='grid p-6'>
        <div className='text-xs pb-2 text-muted-foreground'>5-DAY FORECAST</div>
        <div className='flex justify-between'>
          <div className='flex-1'>
            {nextDays.map((day, index) => {
              return (
                <div
                  key={index}
                  className='h-10 content-center text-sm border-t'
                >
                  <p className='sm:mr-20'>
                    {index === 0
                      ? 'Today'
                      : format(new Date(day.date * 1000), 'EEE, MMM d')}
                  </p>
                </div>
              );
            })}
          </div>
          <div>
            {' '}
            {nextDays.map((day, index) => {
              return (
                <div
                  key={index}
                  className='h-10 content-center text-sm border-t'
                >
                  <div className='flex items-center justify-between gap-2 sm:gap-6'>
                    <div className='flex gap-2 items-center'>
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather.icon}@2x.png`}
                        alt={day.weather.description}
                        className='h-10 w-10'
                      />
                      <span>
                        {formatTemp(day.temp_max)} / {formatTemp(day.temp_min)}{' '}
                        °C
                      </span>
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      {day.weather.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DailyForecast;
