import React, { useState, useEffect } from 'react';
import './Forecast.css';
import {dateBuilder} from './utils';

function Forecast(props) {
  const [days, setDays] = useState([]);
  const [openedDay, setOpenedDay] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

  useEffect(() => {
    formatForecastData();
    setIsVisible(true);
  }, [props]);

  const formatForecastData = () => {
    const daysForecast = [];
    let dayForecast = [];
    let date = new Date();
    for (const hoursForecast of props.weather.forecastTimestamps) {
      let hourTime = new Date(hoursForecast.forecastTimeUtc);
      if (hourTime.getDay() != date.getDay()) {
        daysForecast.push({ day: date.getDay(), date: hourTime, forecast: dayForecast });
        date = hourTime;
        dayForecast = [];
      }
      dayForecast.push({
        hour: hourTime.getHours(),
        temp: Math.round(hoursForecast.airTemperature),
        windSpeed: hoursForecast.windSpeed,
        windGust: hoursForecast.windGust,
        condition: hoursForecast.conditionCode.replace('-', ' '),
      });
    }
    setDays(daysForecast);
    setOpenedDay(daysForecast[0].day);
  };

  return (
    <>
      <div className="forecast-box">
        <div className="weekdays-box">
          {days.map((value) => (
            <div key={value.day}
              className="day-box"
              onClick={() => setOpenedDay(value.day)}
              style={{
                background:
                  value.day == openedDay ? "rgba(255, 255, 255, 0.4)" : "",
              }}
            >
              <div className="day-name">{weekDays[value.day]}</div>
              <div className="day-date">{dateBuilder(value.date, false)}</div>
            </div>
          ))}
        </div>
        <div className="table-box">
          {isVisible && (
            <table className="forecast-table">
              <thead>
                <tr className="legend-box">
                  <th>Time</th>
                  <th>Temperature</th>
                  <th>Wind speed</th>
                  <th>Gust speed</th>
                  <th>Condition</th>
                </tr>
              </thead>
              <tbody>
                {days[days.findIndex((e) => e.day == openedDay)].forecast.map((value) => (
                    <tr className="hour-box" key={value.hour}>
                      <td>{value.hour}:00</td>
                      <td>{value.temp} °C</td>
                      <td>{value.windSpeed} m/s</td>
                      <td>{value.windGust} m/s</td>
                      <td>{value.condition}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Forecast;
