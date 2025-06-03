import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [city, setCity] = useState('Vadodara');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      const data = res.data;
      if (data.cod === 200) {
        setWeather(data);
        setError('');
      } else {
        setError('City not found 😢');
        setWeather(null);
      }
    } catch (err) {
      setError('Something went wrong 😵');
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <main>
      <div className='h-screen w-screen flex justify-center items-center bg-[url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e")] bg-cover bg-center'>
        <div className="h-auto w-[350px] flex flex-col justify-start items-center p-6 bg-transparent shadow-black backdrop-blur-xs bg-opacity-80 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">🌤️ Weather Forecast</h2>

          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 w-full rounded-md border border-gray-300 mb-3"
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
          >
            Get Weather
          </button>

          {error && <p className="text-red-600 font-semibold">{error}</p>}

          {weather && (
            <div className="text-gray-800">
              <h3 className="text-xl font-semibold mb-1">{weather.name} 🌍</h3>
              <p>🌡️ Temp: {weather.main.temp}°C</p>
              <p>🌥️ Condition: {weather.weather[0].main}</p>
              <p>💨 Wind: {weather.wind.speed} m/s</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
