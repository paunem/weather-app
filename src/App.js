import React, {useState} from 'react';
import Search from './Search';
import Forecast from './Forecast';
import {dateBuilder} from './utils';

function App() {
  const [weather, setWeather] = useState({});

  const handleCallback = (weatherData) => {
    setWeather(weatherData)
}

  return (
    <main>
      <Search parentCallback={handleCallback} />
      {typeof weather.place != "undefined" && (
        <div className="conteiner">
          <div className="place-box">
            <div className="location-box">
              <div className="location">
                {weather.place.name}, {weather.place.country}
              </div>
              <div className="date">{dateBuilder(new Date(), true)}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.forecastTimestamps[0].airTemperature)}°c
              </div>
              <div className="weather">
                {weather.forecastTimestamps[0].conditionCode}
              </div>
            </div>
          </div>
          <Forecast weather={weather} />
        </div>
      )}
    </main>
  );
}

export default App;
