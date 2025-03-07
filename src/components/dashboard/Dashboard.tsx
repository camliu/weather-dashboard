import DailyForecast from './DailyForecast';
import { ForecastData, WeatherData } from '@/api/types';
import Wind from './Wind';
import CurrentWeather from './CurrentWeather';

interface DashboardProps {
  weatherData: WeatherData;
  forecastData: ForecastData;
}

const Dashboard = ({ weatherData, forecastData }: DashboardProps) => {
  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <CurrentWeather current={weatherData} forecast={forecastData} />
      <div className='flex flex-col lg:flex-col md:flex-row gap-4'>
        <DailyForecast data={forecastData} />
        <Wind data={weatherData.wind} />
      </div>
    </div>
  );
};
export default Dashboard;
