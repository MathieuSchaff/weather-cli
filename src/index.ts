import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL_GEO = "http://api.openweathermap.org/geo/1.0/direct";
const BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";

interface GeoData {
  name: string;
  local_names?: {
    [key: string]: string;
  };
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
  }>;
  name: string;
}

export async function getCoordinates(city: string): Promise<GeoData> {
  try {
    const response = await axios.get<GeoData[]>(
      `${BASE_URL_GEO}?q=${city}&limit=1&appid=${API_KEY}`
    );
    if (response.data.length === 0) {
      throw new Error("Location not found");
    }
    return response.data[0];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        `Error fetching coordinates: ${error.response.data.message}`
      );
    }
    throw new Error("An unexpected error occurred while fetching coordinates");
  }
}

export async function getWeather(
  lat: number,
  lon: number
): Promise<WeatherData> {
  try {
    const response = await axios.get<WeatherData>(
      `${BASE_URL_WEATHER}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Error fetching weather: ${error.response.data.message}`);
    }
    throw new Error("An unexpected error occurred while fetching weather data");
  }
}

export async function displayWeather(city: string): Promise<void> {
  try {
    const geoData = await getCoordinates(city);
    const weatherData = await getWeather(geoData.lat, geoData.lon);

    console.log(`Weather in ${weatherData.name}, ${geoData.country}:`);
    console.log(`Temperature: ${weatherData.main.temp}°C`);
    console.log(`Feels like: ${weatherData.main.feels_like}°C`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Description: ${weatherData.weather[0].description}`);
    if (geoData.state) {
      console.log(`State: ${geoData.state}`);
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}

// Get the city name from command line arguments
const city = process.argv[2];

if (!city) {
  console.log("Please provide a city name");
} else {
  displayWeather(city);
}
