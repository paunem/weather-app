import React, {useState, useEffect} from 'react';
import './Search.css';

const api = "https://api.meteo.lt/v1";

function Search(props) {
    const [query, setQuery] = useState('');
    const [places, setPlaces] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    const biggestCities = [
      { name: "Vilnius", code: "vilnius" },
      { name: "Kaunas", code: "kaunas" },
      { name: "Klaipėda", code: "klaipeda" },
      { name: "Šiauliai", code: "siauliai" },
      { name: "Panevėžys", code: "panevezys" },
      { name: "Alytus", code: "alytus" },
      { name: "Marijampolė", code: "marijampole" },
    ];

    useEffect(() => {
        fetch(`${api}/places`)
        .then((res) => res.json())
        .then((result) => {
          setPlaces(result);
        });
        getWeatherData('vilnius');
    }, []);
  
    const search = (event) => {
      if (event.key === "Enter") {
        getWeatherData();
        event.target.blur();
      }
    };

    function getWeatherData(querya=query) {
      fetch(`${api}/places/${querya}/forecasts/long-term`)
        .then(res => res.json())
        .then(result => {
          setQuery("");
          props.parentCallback(result);
        })
        .catch(() => {
           alert(querya + ' does not exist');
        });
    };

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setQuery(searchWord);
        const newFilter = places.filter((value) => {
          return value.name.toLowerCase().startsWith(searchWord.toLowerCase());
        });
    
        setFilteredData(newFilter);
    };

    return (
      <>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleFilter}
            value={query}
            onKeyPress={search}
            onBlur={() => setFilteredData([])}
            onFocus={handleFilter}
          />
        </div>
        <div className="city-conteiner">
        {biggestCities.map((value) => (
            <div key={value.code} onClick = {() => {
              getWeatherData(value.code);
            }}>{value.name}</div>
          ))}
        </div>
        {filteredData.length !== 0 &&
        <div className="suggestions-box">
          {filteredData.map((value) => (
            <div key={value.code} className="dataItem" onMouseDown = {() => {
              setQuery(value.code);
            }}>{value.name}</div>
          ))}
        </div>}
      </>
    );
}

export default Search;