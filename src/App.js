import React, {useState} from 'react';
import Search from './Search';

function App() {
  const [weather, setWeather] = useState({});

  const handleCallback = (weatherData) => {
    setWeather(weatherData)
}

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();

    return `${hours}:${minutes} ${day}, ${date} ${month} ${year}`
  }

  return (
    <div className="app">
      <main>
        <Search parentCallback = {handleCallback}/>
        {(typeof weather.place != "undefined") ? (
        <div>
          <div className="place-box">
            <div className="location-box">
              <div className="location">{weather.place.name}, {weather.place.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.forecastTimestamps[0].airTemperature)}°c
              </div>
              <div className="weather">{weather.forecastTimestamps[0].conditionCode}</div>
            </div>
          </div>
          <div className="forecast-box">

          </div>
        </div>
         ) : ('')}
      </main>
    </div>
  );
}

export default App;
