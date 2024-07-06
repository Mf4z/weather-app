import React, { useState, useEffect } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);

  // Use useEffect to get the list from local storage
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearch"));
    if (storedSearches) {
      setRecentSearch(storedSearches);
    }
  }, []);

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      try {
        // set is loading when search is being done
        setIsloading(true);
        const data = await fetchWeather(cityName);

        // Add an array with recent search an adding a new city to it
        const cities = [...recentSearch, cityName];
        setRecentSearch(cities); // Set the list of cities

        // Set in local storage
        localStorage.setItem("recentSearch", JSON.stringify(cities));

        setWeatherData(data);
        setCityName("");
        setError(null);

        // hide is loading when search is done
        setIsloading(false);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Todo #2
  // Use useEffect to get the list from local storage

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name..."
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
        onKeyDown={fetchData}
      />
      {isloading && <p>Loading...</p>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {weatherData && (
        <div>
          <h2>
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          <p>
            Temperature: {weatherData.current.temp_c} °C (
            {weatherData.current.temp_f} °F )
          </p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>Humidity: {weatherData.current.humidity} %</p>
          <p>Pressure: {weatherData.current.pressure_mb} mb</p>
          <p>Visibility: {weatherData.current.vis_km} km</p>
        </div>
      )}
      <div className="recent-search">
        <p>Recent Search</p>
        <ul>
          {recentSearch.map((city, index) => (
            <li key={index}>{city}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
