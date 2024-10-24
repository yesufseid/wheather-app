export interface WeatherData {
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    visibility: number;
    uvIndex?: number; // Optional, since UV index may not always be available
  }
  
  export const fetchWeatherDatacity = async (city: string): Promise<WeatherData | null> => {
    const apiKey =process.env.APIKEY // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
  
      // Return only relevant parts of the data
      return {
        main: {
          temp: data.main.temp,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
        },
        wind: {
          speed: data.wind.speed,
        },
        visibility: data.visibility,
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };
  