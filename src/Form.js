import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { ThreeDots } from "react-loader-spinner";

export default function Form() {
  let [city, setCity] = useState("");
  let [temperature, setTemperature] = useState("");
  let [results, setResults] = useState("");
  let [humidity, setHumidity] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = `eae061c95483dd066657bfc7525418ed`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemperature);
    setResults(
      temperature ? (
        <ul className="list">
          <li className="city">City: {city}</li>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Humidity: {humidity}%</li>
          <li>Description: {description}</li>
          <img
            className="img"
            src={`https://openweathermap.org/img/wn/${image}.png`}
            alt={`${description}`}
          />
        </ul>
      ) : (
        <div className="dots-container">
          <ThreeDots color="black" height={50} width={50} />
        </div>
      )
    );
  }

  function cityChange(event) {
    setCity(event.target.value);
  }

  function showTemperature(response) {
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setDescription(response.data.weather[0].description);
    setImage(response.data.weather[0].icon);
    console.log(response);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Enter your City"
          onChange={cityChange}
        />
        <input type="submit" value="Submit" />
      </form>
      <div>{results}</div>
    </div>
  );
}
