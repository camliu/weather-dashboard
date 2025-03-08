import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Coordinates, GeolocationData } from "@/api/types";
import { createSelectors } from "./createSelectors";
import { geolocationApi } from "@/api/geolocationApi";
import { getCurrentCoordinates } from "@/utils/getGeolocation";

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

interface createLocationStoreParams {
  fetchLocationByCoordFn: (coord: Coordinates) => Promise<GeolocationData[]>;
  getCurrentCoordinatesFn: () => Promise<Coordinates>;
}

export const createLocationStore = ({
  fetchLocationByCoordFn,
  getCurrentCoordinatesFn,
}: createLocationStoreParams) => {
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
            const coordinates = await getCurrentCoordinatesFn();
            const locationData = await fetchLocationByCoordFn(coordinates);

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
                  : "An unknown error occurred",
              isGeolocationLoading: false,
            });
          }
        },

        setLocation: async (coordinates) => {
          try {
            const locationData = await fetchLocationByCoordFn(coordinates);
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
                  : "An unknown error occurred",
            });
          }
        },
      }),
      {
        name: "session-storage",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
};

export const useLocationStore = createSelectors(
  createLocationStore({
    fetchLocationByCoordFn: geolocationApi.fetchLocationByCoord,
    getCurrentCoordinatesFn: getCurrentCoordinates,
  })
);
