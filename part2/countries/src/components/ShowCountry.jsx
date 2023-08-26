import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'

const Weather = ({ weather }) => {
  const temp = weather.main.temp
  const wind = weather.wind.speed
  const icon = weather.weather[0].icon
  const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`

  return (
    <div>
      <p>temperature: {temp} Celsius</p>
      <img src={iconUrl} />
      <p>wind: {wind} m/s</p>
    </div>
  )
}

export const ShowCountry = ({ country }) => {
  const languages = Object.values(country.languages);
  const flagUrl = country.flags.png;

  const [weatherData, setWeatherData] = useState(null)
  // call wheather service and get info 

  useEffect(() => {
    weatherService
      .getCurrentWeather(country.capital)
      .then(response => setWeatherData(response))
      .catch(error => console.log(error.response.data.message))
  }, [])

  return (
    <div>
      <h2>{country.name.official}</h2>
      <div>
        Capital - {country.capital}
      </div>
      <div>
        Area - {country.area}
      </div>
      <h3>languages:</h3>
      <p>
        {languages.map((l, i) => <li key={i}>{l}</li>)}
      </p>
      <img src={flagUrl} />
      <h3>Weather in {country.capital}</h3>
      {
        weatherData
          ?<Weather weather={weatherData} />
          :<p>No weather data availble</p>
      }
    </div>
  );
};

