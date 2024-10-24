import React, { useState, useEffect } from 'react';
import { getUserLocation } from './utils/geolocation';
import { fetchWeatherData} from './utils/weatherAPI';
import { fetchWeatherDatacity, WeatherData } from './utils/wheatherbycity';
import { WeatherDisplay } from './WeatherDisplay';
import { fetchCitySuggestions, CitySuggestion } from './utils/locationAPI';
import { CiLocationOn } from "react-icons/ci";

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open,setOpen]=useState(true)
  const [city, setCity] = useState<string>(''); // For custom city input
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]); // For city autocomplete
  const [showLocationModal, setShowLocationModal] = useState<boolean>(true);
  

  // Debounce timer
  const [debounceTimer, setDebounceTimer] = useState<any| null>(null);

//by location
useEffect(()=>{
  const user=window.localStorage.getItem("user")
  const handler=()=>{
    setShowLocationModal(false)
    getLocation()
  }
  user?handler():window.localStorage.setItem("user","true")
},[])
  // Fetch location and weather data on component mount
 const getLocation=()=> getUserLocation(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await fetchWeatherData(latitude, longitude);
      if (data) {
        setWeatherData(data);
        // setPostion({lat:data.lat,long:data.long})
        setCity(data.city)
        setLoading(false);
      } else {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    },
    () => {
      setError('Error fetching location');
      setLoading(false);
    }
  );



  // Debounce city suggestions as user types
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    // Set debounce timer for 300ms
    const timer = setTimeout(async () => {
      if (city.length >= 3) {
        const suggestions = await fetchCitySuggestions(city);
        setCitySuggestions(suggestions);
      } else {
        setCitySuggestions([]); // Clear suggestions if city input is less than 3 characters
      }
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer); // Clear the timeout when the component is unmounted
  }, [city]);

  // Function to handle city search
  const handleSearch = async (citys:string) => {
    setCity(city)
    setOpen(false)
    if (!city) return;
    setLoading(true);
    setError(null);
    const data = await fetchWeatherDatacity(citys);
    if (data) {
      setWeatherData(data);
    } else {
      setError('City not found or failed to fetch weather data.');
    }
    setLoading(false);
  };
const handlesetCity=(e: React.ChangeEvent<HTMLInputElement>)=>{
  e.preventDefault()
   setCity(e.target.value)
   setOpen(true)
}
 // Handler for confirming location permission
 const handleAllowLocation = () => {
  setShowLocationModal(false); // Hide the custom modal
  getLocation(); // Now trigger geolocation request
};
  return (
    <div className="flex flex-col   h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 mt-5 sticky mx-auto ">Weather Info</h1>
       <div className='flex justify-between'><h1></h1></div>
      <div  className="mb-2 sticky mx-auto  ">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) =>handlesetCity(e)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
        {!city && <CiLocationOn  className='w-8 h-8' />}
        {/* City suggestions dropdown */}
        {citySuggestions.length > 0 && open && (
          <ul className="absolute bg-white border mt-2 w-full max-h-48 overflow-y-auto rounded-lg shadow-lg z-10">
            {citySuggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() =>handleSearch(suggestion.name) }
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      {showLocationModal && !weatherData && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Allow Location Access</h2>
            <p className="mb-4">
              We need your location to show you weather data specific to your area.
              Please allow location access when prompted by your browser.
            </p>
            <button
              onClick={handleAllowLocation}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Allow Location Access
            </button>
          </div>
        </div>
      )}
      {loading ? (
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-xl">{error}</p>
      ) : (
        weatherData && <WeatherDisplay data={weatherData} />
      )}
    </div>
  );
};

export default App;
