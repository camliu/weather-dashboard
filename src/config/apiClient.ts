import {
  OPENWEATHER_API_KEY,
  VITE_DATA_API_BASE_URL,
  VITE_GEO_API_BASE_URL,
} from '@/constants/env';
import axios from 'axios';

export const dataAPI = axios.create({
  baseURL: VITE_DATA_API_BASE_URL,
  params: { appid: OPENWEATHER_API_KEY, units: 'metric' },
});

export const geoAPI = axios.create({
  baseURL: VITE_GEO_API_BASE_URL,
  params: { appid: OPENWEATHER_API_KEY },
});
