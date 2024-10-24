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
  uvIndex?: number;
  city:string // Optional, since UV index may not always be available
}
 
  export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData | null> => {
    const apiKey =process.env.APIKEY // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  