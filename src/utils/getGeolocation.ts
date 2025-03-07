import type { Coordinates } from '@/api/types';
import { GEOLOCATION_ERROR_CODE } from '@/constants/geolocationErrorCode';

export const getCurrentCoordinates = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error(GEOLOCATION_ERROR_CODE.UNSUPPORTED));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = GEOLOCATION_ERROR_CODE.PERMISSION_DENIED;
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = GEOLOCATION_ERROR_CODE.POSITION_UNAVAILABLE;
            break;
          case error.TIMEOUT:
            errorMessage = GEOLOCATION_ERROR_CODE.TIMEOUT;
            break;
          default:
            errorMessage = GEOLOCATION_ERROR_CODE.UNKNOWN;
        }

        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};
