import axios from "axios";
import { getCoordinates, getWeather, displayWeather } from "./index";

// Mock axios to prevent actual API calls
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Weather CLI App", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("getCoordinates should return location data", async () => {
    const mockGeoData = {
      name: "London",
      lat: 51.5074,
      lon: -0.1278,
      country: "GB",
    };
    mockedAxios.get.mockResolvedValueOnce({ data: [mockGeoData] });

    const result = await getCoordinates("London");
    expect(result).toEqual(mockGeoData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/geo/1.0/direct?q=London")
    );
  });

  test("getWeather should return weather data", async () => {
    const mockWeatherData = {
      main: {
        temp: 15,
        feels_like: 14,
        humidity: 70,
      },
      weather: [{ description: "Cloudy" }],
      name: "London",
    };
    mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

    const result = await getWeather(51.5074, -0.1278);
    expect(result).toEqual(mockWeatherData);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/data/2.5/weather?lat=51.5074&lon=-0.1278")
    );
  });

  test("displayWeather should log weather information", async () => {
    const mockGeoData = {
      name: "London",
      lat: 51.5074,
      lon: -0.1278,
      country: "GB",
    };
    const mockWeatherData = {
      main: {
        temp: 15,
        feels_like: 14,
        humidity: 70,
      },
      weather: [{ description: "Cloudy" }],
      name: "London",
    };

    mockedAxios.get.mockResolvedValueOnce({ data: [mockGeoData] });
    mockedAxios.get.mockResolvedValueOnce({ data: mockWeatherData });

    const consoleSpy = jest.spyOn(console, "log");
    await displayWeather("London");

    expect(consoleSpy).toHaveBeenCalledWith("Weather in London, GB:");
    expect(consoleSpy).toHaveBeenCalledWith("Temperature: 15°C");
    expect(consoleSpy).toHaveBeenCalledWith("Feels like: 14°C");
    expect(consoleSpy).toHaveBeenCalledWith("Humidity: 70%");
    expect(consoleSpy).toHaveBeenCalledWith("Description: Cloudy");
  });

  test("displayWeather should handle errors", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("API error"));

    const consoleErrorSpy = jest.spyOn(console, "error");
    await displayWeather("NonexistentCity");
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "An unexpected error occurred while fetching coordinates"
    );
  });
});
