import { useQuery } from '@tanstack/react-query';
import type { Coordinates, ForecastData, WeatherData } from '@/api/types';
import { weatherApi } from '@/api/weatherApi';

export const useWeatherQuery = (
  coordinates: Coordinates | null,
  getCurrentWeather: (
    coord: Coordinates
  ) => Promise<WeatherData> = weatherApi.getCurrentWeather
) => {
  return useQuery({
    queryKey: ['weather', coordinates ?? { lat: 0, lon: 0 }],
    queryFn: () => (coordinates ? getCurrentWeather(coordinates) : null),
    enabled: !!coordinates,
  });
};

export const useForecastQuery = (
  coordinates: Coordinates | null,
  getForecast: (
    coord: Coordinates
  ) => Promise<ForecastData> = weatherApi.getForecast
) => {
  return useQuery({
    queryKey: ['forecast', coordinates ?? { lat: 0, lon: 0 }],
    queryFn: () => (coordinates ? getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
};
