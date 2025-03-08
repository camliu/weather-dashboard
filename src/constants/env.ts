const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }
  return value;
};

export const OPENWEATHER_API_KEY = getEnv('VITE_OPENWEATHER_API_KEY');
export const VITE_DATA_API_BASE_URL = getEnv('VITE_DATA_API_BASE_URL');
export const VITE_GEO_API_BASE_URL = getEnv('VITE_GEO_API_BASE_URL');
export const VITE_OPEN_WEATHER_API_URL=getEnv('VITE_OPEN_WEATHER_API_URL')
