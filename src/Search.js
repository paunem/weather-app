import React, {useState, useEffect} from 'react';
import './Search.css';

const api = "https://api.meteo.lt/v1";

function Search(props) {
    const [query, setQuery] = useState('panevezys');
    const [places, setPlaces] = useState({});
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch(`${api}/places`)
        .then((res) => res.json())
        .then((result) => {
          setPlaces(result);
        });
        getWeatherData();
    }, []);
  
    const search = (event) => {
      if (event.key === "Enter") {
        getWeatherData();
        event.target.blur();
      }
    };

    function getWeatherData() {
      fetch(`${api}/places/${query}/forecasts/long-term`)
        .then(res => res.json())
        .then(result => {
          setQuery("");
          props.parentCallback(result);
        })
        .catch(() => {
           alert(query + ' does not exist');
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
      <div>
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
        {filteredData.length !== 0 &&
        <div className="suggestions-box">
          {filteredData.map((value) => (
            <div className="dataItem" onMouseDown = {() => {
              setQuery(value.code);
            }}>{value.name}</div>
          ))}
        </div>}
      </div>
    );
}

export default Search;