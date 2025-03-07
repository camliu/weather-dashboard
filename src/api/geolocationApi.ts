import { geoAPI } from '@/config/apiClient';
import { Coordinates, GeolocationData } from './types';

class GeolocationAPI {
  async fetchLocationByCoord({
    lat,
    lon,
  }: Coordinates): Promise<GeolocationData[]> {
    const response = await geoAPI.get<GeolocationData[]>('/reverse', {
      params: {
        lat: lat.toString(),
        lon: lon.toString(),
        limit: 1,
      },
    });

    return response.data;
  }

  async fetchLocationByCity(query: string): Promise<GeolocationData[]> {
    const response = await geoAPI.get<GeolocationData[]>('/direct', {
      params: {
        q: query,
        limit: 5,
      },
    });

    return response.data;
  }
}

export const geolocationApi = new GeolocationAPI();
