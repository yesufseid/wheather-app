import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { WeatherData } from './utils/wheatherbycity';

interface WeatherDisplayProps {
  data: WeatherData;
}

const getCircularData = (value: number, max: number) => [
  { name: 'progress', value },
  { name: 'remaining', value: max - value },
];

const COLORS = ['#00C49F', '#f0f0f0']; // Color for progress and remaining

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const pressure = data.main.pressure; // Adding pressure
  const visibility = data.visibility / 1000; // Visibility in km
  const uvIndex = data.uvIndex || 0; // Placeholder UV index (since it requires a different API endpoint)

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Weather Information</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Temperature */}
        <div className="flex relative flex-col items-center">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie
                data={getCircularData(temperature, 100)}
                dataKey="value"
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
              >
                {getCircularData(temperature, 100).map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute text-xl top-10 font-bold text-gray-700">{`${temperature}°C`}</div>
          <p className="mt-2 text-lg">Temperature</p>
        </div>

        {/* Humidity */}
        <div className="flex relative flex-col items-center">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie
                data={getCircularData(humidity, 100)}
                dataKey="value"
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
              >
                {getCircularData(humidity, 100).map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-10 text-xl font-bold text-gray-700">{`${humidity}%`}</div>
          <p className="mt-2 text-lg">Humidity</p>
        </div>

        {/* Wind Speed */}
        <div className="flex relative flex-col items-center">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie
                data={getCircularData(windSpeed, 100)}
                dataKey="value"
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
              >
                {getCircularData(windSpeed, 100).map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-10 text-xl font-bold text-gray-700">{`${windSpeed} m/s`}</div>
          <p className="mt-2 text-lg">Wind Speed</p>
        </div>

        {/* Pressure */}
        <div className="flex relative flex-col items-center">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie
                data={getCircularData(pressure, 1100)} // Max pressure around 1100 hPa
                dataKey="value"
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
              >
                {getCircularData(pressure, 1100).map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-10 text-xl font-bold text-gray-700">{`${pressure} hPa`}</div>
          <p className="mt-2 text-lg">Pressure</p>
        </div>

        {/* Visibility */}
        <div className="flex relative flex-col items-center">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie
                data={getCircularData(visibility, 10)} // Max visibility is around 10 km
                dataKey="value"
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
              >
                {getCircularData(visibility, 10).map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-10 text-xl font-bold text-gray-700">{`${visibility} km`}</div>
          <p className="mt-2 text-lg">Visibility</p>
        </div>

        {/* UV Index (Placeholder) */}
        <div className="flex relative flex-col items-center">
          <ResponsiveContainer width={110} height={110}>
            <PieChart>
              <Pie
                data={getCircularData(uvIndex, 10)} // UV Index ranges from 0 to 10+
                dataKey="value"
                innerRadius={40}
                outerRadius={55}
                startAngle={90}
                endAngle={-270}
              >
                {getCircularData(uvIndex, 10).map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-10 text-xl font-bold text-gray-700">{`${uvIndex}`}</div>
          <p className="mt-2 text-lg">UV Index</p>
        </div>
      </div>
    </div>
  );
};
