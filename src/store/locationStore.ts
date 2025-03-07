import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Coordinates, GeolocationData } from '@/api/types';
import { createSelectors } from './createSelectors';
import { geolocationApi } from '@/api/geolocationApi';
import { getCurrentCoordinates } from '@/utils/getGeolocation';

interface LocationStore {
  coordinates: Coordinates | null;
  currentCoordinates: Coordinates | null;
  locationData: GeolocationData | null;
  currentLocationData: GeolocationData | null;
  geolocationError: string | null;
  isGeolocationLoading: boolean;
  setCurrentLocation: () => void;
  setLocation: (coordinates: Coordinates) => void;
}

export const createLocationStore = (
  fetchLocationByCoord: (
    coord: Coordinates
  ) => Promise<GeolocationData[]> = geolocationApi.fetchLocationByCoord,
  getCurrentCoordinates: () => Promise<Coordinates>
) => {
  return create(
    persist<LocationStore>(
      (set) => ({
        coordinates: null,
        currentCoordinates: null,
        locationData: null,
        currentLocationData: null,
        geolocationError: null,
        isGeolocationLoading: false,

        setCurrentLocation: async () => {
          set({ geolocationError: null, isGeolocationLoading: true });
          try {
            const coordinates = await getCurrentCoordinates();
            const locationData = await fetchLocationByCoord(coordinates);

            const [currentLocationData] = locationData;
            set({
              coordinates,
              currentCoordinates: coordinates,
              locationData: currentLocationData,
              currentLocationData: currentLocationData,
              geolocationError: null,
              isGeolocationLoading: false,
            });
          } catch (error) {
            set({
              currentCoordinates: null,
              geolocationError:
                error instanceof Error
                  ? error.message
                  : 'An unknown error occurred',
              isGeolocationLoading: false,
            });
          }
        },

        setLocation: async (coordinates) => {
          try {
            const locationData = await fetchLocationByCoord(coordinates);
            const [targetLocationData] = locationData;

            set({
              coordinates,
              locationData: targetLocationData,
            });
          } catch (error) {
            set({
              geolocationError:
                error instanceof Error
                  ? error.message
                  : 'An unknown error occurred',
            });
          }
        },
      }),
      {
        name: 'location-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

export const useLocationStore = createSelectors(
  createLocationStore(
    geolocationApi.fetchLocationByCoord,
    getCurrentCoordinates
  )
);
