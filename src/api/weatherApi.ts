import { dataAPI } from '@/config/apiClient';
import { Coordinates, ForecastData, WeatherData } from './types';

class WeatherAPI {
  async getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    const response = await dataAPI.get<WeatherData>('/weather', {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
      },
    });

    return response.data;
  }

  async getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const response = await dataAPI.get<ForecastData>('/forecast', {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
      },
    });

    return response.data;
  }
}

export const weatherApi = new WeatherAPI();
