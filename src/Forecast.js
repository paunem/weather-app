import React, { useState, useEffect } from "react";
import "./Forecast.css";

function Forecast(props) {
  const [days, setDays] = useState([]);
  const [openedDay, setOpenedDay] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

  useEffect(() => {
    formatForecastData();
    setIsVisible(true);
  }, []);

  const formatForecastData = () => {
    const days = [];
    let dayForecast = [];
    let date = new Date();
    for (const hoursForecast of props.weather.forecastTimestamps) {
      let hourTime = new Date(hoursForecast.forecastTimeUtc);
      if (hourTime.getDay() != date.getDay()) {
        days.push({ day: date.getDay(), forecast: dayForecast });
        date = hourTime;
        dayForecast = [];
      }
      dayForecast.push({
        hour: hourTime.getHours(),
        temp: hoursForecast.airTemperature,
        windSpeed: hoursForecast.windSpeed,
        windGust: hoursForecast.windGust,
        condition: hoursForecast.conditionCode,
      });
    }
    setDays(days);
    setOpenedDay(days[0].day);
  };

  return (
    <>
      <div className="forecast-box">
        <div className="weekdays-box">
          {days.map((value) => (
            <div
              className="day-box"
              onClick={() => setOpenedDay(value.day)}
              style={{
                background:
                  value.day == openedDay ? "rgba(255, 255, 255, 0.2)" : "",
              }}
            >
              {weekDays[value.day]}
            </div>
          ))}
        </div>
        <div className="table-box">
          {isVisible && (
            <table className="forecast-table">
              <thead>
                <tr className="legend-box">
                  <td>Time</td>
                  <td>Temperature</td>
                  <td>Wind speed</td>
                  <td>Gust speed</td>
                  <td>Condition</td>
                </tr>
              </thead>
              <tbody>
                {days[days.findIndex((e) => e.day == openedDay)].forecast.map((value) => (
                    <tr className="hour-box">
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
