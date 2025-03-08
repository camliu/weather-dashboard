import { createLocationStore } from "./locationStore";
import type { Coordinates, GeolocationData } from "@/api/types";

describe("Location Store", () => {
  const mockCoordinates: Coordinates = {
    lat: 1,
    lon: 1,
  };
  const mockLocationData: GeolocationData[] = [
    { name: "City1", lat: 1, lon: 1, country: "Country1" },
  ];

  const fetchLocationByCoordFn = vi.fn().mockResolvedValue(mockLocationData);
  const getCurrentCoordinatesFn = vi.fn().mockResolvedValue(mockCoordinates);

  const store = createLocationStore({
    fetchLocationByCoordFn,
    getCurrentCoordinatesFn,
  });

  beforeEach(() => {
    store.setState({
      coordinates: null,
      currentCoordinates: null,
      locationData: null,
      currentLocationData: null,
      geolocationError: null,
      isGeolocationLoading: false,
    });
  });

  test("sets current location successfully", async () => {
    await store.getState().setCurrentLocation();

    expect(store.getState().currentCoordinates).toEqual(mockCoordinates);
    const [currentLocationData] = mockLocationData;
    expect(store.getState().currentLocationData).toEqual(currentLocationData);
    expect(store.getState().isGeolocationLoading).toBe(false);
    expect(store.getState().geolocationError).toBe(null);
  });

  test("handles errors in setCurrentLocation", async () => {
    const error = new Error("Failed to get coordinates");
    getCurrentCoordinatesFn.mockRejectedValueOnce(error);

    await store.getState().setCurrentLocation();

    expect(store.getState().currentCoordinates).toBe(null);
    expect(store.getState().isGeolocationLoading).toBe(false);
    expect(store.getState().geolocationError).toBe(error.message);
  });

  test("sets location by coordinates successfully", async () => {
    await store.getState().setLocation(mockCoordinates);

    expect(store.getState().coordinates).toEqual(mockCoordinates);
    expect(store.getState().locationData).toEqual(mockLocationData[0]);
    expect(store.getState().geolocationError).toBe(null);
  });

  test("handles errors in setLocation", async () => {
    const error = new Error("Failed to fetch location data");
    fetchLocationByCoordFn.mockRejectedValueOnce(error);

    await store.getState().setLocation(mockCoordinates);

    expect(store.getState().geolocationError).toBe(error.message);
  });
});
