import type { ForecastData, WeatherData } from '@/api/types';
import { Card, CardContent } from '../ui/card';
import {
  CircleGauge,
  Cloudy,
  Droplet,
  Sunrise,
  Sunset,
  Waves,
} from 'lucide-react';
import HourlyForecast from './HourlyForecast';
import { formatTime } from '@/utils/format/formatTime';

interface CurrentWeatherProps {
  current: WeatherData;
  forecast: ForecastData;
}

const CurrentWeather = ({ current, forecast }: CurrentWeatherProps) => {
  const {
    weather: [currentWeather],
    main: {
      temp,
      feels_like: feelsLike,
      temp_min: tempMin,
      temp_max: tempMax,
      pressure,
      humidity,
    },
    rain,
    clouds: { all },
    sys: { sunrise, sunset },
  } = current;

  const formatTemp = (temp: number): string => `${Math.round(temp)}`;

  const detail = [
    {
      title: 'Rain',
      value: `${rain?.['1h'] || 0} mm`,
      icon: Droplet,
    },
    { title: 'Humidity', value: `${humidity} %`, icon: Waves },
    {
      title: 'Pressure',
      value: `${pressure} hPa`,
      icon: CircleGauge,
    },
    {
      title: 'Cloud',
      value: `${all} %`,
      icon: Cloudy,
    },
    { title: 'Sunrise', value: formatTime(sunrise), icon: Sunrise },
    { title: 'Sunset', value: formatTime(sunset), icon: Sunset },
  ];

  return (
    <Card className='flex-1'>
      <CardContent className='grid xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 p-6 gap-8 h-full'>
        <div className='flex items-center justify-between gap-4'>
          <div className='flex flex-col lg:flex-row md:flex-col sm:flex-row gap-2'>
            <p className='text-7xl font-light'>{formatTemp(temp)}°</p>
            <div className='space-y-1'>
              <p className='text-sm text-muted-foreground'>
                Feels like: {formatTemp(feelsLike)}
              </p>
              <div className='flex gap-2 text-sm'>
                <span className='flex items-center gap-1'>
                  L:{formatTemp(tempMin)}
                </span>
                <span className='flex items-center gap-1'>
                  H:{formatTemp(tempMax)}
                </span>
              </div>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
              alt={currentWeather.description}
              className='max-h-20'
            />

            <p className='text-xl capitalize text-muted-foreground'>
              {currentWeather.description}
            </p>
          </div>
        </div>
        <HourlyForecast data={forecast} />
        <div className='grid grid-cols-3 gap-6 xl:order-2 lg:order-3 md:order-2 items-start'>
          {detail.map((detail) => (
            <div key={detail.title} className='flex items-center gap-3'>
              <detail.icon
                className='h-5 w-5 text-muted-foreground'
                strokeWidth={1.5}
              />
              <div className='space-y-0.5'>
                <p className='text-sm'>{detail.title}</p>
                <p className='text-sm text-muted-foreground'>{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
export default CurrentWeather;
