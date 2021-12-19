import React, {useState, useEffect} from 'react';
import './Forecast.css';

function Forecast(props) {
    const [days, setDays] = useState([]);
    const [openedDay, setOpenedDay] = useState(4);

    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        //sort_days();
        formatForecastData();
    }, []);

    const sort_days = () => {
        const day_of_week = new Date().getDay();
        const list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const sorted_list = list.slice(day_of_week).concat(list.slice(0, day_of_week));

        const days = [];
        for(const elem of sorted_list) {
            days.push({day: elem, time: '', temp: '', windSpeed: ''});
        }
        setDays(days);
    };

    const formatForecastData = () => {
        const days = [];
        let dayForecast = [];
        let date = new Date();
        for (const hoursForecast of props.weather.forecastTimestamps){
            let hourTime = new Date(hoursForecast.forecastTimeUtc);
            if(hourTime.getDay() != date.getDay()){
                days.push({day: date.getDay(), forecast: dayForecast});
                //days.push(dayForecast);
                date = hourTime;
                dayForecast = [];
            }
            dayForecast.push({hour: hourTime.getHours(),
                temp: hoursForecast.airTemperature,
                windSpeed: hoursForecast.windSpeed,
                windGust: hoursForecast.windGust,
                condition: hoursForecast.conditionCode});
        }
        console.log(days);
        setDays(days);
    };

  return (
    <div>
      <div className="forecast-box">
        <div className="weekdays-box">
          {days.map((value) => (
            <div className="day-box" onClick = {() => setOpenedDay(value.day)}>
              {weekDays[value.day]}
            </div>
          ))}
        </div>
        <table className="forecast-table">
            <tr className="legend-box">
                <td>Time</td>
                <td>Temperature</td>
                <td>Wind speed</td>
                <td>Gust speed</td>
                <td>Condition</td>
            </tr>
            {days[openedDay].forecast.map((value) => (
            <tr className="hour-box">
                <td>{value.hour}:00</td>
                <td>{value.temp} °C</td>
                <td>{value.windSpeed} m/s</td>
                <td>{value.windGust} m/s</td>
                <td>{value.condition}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Forecast;