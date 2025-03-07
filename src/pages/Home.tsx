import { useForecastQuery, useWeatherQuery } from '@/queries/useWeatherQuery';
import Loading from '@/components/Loading';
import ErrorAlert from '@/components/ErrorAlert';
import Dashboard from '@/components/dashboard/Dashboard';
import { useEffect } from 'react';
import { useLocationStore } from '@/store/locationStore';
import { GEOLOCATION_ERROR_CODE } from '@/constants/geolocationErrorCode';

const Home = () => {
  const coordinates = useLocationStore.use.coordinates();
  const geoLocationError = useLocationStore.use.geolocationError();
  const isGeoLocationLoading = useLocationStore.use.isGeolocationLoading();
  const getCurrentLocation = useLocationStore.use.setCurrentLocation();

  useEffect(() => {
    if (!coordinates) getCurrentLocation();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  const handleRefresh = () => {
    getCurrentLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
    }
  };

  if (isGeoLocationLoading) {
    return <Loading />;
  }

  if (geoLocationError) {
    return (
      <ErrorAlert
        title='Location Error'
        errorMessage={geoLocationError}
        button='Enable Location'
        handler={getCurrentLocation}
      />
    );
  }

  if (!coordinates) {
    return (
      <ErrorAlert
        title='Location Required'
        errorMessage={GEOLOCATION_ERROR_CODE.PERMISSION_DENIED}
        button='Enable Location'
        handler={getCurrentLocation}
      />
    );
  }

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <ErrorAlert
        title='Error'
        errorMessage='Failed to fetch weather data. Please try again.'
        button='Retry'
        handler={handleRefresh}
      />
    );
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <Loading />;
  }

  return (
    <>
      <Dashboard
        weatherData={weatherQuery.data}
        forecastData={forecastQuery.data}
      />
    </>
  );
};
export default Home;
