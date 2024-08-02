# Weather CLI App

This is a command-line interface (CLI) application that provides current weather information for a given city. It's built with Node.js and TypeScript, utilizing the OpenWeatherMap API.

## Features

- Fetch current weather data for any city worldwide
- Display temperature, feels-like temperature, humidity, and weather description
- Show country and state information (where available)
- Error handling for invalid locations or API issues

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js (version 12.0 or later)
- You have an OpenWeatherMap API key. If not, you can get one for free at [OpenWeatherMap](https://openweathermap.org/api)

## Installing Weather CLI App

To install the Weather CLI App, follow these steps:

1. Clone the repository

2. Navigate to the project directory

3. Install the dependencies:

```
npm install
```

4. Create a `.env` file in the root directory and add your OpenWeatherMap API key:

   OPENWEATHERMAP_API_KEY=your_api_key_here

## Using Weather CLI App

To use the Weather CLI App, follow these steps:

1. Run the app with a city name as an argument:

```bash
npm start Paris
```

2. The app will display the current weather information for the specified city.

## Running Tests

To run the tests for this project:

1. Ensure you have installed the dev dependencies then run:

```
npm test
```
