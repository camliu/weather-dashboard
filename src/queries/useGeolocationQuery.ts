import { geolocationApi } from '@/api/geolocationApi';
import { GeolocationData } from '@/api/types';
import { useQuery } from '@tanstack/react-query';

export const useLocationByCityQuery = (
  query: string,
  fetchLocationByCity: (
    query: string
  ) => Promise<GeolocationData[]> = geolocationApi.fetchLocationByCity
) => {
  return useQuery({
    queryKey: ['searchLocation', query],
    queryFn: () => fetchLocationByCity(query),
    enabled: query.length >= 1,
  });
};
