export interface CitySuggestion {
    id: string;
    name: string;
    country: string;
  }

  export const fetchCitySuggestions = async (city: string): Promise<CitySuggestion[]> => {
    const apikey=process.env.APIKEY // Replace with your API key
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apikey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch city suggestions');
      }
      const data = await response.json();
  
      // Map the response to match CitySuggestion interface
      return data.map((item: any) => ({
        id: `${item.lat}-${item.lon}`,
        name: item.name,
        country: item.country,
      }));
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      return [];
    }
  };
  