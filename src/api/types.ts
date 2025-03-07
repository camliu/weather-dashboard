export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface WeatherData {
  coord: Coordinates;
  weather: Weather[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: Wind;
  rain?: { '1h': number };
  clouds: { all: number };
  sys: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  timezone: number;
  name: string;
  dt: number;
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: WeatherData['main'];
    weather: WeatherData['weather'];
    wind: WeatherData['wind'];
    rain?: { '3h': number };
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface GeolocationData {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
